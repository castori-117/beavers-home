/* The landing intro. Whether it runs is decided inline in <head> (no flash); the drawing is CSS.
   This keeps the clock: after the drawing the seal flies home through a view transition and the night lifts. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: (() => void) | { update: () => void; types?: string[] }) => unknown;
};

export class HomeIntro extends HTMLElement {
  static DRAW = 2600;
  static FADE = 1000;
  static KEY = 'tb-intro';

  controller?: AbortController;
  timer?: number;

  get root() {
    return document.documentElement;
  }

  connectedCallback() {
    if (this.root.dataset.intro !== 'run') return;
    this.controller = new AbortController();
    const { signal } = this.controller;
    const skip = this.querySelector('[data-skip]');
    for (const type of ['click', 'wheel', 'touchstart']) skip?.addEventListener(type, this.finish, { passive: true, signal });
    window.addEventListener('keydown', this.onKey, { signal });
    this.timer = window.setTimeout(this.dock, HomeIntro.DRAW);
  }

  disconnectedCallback() {
    this.controller?.abort();
    window.clearTimeout(this.timer);
  }

  onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.finish();
  };

  dock = () => {
    const doc = document as ViewTransitionDocument;
    if (doc.startViewTransition) {
      /* typed transitions keep the slow crossfade to this moment; older engines take only a callback */
      const typed = CSS.supports('selector(:active-view-transition-type(intro))');
      doc.startViewTransition(typed ? { update: this.done, types: ['intro'] } : this.done);
      return;
    }
    this.root.dataset.intro = 'dock';
    this.timer = window.setTimeout(this.done, HomeIntro.FADE);
  };

  finish = () => {
    window.clearTimeout(this.timer);
    this.done();
  };

  done = () => {
    this.controller?.abort();
    window.clearTimeout(this.timer);
    delete this.root.dataset.intro;
    try {
      sessionStorage.setItem(HomeIntro.KEY, '1');
    } catch {
      /* storage can be off: the intro simply plays again */
    }
  };
}

customElements.get('home-intro') || customElements.define('home-intro', HomeIntro);
