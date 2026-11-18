/* The assistant chat with many questions. On each visit it starts from one at random; once the answer
   has been read, the scene fades and plays the next one, at random too, but only while it is on screen.
   The scene itself (question, thinking, answer) is the parent <in-view> and its CSS. */
export class AiChat extends HTMLElement {
  /* from the moment the scene starts: the answer is in at about 4 s, then a few seconds to read it */
  static READ = 10500;
  /* the fade out of the old question, before the new one */
  static FADE = 900;

  scenes: HTMLElement[] = [];
  current = 0;
  visible = false;
  pending = false;
  timer = 0;
  observer?: IntersectionObserver;
  controller?: AbortController;

  get stage() {
    return this.closest('in-view') as (HTMLElement & { see?: () => void }) | null;
  }

  connectedCallback() {
    this.scenes = [...this.querySelectorAll<HTMLElement>('.chat-s')];
    if (!this.scenes.length) return;
    this.show(Math.floor(Math.random() * this.scenes.length));
    if (this.scenes.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.controller = new AbortController();
    this.stage?.addEventListener('seen', () => this.schedule(), { signal: this.controller.signal });
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        if (this.visible && this.pending) this.next();
      }, { threshold: 0.3 });
      this.observer.observe(this);
    }
    if (this.stage?.hasAttribute('data-seen')) this.schedule();
  }

  disconnectedCallback() {
    clearTimeout(this.timer);
    this.observer?.disconnect();
    this.controller?.abort();
  }

  show(index: number) {
    this.current = index;
    this.scenes.forEach((scene, i) => scene.toggleAttribute('data-off', i !== index));
  }

  schedule() {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.next(), AiChat.READ);
  }

  /* any question but the one just shown */
  pick() {
    const others = this.scenes.map((_, i) => i).filter((i) => i !== this.current);
    return others[Math.floor(Math.random() * others.length)];
  }

  next() {
    const stage = this.stage;
    if (!stage) return;
    if (!this.visible || document.hidden) {
      this.pending = true;
      return;
    }
    this.pending = false;
    stage.removeAttribute('data-seen');
    this.timer = window.setTimeout(() => {
      this.show(this.pick());
      void stage.offsetWidth;
      if (stage.see) stage.see();
      else stage.toggleAttribute('data-seen', true);
    }, AiChat.FADE);
  }
}

customElements.get('ai-chat') || customElements.define('ai-chat', AiChat);
