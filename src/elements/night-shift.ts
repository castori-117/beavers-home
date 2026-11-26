/* One night on the lake. The night plays once by itself, then the sun can be dragged along the line.
   This writes only --day, the clock and three flags ([data-cap], [data-day], [data-sky]); CSS mixes the rest.
   The agents are fireflies on a canvas, awake between 23:00 and 06:00. */
interface Firefly {
  cx: number; cy: number; ax: number; ay: number;
  w1: number; w2: number; w3: number;
  p1: number; p2: number; p3: number;
  size: number; water: number;
}

const smooth = (a: number, b: number, x: number) => {
  const u = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return u * u * (3 - 2 * u);
};

export class NightShift extends HTMLElement {
  /* the painting the fireflies are placed on */
  static ART_W = 2400;
  static ART_H = 1100;
  /* the night plays itself: [seconds, position] */
  static SCRIPT: [number, number][] = [[0, 0], [1.6, 0], [4.2, 0.364], [6.2, 0.364], [9.4, 0.864], [11.2, 0.864], [12.8, 1]];
  static DAY_FROM = 0.6;
  static DAY_TO = 0.84;
  static FIRST_FRAME = 0.364;

  section: HTMLElement | null = null;
  range: HTMLInputElement | null = null;
  clockEl: HTMLElement | null = null;
  ticks: HTMLButtonElement[] = [];
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  keys: number[] = [];
  start = 0;
  span = 0;
  t = 0;
  dpr = 1;
  still = false;
  visible = true;
  frame = 0;
  play: { t0: number } | null = null;
  glide: { from: number; to: number; t0: number; dur: number } | null = null;
  flies: Firefly[] = [];
  controller?: AbortController;
  observer?: IntersectionObserver;
  sizer?: ResizeObserver;

