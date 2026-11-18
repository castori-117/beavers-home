/* Ripples on the dawn lake: under the pointer, on a tap, and now and then on their own.
   Only below the horizon line of the painting, and only while the hero is on screen. */
interface Ripple {
  x: number;
  y: number;
  t0: number;
  dur: number;
  max: number;
  squash: number;
}

export class LakeRipples extends HTMLElement {
  /* the painting: 2400×1200, horizon at y=800, framed at 62% down */
  static ART_W = 2400;
  static ART_H = 1200;
  static HORIZON = 800;
  static FOCUS_Y = 0.62;
  static MAX = 40;

  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  ripples: Ripple[] = [];
  last = { x: -999, y: -999, t: 0 };
  dpr = 1;
  visible = true;
  dirty = true;
  frame = 0;
  nextAmbient = 0;
  still = false;
  controller?: AbortController;
  observer?: IntersectionObserver;
  sizer?: ResizeObserver;

  connectedCallback() {
    this.canvas = this.querySelector('canvas');
    this.context = this.canvas?.getContext('2d') ?? null;
    if (!this.canvas || !this.context) return;
    this.still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.still) return;
    this.controller = new AbortController();
    const { signal } = this.controller;
    this.addEventListener('pointermove', this.onMove, { signal });
    this.addEventListener('pointerdown', this.onDown, { signal });
    this.sizer = new ResizeObserver(this.size);
    this.sizer.observe(this);
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.start();
    });
    this.observer.observe(this);
    this.nextAmbient = performance.now() + 4200;
    this.start();
  }

  disconnectedCallback() {
    this.controller?.abort();
    this.observer?.disconnect();
    this.sizer?.disconnect();
    cancelAnimationFrame(this.frame);
  }

  start() {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(this.tick);
  }

  size = () => {
    const canvas = this.canvas;
    if (!canvas) return;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    const box = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(box.width * this.dpr));
    const height = Math.max(1, Math.round(box.height * this.dpr));
    if (canvas.width !== width || canvas.height !== height) Object.assign(canvas, { width, height });
    this.dirty = true;
  };

  geometry() {
    const canvas = this.canvas!;
    const w = canvas.width / this.dpr;
    const h = canvas.height / this.dpr;
    const scale = Math.max(w / LakeRipples.ART_W, h / LakeRipples.ART_H);
    const offsetY = (h - LakeRipples.ART_H * scale) * LakeRipples.FOCUS_Y;
    return { w, h, horizon: offsetY + LakeRipples.HORIZON * scale };
  }

  spawn(x: number, y: number, big: boolean) {
    const { h, horizon } = this.geometry();
    if (y < horizon + 4) return false;
    const depth = Math.min(1, (y - horizon) / Math.max(1, h - horizon));
    this.ripples.push({ x, y, t0: performance.now(), dur: big ? 3400 : 2600, max: (26 + 50 * depth) * (big ? 1.7 : 1), squash: 0.14 + 0.24 * depth });
    if (this.ripples.length > LakeRipples.MAX) this.ripples.shift();
    return true;
  }

  point(event: PointerEvent) {
    const box = this.canvas!.getBoundingClientRect();
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  }

  touched() {
    this.toggleAttribute('data-touched', true);
  }

  onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const { x, y } = this.point(event);
    const now = performance.now();
    const dx = x - this.last.x;
    const dy = y - this.last.y;
    if (dx * dx + dy * dy < 900 || now - this.last.t < 70) return;
    if (this.spawn(x, y, false)) {
      this.last = { x, y, t: now };
      this.touched();
    }
  };

  onDown = (event: PointerEvent) => {
    const { x, y } = this.point(event);
    if (this.spawn(x, y, true)) this.touched();
  };

  tick = (now: number) => {
    if (!this.visible) return;
    this.frame = requestAnimationFrame(this.tick);
    this.draw(now);
  };

  draw(now: number) {
    const canvas = this.canvas!;
    const context = this.context!;
    const d = this.dpr;
    if (now > this.nextAmbient) {
      const { w, h, horizon } = this.geometry();
      if (h > horizon + 30) this.spawn(w * (0.12 + Math.random() * 0.76), horizon + 14 + Math.random() * (h - horizon - 28) * 0.85, false);
      this.nextAmbient = now + 2600 + Math.random() * 4200;
    }
    if (!this.ripples.length && !this.dirty) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.dirty = false;
    this.ripples = this.ripples.filter((ripple) => now - ripple.t0 < ripple.dur);
    context.lineWidth = 1.2 * d;
    for (const ripple of this.ripples) {
      const u = (now - ripple.t0) / ripple.dur;
      for (let ring = 0; ring < 3; ring++) {
        const uu = u - ring * 0.13;
        if (uu <= 0) continue;
        const radius = ripple.max * (1 - Math.pow(1 - uu, 3));
        const alpha = Math.pow(1 - u, 1.6) * (0.55 - ring * 0.15);
        if (alpha <= 0 || radius < 1) continue;
        const ry = radius * ripple.squash;
        context.strokeStyle = `rgb(20 32 44 / ${(alpha * 0.28).toFixed(3)})`;
        context.beginPath();
        context.ellipse(ripple.x * d, (ripple.y + 1.5) * d, radius * d, ry * d, 0, 0, Math.PI * 2);
        context.stroke();
        context.strokeStyle = `rgb(250 253 255 / ${alpha.toFixed(3)})`;
        context.beginPath();
        context.ellipse(ripple.x * d, ripple.y * d, radius * d, ry * d, 0, 0, Math.PI * 2);
        context.stroke();
      }
    }
    if (this.ripples.length) this.dirty = true;
  }
}

customElements.get('lake-ripples') || customElements.define('lake-ripples', LakeRipples);
