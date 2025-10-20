class CelonisAppComponent extends HTMLElement {
  constructor() {
    super();
    this.className = "cs";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <!-- Nav -->
      <div class="cs__nav perspective drop-shadow">
        <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
          <span>&lt;ce-navigation /&gt;</span>
        </div>
        <div class="cs-nav__logo">
          <div class="perspective">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <path
                d="M15.93 32c-4.17 0-7.97-1.4-10.7-3.91A12.85 12.85 0 0 1 1 18.45c0-4.95 2.44-6.4 5.8-8.41 1.03-.6 2.19-1.28 3.37-2.16 1.9-1.31 3.5-3.03 4.7-5.02C15.9 1.28 16.7 0 19.17 0c2.25 0 4.49 1.07 6.47 3.08C28.9 6.4 31 11.8 31 16.8c0 3.98-1.54 7.8-4.27 10.64A14.82 14.82 0 0 1 16.07 32h-.14ZM10.79 8.76c-1.23.88-2.4 1.58-3.45 2.2-3.3 1.96-5.29 3.15-5.29 7.49a11.94 11.94 0 0 0 3.88 8.86c2.54 2.33 6.1 3.62 10 3.63h.14a13.6 13.6 0 0 0 9.9-4.26 14.32 14.32 0 0 0 3.97-9.9c0-4.68-2.01-9.88-5.04-12.97-1.78-1.8-3.78-2.77-5.73-2.77-1.89 0-2.4.8-3.42 2.38a17.55 17.55 0 0 1-4.96 5.34ZM20.07 13a4.62 4.62 0 0 1 1.6 2.88h-2.23c-.1-.6-.43-1.15-.9-1.53a2.84 2.84 0 0 0-1.79-.56 2.67 2.67 0 0 0-2.04.88c-.54.58-.81 1.44-.81 2.56a3.7 3.7 0 0 0 .81 2.56 2.68 2.68 0 0 0 2.04.88 2.8 2.8 0 0 0 1.79-.56c.48-.38.8-.93.9-1.54h2.24a4.65 4.65 0 0 1-1.62 2.9 5 5 0 0 1-3.28 1.07c-.9.01-1.81-.2-2.61-.64a4.49 4.49 0 0 1-1.8-1.85 5.89 5.89 0 0 1-.64-2.83c-.03-.98.2-1.96.65-2.82a4.51 4.51 0 0 1 1.79-1.85c.8-.42 1.7-.63 2.62-.6A5 5 0 0 1 20.07 13"
              />
            </svg>
          </div>
        </div>
        <div class="cs-nav__item">
          <div class="skeleton perspective"></div>
        </div>
        <div class="cs-nav__item">
          <div class="skeleton perspective"></div>
        </div>
        <div class="cs-nav__item">
          <div class="skeleton perspective"></div>
        </div>
        <div class="cs-nav__item">
          <div class="skeleton perspective"></div>
        </div>
      </div>
      <!-- Stats -->
      <div class="cs__stats cs-card perspective drop-shadow">
        <div class="drop-shadow__annotation drop-shadow__annotation--block-start">
          <span>&lt;ce-stats /&gt;</span>
        </div>
        <div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
      </div>
      <!-- Donut chart -->
      <div
        class="cs__donut-chart cs-donut-chart cs-card perspective drop-shadow"
      >
        <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
          <span>&lt;ce-donut-chart /&gt;</span>
        </div>
        <div class="cs-donut-chart__chart perspective"></div>
        <div class="cs-donut-chart__list">
          <div>
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>

          <div>
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div>
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
        </div>
      </div>
      <!-- Bar chart -->
      <div
        class="cs__bar-chart cs-card cs-xy-chart perspective drop-shadow"
      >
        <div class="drop-shadow__annotation drop-shadow__annotation--inline-end">
          <span>&lt;ce-bar-chart /&gt;</span>
        </div>
        <div class="cs-xy-chart__y">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="cs-xy-chart__chart cs-bars">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="cs-xy-chart__x">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
      </div>
      <!-- Line chart -->
      <div
        class="cs__line-chart cs-card cs-xy-chart perspective drop-shadow"
      >
        <div class="drop-shadow__annotation drop-shadow__annotation--inline-end">
          <span>&lt;ce-line-chart /&gt;</span>
        </div>
        <div class="cs-xy-chart__y">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="cs-xy-chart__chart cs-line">
          <svg
            width="489"
            height="103"
            viewBox="0 0 489 103"
            fill="none"
          >
            <defs>
              <polyline
                id="line"
                points="6,82 60,70 113,74 167,52 222,59 276,45 329,41 383,55 437,40 483,46"
                fill="none"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
            </defs>
            <g>
              <use href="#line" transform="translate(1,1)" />
              <use href="#line" transform="translate(2,2)" />
              <use href="#line" transform="translate(3,3)" />
              <use href="#line" transform="translate(4,4)" />
              <use href="#line" transform="translate(5,5)" />
            </g>
            <use href="#line" />
            <circle cx="6" cy="82" r="2.5" />
            <circle cx="60" cy="70" r="2.5" />
            <circle cx="113" cy="74" r="2.5" />
            <circle cx="167" cy="52" r="2.5" />
            <circle cx="222" cy="59" r="2.5" />
            <circle cx="276" cy="45" r="2.5" />
            <circle cx="329" cy="41" r="2.5" />
            <circle cx="383" cy="55" r="2.5" />
            <circle cx="437" cy="40" r="2.5" />
            <circle cx="483" cy="46" r="2.5" />
          </svg>
        </div>
        <div class="cs-xy-chart__x">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("celonis-app", CelonisAppComponent);
