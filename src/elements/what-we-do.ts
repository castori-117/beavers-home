/* "What we do". Asks the visitor's name once, on a whole screen, then speaks to them: the title,
   the example store, the night request, the list and the call all use it. The name stays in this browser.
   It also wakes the four pictures as they come into view, and plays the rolling list.
   The head of the page decides whether to ask ([data-who="ask"] on <html>), before the first paint. */
interface Words {
  shop: string;
  site: string;
  of: string;
  cap1: [string, string];
  cap1n: string;
  cap2: [string, string];
  cap2n: string;
  end: string;
  endN: string;
  call: string;
  callN: string;
  done: string;
  doneN: string;
  asks: string[];
  hello: string;
}

const KEY = 'tb-name';
const SKIP = 'tb-name-skip';
/* how long the hello stays, before the page */
const HOLD = 2200;
/* how long the screen takes to lift */
const LIFT = 1050;
/* the night of the request: 22:40 to 07:30, seven minutes a tick */
const NIGHT_FROM = 22 * 60 + 40;
const NIGHT_TO = 24 * 60 + 7 * 60 + 30;

const fill = (text: string, name: string, slug = '') => text.replace(/\{n\}/g, name).replace(/\{s\}/g, slug);
const hhmm = (minutes: number) => `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

export const cleanName = (value: string) => {
  const first = String(value || '').replace(/[<>{}]/g, '').trim().split(/\s+/)[0] || '';
  return first ? first.charAt(0).toUpperCase() + first.slice(1, 24) : '';
};

const slugOf = (name: string) => {
  let plain = name;
  try {
    plain = name.normalize('NFD').replace(/[̀-ͯ]/g, '');
  } catch {
    /* old browsers keep the accents out below anyway */
  }
  return plain.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 16);
};

const read = (store: Storage, key: string) => {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
};
const write = (store: Storage, key: string, value: string) => {
  try {
    store.setItem(key, value);
  } catch {
    /* storage can be off: the page still works, it just forgets */
  }
};

export class WhatWeDo extends HTMLElement {
  words!: Words;
  still = false;
  controller?: AbortController;
  observer?: IntersectionObserver;
  timers: number[] = [];
  nightTick = 0;
  nightWait = 0;
  sweepFrame = 0;
  touched = false;

  connectedCallback() {
    this.words = JSON.parse(this.dataset.words || '{}');
    this.still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.controller = new AbortController();
    const { signal } = this.controller;

    const known = cleanName(read(localStorage, KEY) || '');
    if (known) this.speakTo(known);
    if (document.documentElement.dataset.who === 'ask') this.ask(signal);

    this.querySelector('.ba-range')?.addEventListener('input', this.onSlide, { signal });
    this.querySelectorAll<HTMLButtonElement>('[data-req]').forEach((button) => button.addEventListener('click', () => this.night(Number(button.dataset.req)), { signal }));
    this.querySelector('[data-roll-again]')?.addEventListener('click', this.rollAgain, { signal });
    this.watch();
  }

  disconnectedCallback() {
    this.controller?.abort();
    this.observer?.disconnect();
    this.timers.forEach((id) => clearTimeout(id));
    clearInterval(this.nightTick);
    clearTimeout(this.nightWait);
    cancelAnimationFrame(this.sweepFrame);
  }

  later(fn: () => void, ms: number) {
    this.timers.push(window.setTimeout(fn, ms));
  }

  /* ---------- the name ---------- */

  get screen() {
    return this.querySelector<HTMLElement>('.who');
  }

  get field() {
    return this.querySelector<HTMLInputElement>('[data-who-input]');
  }

  ask(signal: AbortSignal) {
    const field = this.field;
    const go = this.querySelector<HTMLButtonElement>('[data-who-go]');
    if (!field || !go) return this.close();
    field.addEventListener('input', () => go.classList.toggle('btn--ready', !!cleanName(field.value)), { signal });
    field.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      this.go();
    }, { signal });
    go.addEventListener('click', () => this.go(), { signal });
    this.querySelector('[data-who-skip]')?.addEventListener('click', () => this.skip(), { signal });
    this.screen?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.skip();
    }, { signal });
    requestAnimationFrame(() => field.focus({ preventScroll: true }));
  }

  go() {
    const name = cleanName(this.field?.value || '');
    if (!name) return this.field?.focus();
    write(localStorage, KEY, name);
    this.speakTo(name);
    const hello = this.querySelector('[data-who-hello]');
    if (hello) hello.textContent = fill(this.words.hello, name);
    this.screen?.classList.add('who--greet');
    this.later(() => this.close(), this.still ? 1100 : HOLD);
  }

  skip() {
    write(sessionStorage, SKIP, '1');
    this.close();
  }

  /* the screen fades and lifts while the title rises in underneath: no cut */
  close() {
    const root = document.documentElement;
    if (root.dataset.who !== 'ask') return;
    this.querySelector('[data-cover]')?.classList.add('cv--in');
    root.dataset.who = 'out';
    this.later(() => delete root.dataset.who, this.still ? 0 : LIFT);
  }

  /* every place the page can say the name */
  speakTo(name: string) {
    const w = this.words;
    const slug = slugOf(name);
    const set = (selector: string, text: string) => this.querySelectorAll(selector).forEach((el) => (el.textContent = text));
    const title = this.querySelector<HTMLElement>('#sv-top');
    if (title?.dataset.a) {
      const bold = document.createElement('b');
      bold.textContent = title.dataset.b || '';
      title.textContent = `${name}, ${title.dataset.a} `;
      title.append(bold);
    }
    set('[data-name-site]', slug ? fill(w.site, name, slug) : w.shop);
    set('[data-name-cap="1a"]', fill(w.of, name));
    set('[data-name-cap="1b"]', w.cap1n);
    set('[data-name-cap="2a"]', fill(w.of, name));
    set('[data-name-cap="2b"]', w.cap2n);
    set('[data-name-end]', fill(w.endN, name));
    set('[data-name-call]', fill(w.callN, name));
    set('[data-name-done]', fill(w.doneN, name));
    set('[data-night-who]', `22:40 · ${name}`);
  }

  /* ---------- the pictures ---------- */

  watch() {
    const views = [...this.querySelectorAll<HTMLElement>('[data-view]')];
    if (!('IntersectionObserver' in window)) return views.forEach((el) => this.wake(el));
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        this.observer?.unobserve(entry.target);
        this.wake(entry.target as HTMLElement);
      }
    }, { threshold: 0.35 });
    views.forEach((el) => this.observer?.observe(el));
  }

  wake(el: HTMLElement) {
    switch (el.dataset.view) {
      case 'sweep':
        return this.sweep(el);
      case 'night':
        el.classList.add('on');
        return this.night(0);
      default:
        el.classList.add('on');
    }
  }

  /* 02: the first time it is seen, the line moves on its own, from the old store to the middle */
  sweep(el: HTMLElement) {
    const box = el.querySelector<HTMLElement>('.ba');
    const range = el.querySelector<HTMLInputElement>('.ba-range');
    if (!box || !range || this.still || this.touched) return;
    const from = 92;
    const to = 50;
    const t0 = performance.now() + 500;
    const step = (now: number) => {
      if (this.touched) return;
      const k = Math.min(1, Math.max(0, (now - t0) / 1600));
      const value = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      box.style.setProperty('--ba', `${value}%`);
      range.value = String(value);
      if (k < 1) this.sweepFrame = requestAnimationFrame(step);
    };
    box.style.setProperty('--ba', `${from}%`);
    this.sweepFrame = requestAnimationFrame(step);
  }

  onSlide = (event: Event) => {
    const range = event.target as HTMLInputElement;
    this.touched = true;
    cancelAnimationFrame(this.sweepFrame);
    range.closest<HTMLElement>('.ba')?.style.setProperty('--ba', `${range.value}%`);
  };

  /* 04: a request written at 22:40, the agents at work, done and checked at 07:30 */
  night(req: number) {
    const box = this.querySelector<HTMLElement>('[data-view="night"]');
    if (!box) return;
    clearInterval(this.nightTick);
    clearTimeout(this.nightWait);
    const clock = box.querySelector('[data-night-clock]');
    const phase = (name: string) => {
      box.classList.remove('p-idle', 'p-ask', 'p-night', 'p-done');
      box.classList.add(`p-${name}`);
    };
    box.classList.remove('r0', 'r1', 'r2');
    box.classList.add(`r${req}`);
    box.querySelectorAll<HTMLButtonElement>('[data-req]').forEach((button) => {
      const on = Number(button.dataset.req) === req;
      button.classList.toggle('on', on);
      button.setAttribute('aria-pressed', String(on));
    });
    const ask = box.querySelector('[data-night-ask]');
    if (ask) ask.textContent = this.words.asks[req] || '';
    if (this.still) {
      if (clock) clock.textContent = hhmm(NIGHT_TO);
      return phase('done');
    }
    let minutes = NIGHT_FROM;
    if (clock) clock.textContent = hhmm(minutes);
    phase('ask');
    this.nightWait = window.setTimeout(() => {
      phase('night');
      this.nightTick = window.setInterval(() => {
        minutes += 7;
        if (minutes >= NIGHT_TO) {
          clearInterval(this.nightTick);
          if (clock) clock.textContent = hhmm(NIGHT_TO);
          return phase('done');
        }
        if (clock) clock.textContent = hhmm(minutes);
      }, 40);
    }, 900);
  }

  /* the list runs again from the top */
  rollAgain = () => {
    const roll = this.querySelector<HTMLElement>('.roll');
    if (!roll) return;
    roll.classList.remove('on');
    void roll.offsetWidth;
    roll.classList.add('on');
  };
}

customElements.get('what-we-do') || customElements.define('what-we-do', WhatWeDo);
