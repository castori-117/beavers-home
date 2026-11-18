/* The lodge cut-away: point at a part (or tap it) and the drawing answers; the visuals are CSS on [data-part].
   Once in view the labels appear, and a beaver swims in through the underwater door. */
type Motion = SVGElement & { beginElement?: () => void };

export class LodgeFigure extends HTMLElement {
  static SWIM_AFTER = 2200;
  static SWIM_FOR = 4200;

  controller?: AbortController;
  observer?: IntersectionObserver;
  timers: number[] = [];

  get labels() {
    return [...this.querySelectorAll<HTMLButtonElement>('[data-part]')].filter((element) => element.tagName === 'BUTTON');
  }

  connectedCallback() {
    this.controller = new AbortController();
    const { signal } = this.controller;
    for (const label of this.labels) {
      const pick = () => this.pick(label.dataset.part!);
      const drop = () => this.drop(label.dataset.part!);
      const mouse = (handler: () => void) => (event: PointerEvent) => event.pointerType === 'mouse' && handler();
      label.addEventListener('pointerenter', mouse(pick), { signal });
      label.addEventListener('focus', pick, { signal });
      label.addEventListener('click', pick, { signal });
      label.addEventListener('pointerleave', mouse(drop), { signal });
      label.addEventListener('blur', drop, { signal });
    }
    this.observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      this.observer?.disconnect();
      this.toggleAttribute('data-seen', true);
      this.timers.push(window.setTimeout(() => this.swim(), LodgeFigure.SWIM_AFTER));
    }, { threshold: 0.3 });
    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.controller?.abort();
    this.observer?.disconnect();
    this.timers.forEach((timer) => window.clearTimeout(timer));
  }

  pick(part: string) {
    if (this.dataset.part === part) return;
    this.dataset.part = part;
    for (const label of this.labels) label.setAttribute('aria-pressed', String(label.dataset.part === part));
    if (part === 'door') this.swim();
  }

  drop(part: string) {
    if (this.dataset.part !== part) return;
    delete this.dataset.part;
    for (const label of this.labels) label.setAttribute('aria-pressed', 'false');
  }

  swim() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const motion = this.querySelector<Motion>('animateMotion');
    if (!motion?.beginElement) return;
    try {
      motion.beginElement();
    } catch {
      return;
    }
    this.toggleAttribute('data-swim', true);
    this.timers.push(window.setTimeout(() => this.removeAttribute('data-swim'), LodgeFigure.SWIM_FOR));
  }
}

customElements.get('lodge-figure') || customElements.define('lodge-figure', LodgeFigure);
