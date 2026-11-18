/* The nav sticks on the way back up and steps aside on the way down.
   Reading progress, colours and the menu are CSS and <dialog>; this only reads the scroll direction. */
export class SiteNav extends HTMLElement {
  static STICK_AFTER = 180;
  static DEADBAND = 4;

  controller?: AbortController;
  lastY = 0;
  frame = 0;

  get header() {
    return this.querySelector<HTMLElement>('.nav');
  }

  get menu() {
    return this.querySelector<HTMLDialogElement>('dialog');
  }

  connectedCallback() {
    this.controller = new AbortController();
    const { signal } = this.controller;
    this.lastY = window.scrollY;
    window.addEventListener('scroll', this.onScroll, { passive: true, signal });
    this.menu?.addEventListener('click', this.onMenuClick, { signal });
    if (!('command' in HTMLButtonElement.prototype)) this.addEventListener('click', this.onCommand, { signal });
    this.update();
  }

  disconnectedCallback() {
    this.controller?.abort();
    cancelAnimationFrame(this.frame);
  }

  onScroll = () => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(this.update);
  };

  update = () => {
    const header = this.header;
    if (!header) return;
    const y = window.scrollY;
    const delta = y - this.lastY;
    this.lastY = y;
    const stuck = y > SiteNav.STICK_AFTER;
    let hide = header.hasAttribute('data-hide');
    if (!stuck) hide = false;
    else if (delta > SiteNav.DEADBAND) hide = true;
    else if (delta < -SiteNav.DEADBAND) hide = false;
    header.toggleAttribute('data-stuck', stuck);
    header.toggleAttribute('data-hide', hide);
  };

  /* following a link closes the menu, so it is not open again on the way back */
  onMenuClick = (event: Event) => {
    if ((event.target as Element).closest('a')) this.menu?.close();
  };

  /* invoker commands for browsers that do not have them yet */
  onCommand = (event: Event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[commandfor]');
    if (!button) return;
    const dialog = document.getElementById(button.getAttribute('commandfor') || '');
    if (!(dialog instanceof HTMLDialogElement)) return;
    const command = button.getAttribute('command');
    if (command === 'show-modal') dialog.showModal();
    else if (command === 'close') dialog.close();
  };
}

customElements.get('site-nav') || customElements.define('site-nav', SiteNav);
