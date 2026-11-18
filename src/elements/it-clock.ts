/* Shows the time in Italy and flags the night (20:00–8:00), when the agents are the ones at work.
   The dot and its pulse are pure CSS on [data-night]; this only keeps the minutes right. */
export class ItClock extends HTMLElement {
  static NIGHT_FROM = 20;
  static NIGHT_TO = 8;
  timer?: number;

  connectedCallback() {
    this.tick();
    this.timer = window.setInterval(this.tick, 15_000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  tick = () => {
    let hour: number;
    let minute: number;
    try {
      const parts = new Intl.DateTimeFormat('it-IT', { timeZone: this.dataset.tz || 'Europe/Rome', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      hour = Number(parts.find(({ type }) => type === 'hour')?.value) % 24;
      minute = Number(parts.find(({ type }) => type === 'minute')?.value);
    } catch {
      const now = new Date();
      hour = now.getHours();
      minute = now.getMinutes();
    }
    const label = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    const time = this.querySelector<HTMLTimeElement>('[data-time]');
    if (time && time.textContent !== label) {
      time.textContent = label;
      time.dateTime = label;
    }
    const night = hour >= ItClock.NIGHT_FROM || hour < ItClock.NIGHT_TO;
    this.toggleAttribute('data-night', night);
    const status = night ? this.dataset.nightLabel : this.dataset.day;
    if (status && this.parentElement) this.parentElement.title = status;
  };
}

customElements.get('it-clock') || customElements.define('it-clock', ItClock);
