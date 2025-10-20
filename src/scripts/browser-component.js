class BrowserComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["url"];
  }

  connectedCallback() {
    this.render();
  }

  get url() {
    return this.getAttribute("url") || "";
  }

  set url(value) {
    this.setAttribute("url", value);
  }

  render() {
    this.classList.add("browser");
    this.innerHTML = `
      <div class="browser__bar">
        <div class="browser__buttons">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="browser__url">
          <span>${this.url}</span>
        </div>
        <div class="browser__actions">
          <svg width="20" height="20" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M184,72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V88A16,16,0,0,0,184,72Zm0,128H40V88H184V200ZM232,56V176a8,8,0,0,1-16,0V56H64a8,8,0,0,1,0-16H216A16,16,0,0,1,232,56Z"/>
          </svg>
        </div>
      </div>
      <div class="browser__content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("app-browser", BrowserComponent);
