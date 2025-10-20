class ThemeSwitcher extends HTMLElement {
  constructor() {
    super();
    // Bind the outside click handler so we can add/remove it
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    this.classList.add("theme-switcher");
    this.setAttribute("role", "group");
    this.setAttribute("aria-label", "Theme and color switcher");
    if (!this._rendered) {
      this.innerHTML = `
        <div class="theme-switcher__controls">
          <button
            class="theme-switcher__button"
            value="auto"
            title="System preference"
            aria-label="System preference"
          >
            <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true">
              <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Z"/>
            </svg>
          </button>
          <button
            class="theme-switcher__button"
            value="light"
            title="Light"
            aria-label="Light"
          >
            <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true">
              <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/>
            </svg>
          </button>
          <button
            class="theme-switcher__button"
            value="dark"
            title="Dark"
            aria-label="Dark"
          >
            <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true">
              <path d="M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z"/>
            </svg>
          </button>
        </div>
        <button
          class="theme-switcher__button theme-switcher__color-button"
          title="Accent color"
          aria-label="Accent color panel"
          aria-expanded="false"
          aria-controls="color-panel"
        >
          <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"/>
          </svg>
        </button>
        <div
          class="theme-switcher__panel"
          id="color-panel"
          hidden
        >
          <button
            class="theme-switcher__color-option"
            value="peach"
            aria-label="Peach"
            title="Peach"
            data-color="peach"
          ></button>
          <button
            class="theme-switcher__color-option"
            value="mint"
            aria-label="Mint"
            title="Mint"
            data-color="mint"
          ></button>
          <button
            class="theme-switcher__color-option"
            value="blueberry"
            aria-label="Blueberry"
            title="Blueberry"
            data-color="blueberry"
          ></button>
          <button
            class="theme-switcher__color-option"
            value="plum"
            aria-label="Plum"
            title="Plum"
            data-color="plum"
          ></button>
          <button
            class="theme-switcher__color-option"
            value="olive"
            aria-label="Olive"
            title="Olive"
            data-color="olive"
          ></button>
        </div>
      `;
      this._rendered = true;
    }
    this._updateActive();

    // Theme buttons
    this.querySelectorAll(".theme-switcher__controls > button").forEach(
      (button) => {
        button.addEventListener("click", () => {
          const theme = button.value;
          this._setTheme(theme);
        });
      }
    );

    // Color picker button
    const colorPicker = this.querySelector(".theme-switcher__color-button");
    const panel = this.querySelector(".theme-switcher__panel");

    colorPicker.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = !panel.hasAttribute("hidden");

      if (isOpen) {
        this._closePanel();
      } else {
        this._openPanel();
      }
    });

    // Color options
    this.querySelectorAll(".theme-switcher__color-option").forEach((button) => {
      button.addEventListener("click", () => {
        const color = button.value;
        this._setColor(color);
      });
    });

    window.addEventListener("themechange", () => this._updateActive());
    window.addEventListener("colorchange", () => this._updateActive());
  }

  _handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this._closePanel();
    }
  }

  _setTheme(theme) {
    if (theme === "auto") {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    window.dispatchEvent(new Event("themechange"));
  }

  _setColor(color) {
    localStorage.setItem("color", color);
    document.documentElement.setAttribute("data-color", color);
    window.dispatchEvent(new Event("colorchange"));
  }

  _openPanel() {
    const toggleButton = this.querySelector(".theme-switcher__color-button");
    const panel = this.querySelector(".theme-switcher__panel");

    toggleButton.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");
    document.addEventListener("click", this._handleOutsideClick);
  }

  _closePanel() {
    const toggleButton = this.querySelector(".theme-switcher__color-button");
    const panel = this.querySelector(".theme-switcher__panel");

    toggleButton.setAttribute("aria-expanded", "false");
    panel.setAttribute("hidden", "");
    document.removeEventListener("click", this._handleOutsideClick);
  }

  _updateActive() {
    const theme = localStorage.getItem("theme") || "auto";
    const color = localStorage.getItem("color") || "peach";

    this.querySelectorAll(".theme-switcher__controls > button").forEach(
      (button) => {
        button.setAttribute("aria-pressed", button.value === theme);
      }
    );

    this.querySelectorAll(".theme-switcher__color-option").forEach((button) => {
      button.setAttribute("aria-pressed", button.value === color);
    });
  }
}

customElements.define("theme-switcher", ThemeSwitcher);

// Apply theme and color on page load
(function () {
  const theme = localStorage.getItem("theme");
  const color = localStorage.getItem("color") || "peach";

  // Apply theme (auto = system preference)
  if (theme === "dark" || theme === "light") {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    // Auto mode: use system preference
    document.documentElement.removeAttribute("data-theme");
  }

  // Always apply color (default is peach)
  document.documentElement.setAttribute("data-color", color);
})();
