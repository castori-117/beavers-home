/* Copies a text (the email) to the clipboard; the label swap is CSS on [data-copied]. */
export class CopyText extends HTMLElement {
  static HOLD = 2200;
  controller?: AbortController;
  timer?: number;

  connectedCallback() {
    this.controller = new AbortController();
    this.addEventListener('click', this.onClick, { signal: this.controller.signal });
  }

  disconnectedCallback() {
    this.controller?.abort();
    window.clearTimeout(this.timer);
  }

  onClick = async (event: Event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-copy]');
    if (!button) return;
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
    } catch {
      return;
    }
    button.toggleAttribute('data-copied', true);
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => button.removeAttribute('data-copied'), CopyText.HOLD);
  };
}

customElements.get('copy-text') || customElements.define('copy-text', CopyText);
