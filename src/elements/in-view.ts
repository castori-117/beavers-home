/* Marks itself [data-seen] the first time enough of it is on screen; CSS plays the rest.
   A [data-replay] button inside starts the scene again. */
export class InView extends HTMLElement {
  observer?: IntersectionObserver;
  controller?: AbortController;

  connectedCallback() {
    this.controller = new AbortController();
    this.addEventListener('click', this.onClick, { signal: this.controller.signal });
    if (!('IntersectionObserver' in window)) return this.see();
    this.observer = new IntersectionObserver(this.onChange, { threshold: Number(this.dataset.threshold || 0.3) });
    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    this.controller?.abort();
  }

  onChange = (entries: IntersectionObserverEntry[]) => {
    if (!entries.some(({ isIntersecting }) => isIntersecting)) return;
    this.observer?.disconnect();
    this.see();
  };

  see() {
    this.toggleAttribute('data-seen', true);
    this.dispatchEvent(new CustomEvent('seen', { bubbles: true }));
  }

  onClick = (event: Event) => {
    if (!(event.target as Element).closest('[data-replay]')) return;
    this.removeAttribute('data-seen');
    void this.offsetWidth;
    requestAnimationFrame(() => this.see());
  };
}

customElements.get('in-view') || customElements.define('in-view', InView);
