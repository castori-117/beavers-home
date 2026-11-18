/* Explains new words. The copy marks them ([[agent|gli agenti]] becomes a .term button); this element
   holds the definitions and one shared tooltip: hover or focus with a mouse or keyboard, tap on a phone,
   Escape or a tap elsewhere to close. */
type Terms = Record<string, { t: string; d: string }>;

export class TermTips extends HTMLElement {
  terms: Terms = {};
  tip!: HTMLDivElement;
  current: HTMLElement | null = null;
  controller?: AbortController;
  timer = 0;
  pointer = 'mouse';

  connectedCallback() {
    try {
      this.terms = JSON.parse(this.dataset.terms || '{}');
    } catch {
      this.terms = {};
    }
    this.tip = document.createElement('div');
    this.tip.className = 'tip';
    this.tip.id = 'term-tip';
    this.tip.setAttribute('role', 'tooltip');
    this.tip.hidden = true;
    this.tip.innerHTML = '<b></b><span></span>';
    this.append(this.tip);

    this.controller = new AbortController();
    const opts = { signal: this.controller.signal };
    const passive = { signal: this.controller.signal, passive: true };
    document.addEventListener('pointerdown', (e) => (this.pointer = e.pointerType), passive);
    document.addEventListener('pointerover', this.onOver, passive);
    document.addEventListener('focusin', this.onFocus, opts);
    document.addEventListener('click', this.onClick, opts);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && this.hide(), opts);
    window.addEventListener('scroll', () => this.pointer !== 'mouse' && this.hide(), passive);
    window.addEventListener('resize', () => this.hide(), passive);
  }

  disconnectedCallback() {
    this.controller?.abort();
    window.clearTimeout(this.timer);
  }

  termOf(target: EventTarget | null) {
    return target instanceof Element ? target.closest<HTMLElement>('.term') : null;
  }

  onOver = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const term = this.termOf(event.target);
    window.clearTimeout(this.timer);
    if (term) this.timer = window.setTimeout(() => this.show(term), 120);
    else if (!(event.target instanceof Element && event.target.closest('.tip'))) this.timer = window.setTimeout(() => this.hide(), 180);
  };

  onFocus = (event: FocusEvent) => {
    const term = this.termOf(event.target);
    if (term && term.matches(':focus-visible')) this.show(term);
    else if (!term) this.hide();
  };

  onClick = (event: MouseEvent) => {
    const term = this.termOf(event.target);
    if (!term) {
      if (!(event.target instanceof Element && event.target.closest('.tip'))) this.hide();
      return;
    }
    event.preventDefault();
    /* a mouse already opened it on hover: a click keeps it; a tap toggles */
    if (this.pointer !== 'mouse' && this.current === term && !this.tip.hidden) this.hide();
    else this.show(term);
  };

  show(term: HTMLElement) {
    window.clearTimeout(this.timer);
    const def = this.terms[term.dataset.term || ''];
    if (!def) return;
    if (this.current && this.current !== term) this.current.removeAttribute('aria-describedby');
    this.current = term;
    (this.tip.firstElementChild as HTMLElement).textContent = def.t;
    (this.tip.lastElementChild as HTMLElement).textContent = def.d;
    /* on night surfaces the explanation turns light */
    this.tip.toggleAttribute('data-light', !!term.closest('.dk, .ai-door'));
    this.tip.hidden = false;
    term.setAttribute('aria-describedby', 'term-tip');
    term.toggleAttribute('data-open', true);
    this.place(term);
    requestAnimationFrame(() => this.tip.toggleAttribute('data-show', true));
  }

  hide() {
    window.clearTimeout(this.timer);
    if (this.tip.hidden) return;
    this.tip.removeAttribute('data-show');
    this.tip.hidden = true;
    this.current?.removeAttribute('aria-describedby');
    this.current?.removeAttribute('data-open');
    this.current = null;
  }

  place(term: HTMLElement) {
    /* the line of text the word sits on, so a word broken over two lines still points at its start */
    const rect = term.getClientRects()[0] || term.getBoundingClientRect();
    const tip = this.tip;
    const margin = 12;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    const centre = rect.left + rect.width / 2;
    const x = Math.max(margin, Math.min(centre - w / 2, window.innerWidth - w - margin));
    let y = rect.bottom + 12;
    const up = y + h > window.innerHeight - margin && rect.top - h - 12 > margin;
    if (up) y = rect.top - h - 12;
    tip.toggleAttribute('data-up', up);
    tip.style.left = `${Math.round(x)}px`;
    tip.style.top = `${Math.round(y)}px`;
    tip.style.setProperty('--ax', `${Math.round(Math.max(18, Math.min(centre - x, w - 18)))}px`);
  }
}

customElements.get('term-tips') || customElements.define('term-tips', TermTips);
