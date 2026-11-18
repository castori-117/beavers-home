/* Analytics only after a yes. Vercel Web Analytics and Speed Insights use no cookies, but they still
   measure visits, so they wait for consent. The choice lives in localStorage; a [data-consent-open]
   button anywhere (footer, privacy page) brings the question back. */
import { inject, pageview } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

const KEY = 'tb-stats';

const read = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export class SiteConsent extends HTMLElement {
  controller?: AbortController;
  observer?: MutationObserver;
  started = false;

  get bar() {
    return this.querySelector<HTMLElement>('.consent');
  }

  connectedCallback() {
    this.controller = new AbortController();
    const { signal } = this.controller;
    document.addEventListener('click', this.onClick, { signal });
    const choice = read();
    if (choice === 'yes') this.start();
    else if (choice !== 'no') this.whenCalm(() => this.ask());
  }

  disconnectedCallback() {
    this.controller?.abort();
    this.observer?.disconnect();
  }

  /* never on top of the landing intro: wait until it has gone */
  whenCalm(then: () => void) {
    const root = document.documentElement;
    if (!root.dataset.intro) return void window.setTimeout(then, 900);
    this.observer = new MutationObserver(() => {
      if (root.dataset.intro) return;
      this.observer?.disconnect();
      window.setTimeout(then, 1200);
    });
    this.observer.observe(root, { attributes: true, attributeFilter: ['data-intro'] });
  }

  ask() {
    const bar = this.bar;
    if (!bar) return;
    bar.hidden = false;
    requestAnimationFrame(() => bar.toggleAttribute('data-show', true));
  }

  close() {
    const bar = this.bar;
    if (!bar) return;
    bar.removeAttribute('data-show');
    window.setTimeout(() => (bar.hidden = true), 300);
  }

  choose(yes: boolean) {
    try {
      localStorage.setItem(KEY, yes ? 'yes' : 'no');
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    this.close();
    if (yes) this.start();
    /* a no after a yes: nothing more is sent from the next page on */
  }

  start() {
    if (this.started) return;
    this.started = true;
    const path = location.pathname;
    inject({ framework: 'astro', disableAutoTrack: true });
    pageview({ route: path, path });
    injectSpeedInsights({ framework: 'astro', route: path });
  }

  onClick = (event: Event) => {
    const target = event.target as Element;
    const pick = target.closest<HTMLElement>('[data-consent]');
    if (pick && this.contains(pick)) return this.choose(pick.dataset.consent === 'yes');
    if (target.closest('[data-consent-open]')) {
      event.preventDefault();
      this.ask();
      this.bar?.querySelector<HTMLElement>('[data-consent="yes"]')?.focus({ preventScroll: true });
    }
  };
}

customElements.get('site-consent') || customElements.define('site-consent', SiteConsent);