  connectedCallback() {
    this.section = this.querySelector('.nt');
    this.range = this.querySelector('input[type="range"]');
    this.clockEl = this.querySelector('[data-clock]');
    this.ticks = [...this.querySelectorAll<HTMLButtonElement>('[data-key]')];
    this.canvas = this.querySelector('canvas');
    this.context = this.canvas?.getContext('2d') ?? null;
    this.keys = (this.dataset.keys || '0,1').split(',').map(Number);
    this.start = Number(this.dataset.start || 1320);
    this.span = Number(this.dataset.span || 660);
    this.still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.flies = this.makeFlies();

    this.controller = new AbortController();
    const { signal } = this.controller;
    this.range?.addEventListener('input', this.onInput, { signal });
    this.range?.addEventListener('change', this.release, { signal });
    this.addEventListener('click', this.onTick, { signal });
    this.sizer = new ResizeObserver(this.size);
    if (this.canvas) this.sizer.observe(this.canvas);
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.loop();
    });
    if (this.section) this.observer.observe(this.section);

    if (this.still) this.set(NightShift.FIRST_FRAME);
    else this.play = { t0: performance.now() };
    this.loop();
  }

  disconnectedCallback() {
    this.controller?.abort();
    this.observer?.disconnect();
    this.sizer?.disconnect();
    cancelAnimationFrame(this.frame);
  }

  loop() {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(this.tick);
  }

  clock(v: number) {
    const minutes = (Math.round((this.start + v * this.span) / 5) * 5) % 1440;
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
  }

  /* one moment of the night, written out to the page */
  set(v: number) {
    this.t = v;
    const section = this.section;
    if (!section) return;
    const day = smooth(NightShift.DAY_FROM, NightShift.DAY_TO, v);
    const caption = v < 0.18 ? 0 : v < 0.62 ? 1 : v < 0.95 ? 2 : 3;
    const time = this.clock(v);
    section.style.setProperty('--day', day.toFixed(3));
    section.dataset.cap = String(caption);
    section.toggleAttribute('data-day', day >= 0.45);
    section.toggleAttribute('data-sky', day >= 0.62);
    if (this.clockEl && this.clockEl.textContent !== time) this.clockEl.textContent = time;
    if (this.range && document.activeElement !== this.range) this.range.value = String(Math.round(v * 1000));
    this.range?.setAttribute('aria-valuetext', time);
    for (const tick of this.ticks) tick.toggleAttribute('aria-current', Math.abs(v - Number(tick.dataset.key)) < 0.01);
  }

  onInput = () => {
    this.play = null;
    this.glide = null;
    this.set(Number(this.range!.value) / 1000);
    this.loop();
  };

  /* let go near a moment and the sun settles on it */
  release = () => {
    const near = this.keys.reduce((best, key) => (Math.abs(key - this.t) < Math.abs(best - this.t) ? key : best), this.keys[0]);
    if (Math.abs(near - this.t) < 0.05 && near !== this.t) this.glideTo(near);
  };

  onTick = (event: Event) => {
    const tick = (event.target as Element).closest<HTMLButtonElement>('[data-key]');
    if (tick) this.glideTo(Number(tick.dataset.key));
  };

  glideTo(v: number) {
    this.play = null;
    if (this.still) return this.set(v);
    this.glide = { from: this.t, to: v, t0: performance.now(), dur: 380 + 900 * Math.abs(v - this.t) };
    this.loop();
  }

  scripted(seconds: number) {
    const script = NightShift.SCRIPT;
    if (seconds >= script[script.length - 1][0]) return null;
    for (let i = 1; i < script.length; i++) {
      if (seconds < script[i][0]) {
        const [s0, v0] = script[i - 1];
        const [s1, v1] = script[i];
        const u = (seconds - s0) / (s1 - s0);
        return v0 + (v1 - v0) * u * u * (3 - 2 * u);
      }
    }
    return 1;
  }

  tick = (now: number) => {
    if (this.glide) {
      const { from, to, t0, dur } = this.glide;
      const u = Math.min(1, (now - t0) / dur);
      this.set(from + (to - from) * (1 - Math.pow(1 - u, 3)));
      if (u >= 1) this.glide = null;
    } else if (this.play) {
      const v = this.scripted((now - this.play.t0) / 1000);
      if (v === null) {
        this.play = null;
        this.set(1);
      } else this.set(v);
    }
    this.draw(now);
    const awake = this.glide || this.play || this.fliesShown() > 0.001;
    if (this.visible && awake) this.frame = requestAnimationFrame(this.tick);
  };

  size = () => {
    const canvas = this.canvas;
    if (!canvas) return;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    const box = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(box.width * this.dpr));
    const height = Math.max(1, Math.round(box.height * this.dpr));
    if (canvas.width !== width || canvas.height !== height) Object.assign(canvas, { width, height });
    this.loop();
  };

  makeFlies() {
    let seed = 7;
    const random = () => ((seed = (seed * 16807) % 2147483647), seed / 2147483647);
    const between = (a: number, b: number) => a + (b - a) * random();
    const flies: Firefly[] = [];
    const swarm = (count: number, x0: number, x1: number, y0: number, y1: number, ax0: number, ax1: number, ay0: number, ay1: number, water: number) => {
      for (let i = 0; i < count; i++) {
        flies.push({
          cx: between(x0, x1), cy: between(y0, y1), ax: between(ax0, ax1), ay: between(ay0, ay1),
          w1: between(0.12, 0.42), w2: between(0.18, 0.55), w3: between(0.9, 2.4),
          p1: between(0, 6.28), p2: between(0, 6.28), p3: between(0, 6.28),
          size: between(0.75, 1.3), water
        });
      }
    };
    swarm(9, 1390, 1640, 600, 715, 30, 120, 10, 34, 742); /* around the lodge */
    swarm(4, 880, 1260, 612, 640, 60, 150, 6, 16, 664); /* along the far shore */
    swarm(3, 250, 540, 742, 770, 30, 90, 5, 12, 800); /* by the reeds */
    return flies;
  }

  fliesShown() {
    return smooth(0.05, 0.2, this.t) * (1 - smooth(0.6, 0.8, this.t));
  }

  draw(now: number) {
    const canvas = this.canvas;
    const context = this.context;
    if (!canvas || !context) return;
    const d = this.dpr;
    const w = canvas.width / d;
    const h = canvas.height / d;
    const shown = this.fliesShown();
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (shown <= 0.001) return;
    const scale = Math.max(w / NightShift.ART_W, h / NightShift.ART_H);
    const ox = (w - NightShift.ART_W * scale) * 0.62;
    const oy = (h - NightShift.ART_H * scale) * 0.5;
    const seconds = this.still ? 0 : now / 1000;
    const grow = Math.max(0.8, scale * 1.6);
    context.globalCompositeOperation = 'lighter';
    for (const fly of this.flies) {
      const x = fly.cx + fly.ax * Math.sin(fly.w1 * seconds + fly.p1) + fly.ax * 0.3 * Math.sin(2.3 * fly.w1 * seconds + fly.p2);
      const y = fly.cy + fly.ay * Math.sin(fly.w2 * seconds + fly.p2);
      const alpha = shown * (0.55 + 0.45 * Math.sin(fly.w3 * seconds + fly.p3));
      const px = (ox + x * scale) * d;
      const py = (oy + y * scale) * d;
      const glow = (14 + 10 * fly.size) * grow * d;
      const halo = context.createRadialGradient(px, py, 0, px, py, glow);
      halo.addColorStop(0, `rgb(160 236 255 / ${(0.7 * alpha).toFixed(3)})`);
      halo.addColorStop(0.35, `rgb(121 227 255 / ${(0.22 * alpha).toFixed(3)})`);
      halo.addColorStop(1, 'rgb(121 227 255 / 0)');
      context.fillStyle = halo;
      context.beginPath();
      context.arc(px, py, glow, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = `rgb(236 251 255 / ${(0.95 * alpha).toFixed(3)})`;
      context.beginPath();
      context.arc(px, py, Math.max(1.2, 2.6 * fly.size * grow) * d, 0, Math.PI * 2);
      context.fill();
      /* the reflection on the water */
      if (fly.water > y && fly.water - y < 140) {
        const ry = (oy + (2 * fly.water - y) * scale) * d;
        const radius = glow * 0.75;
        const mirror = context.createRadialGradient(px, ry, 0, px, ry, radius);
        mirror.addColorStop(0, `rgb(121 227 255 / ${(0.2 * alpha).toFixed(3)})`);
        mirror.addColorStop(1, 'rgb(121 227 255 / 0)');
        context.fillStyle = mirror;
        context.save();
        context.translate(px, ry);
        context.scale(0.55, 1.5);
        context.translate(-px, -ry);
        context.beginPath();
        context.arc(px, ry, radius, 0, Math.PI * 2);
        context.restore();
        context.fill();
      }
    }
    context.globalCompositeOperation = 'source-over';
  }
}

customElements.get('night-shift') || customElements.define('night-shift', NightShift);
