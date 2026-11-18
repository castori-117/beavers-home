import { sendForm } from '../lib/forms';

/* Lodge waitlist: the browser checks the email (type + pattern), this shows our words and the thank-you. */
export class WaitlistForm extends HTMLElement {
  controller?: AbortController;

  connectedCallback() {
    const form = this.querySelector('form');
    if (!form) return;
    this.controller = new AbortController();
    const { signal } = this.controller;
    form.addEventListener('submit', this.onSubmit, { signal });
    form.addEventListener('input', () => this.error(false), { signal });
  }

  disconnectedCallback() {
    this.controller?.abort();
  }

  error(show: boolean) {
    const message = this.querySelector<HTMLElement>('.wl-msg');
    const input = this.querySelector('input[type="email"]');
    if (message) message.hidden = !show;
    input?.setAttribute('aria-invalid', String(show));
  }

  onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
    if (input && !input.checkValidity()) {
      this.error(true);
      input.focus();
      return;
    }
    if (!(await sendForm(form))) return this.error(true);
    form.hidden = true;
    const done = this.querySelector<HTMLElement>('.wl-done');
    if (done) done.hidden = false;
  };
}

customElements.get('waitlist-form') || customElements.define('waitlist-form', WaitlistForm);
