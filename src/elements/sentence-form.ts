import { sendForm } from '../lib/forms';

/* The form written as a sentence. Validity, the check marks and the ready button are CSS
   (required, pattern, :valid, :has); the blanks size themselves with field-sizing where it exists.
   This adds our own words on a wrong blank, a measured fallback for the sizing, and the thank-you. */
export class SentenceForm extends HTMLElement {
  static PAD = 0.45;
  controller?: AbortController;
  measure?: CanvasRenderingContext2D | null;

  get form() {
    return this.querySelector('form');
  }

  get fields() {
    return [...this.querySelectorAll<HTMLInputElement>('input[data-error]')];
  }

  connectedCallback() {
    const form = this.form;
    if (!form) return;
    this.controller = new AbortController();
    const { signal } = this.controller;
    form.addEventListener('submit', this.onSubmit, { signal });
    form.addEventListener('input', this.onInput, { signal });
    if (!CSS.supports('field-sizing', 'content')) {
      this.fields.forEach((field) => this.fit(field));
      document.fonts?.ready.then(() => this.fields.forEach((field) => this.fit(field)));
    }
  }

  disconnectedCallback() {
    this.controller?.abort();
  }

  /* width of the text in em, in the sentence's own font */
  em(text: string, weight: number, field: HTMLInputElement) {
    this.measure ??= document.createElement('canvas').getContext('2d');
    if (!this.measure) return text.length * 0.56;
    const family = getComputedStyle(field).fontFamily;
    this.measure.font = `${weight} 100px ${family}`;
    return this.measure.measureText(text).width / 100 - 0.03 * text.length;
  }

  fit(field: HTMLInputElement) {
    const width = Math.max(this.em(field.placeholder, 400, field), field.value ? this.em(field.value, 800, field) : 0) + SentenceForm.PAD;
    field.style.width = `${width.toFixed(2)}em`;
  }

  onInput = (event: Event) => {
    const field = event.target as HTMLInputElement;
    if (!CSS.supports('field-sizing', 'content')) this.fit(field);
    if (field.classList.contains('err') && field.checkValidity()) this.showError(null);
  };

  showError(field: HTMLInputElement | null) {
    const message = this.querySelector<HTMLElement>('.errmsg');
    for (const input of this.fields) {
      input.classList.remove('err');
      input.setAttribute('aria-invalid', 'false');
    }
    if (!message) return;
    message.hidden = !field;
    message.textContent = field?.dataset.error || '';
    if (!field) return;
    /* restart the shake */
    void field.offsetWidth;
    field.classList.add('err');
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  }

  onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const form = this.form!;
    const wrong = this.fields.find((field) => !field.checkValidity());
    if (wrong) return this.showError(wrong);
    this.showError(null);
    if (!(await sendForm(form))) return;
    const name = (form.elements.namedItem('name') as HTMLInputElement | null)?.value.trim();
    const who = this.querySelector('[data-who]');
    if (who) who.textContent = name || this.dataset.you || '';
    form.hidden = true;
    const thanks = this.querySelector<HTMLElement>('.thanks-box');
    if (thanks) thanks.hidden = false;
  };
}

customElements.get('sentence-form') || customElements.define('sentence-form', SentenceForm);
