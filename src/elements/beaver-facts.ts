/* One beaver fact at a time. All of them are in the HTML (readable by people, search and answer engines);
   the button takes a bite (CSS on .fact--bite) and shows the next one. */
export class BeaverFacts extends HTMLElement {
  static BITE = 300;
  controller?: AbortController;
  timer?: number;
  index = 0;

  get facts() {
    return [...this.querySelectorAll<HTMLElement>('.fact-x')];
  }

  connectedCallback() {
    this.controller = new AbortController();
    this.querySelector('[data-next]')?.addEventListener('click', this.next, { signal: this.controller.signal });
  }

  disconnectedCallback() {
    this.controller?.abort();
    window.clearTimeout(this.timer);
  }

  next = () => {
    const card = this.querySelector('.fact');
    if (!card || card.classList.contains('fact--bite')) return;
    const facts = this.facts;
    const show = () => {
      this.index = (this.index + 1) % facts.length;
      facts.forEach((fact, index) => (fact.hidden = index !== this.index));
      card.classList.remove('fact--bite');
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return show();
    card.classList.add('fact--bite');
    this.timer = window.setTimeout(show, BeaverFacts.BITE);
  };
}

customElements.get('beaver-facts') || customElements.define('beaver-facts', BeaverFacts);
