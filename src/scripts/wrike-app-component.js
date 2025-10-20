class WrikeAppComponent extends HTMLElement {
  constructor() {
    super();
    this.className = "wr";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <!-- Nav -->
      <div class="wr__nav wr-nav wr-card perspective drop-shadow">
        <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
          <span>&lt;Navigation/&gt;</span>
        </div>
        <div class="wr-nav__logo perspective">
          <svg width="24" height="24" viewBox="0 0 16 16">
            <path
              d="M3.753 6.367c.774 0 1.14.143 1.7.706l3.01 3.022c.09.09.107.125.125.179.009.018.009.044.009.062 0 .018 0 .045-.01.063-.017.054-.035.09-.124.179l-2.057 2.074c-.089.089-.124.107-.178.125-.018.009-.044.009-.062.009-.018 0-.045 0-.063-.01-.053-.017-.089-.035-.178-.124L.093 6.796c-.169-.17-.107-.429.178-.429h3.482ZM12.247 2.666c-.774 0-1.14.152-1.7.715l-3.01 3.022c-.09.09-.107.125-.125.179-.009.017-.009.044-.009.062 0 .018 0 .045.01.063.017.053.035.09.124.179L9.594 8.95c.089.089.124.107.178.125a.151.151 0 0 0 .062.009c.018 0 .045 0 .063-.01.053-.017.089-.035.178-.124l5.832-5.856c.169-.17.107-.429-.178-.429h-3.482Z"
            />
          </svg>
        </div>
        <div class="wr-nav__section">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton short perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="wr-nav__section">
          <div class="skeleton perspective"></div>
          <div class="skeleton short perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="wr-nav__section">
          <div class="skeleton perspective"></div>
          <div class="skeleton short perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton short perspective"></div>
        </div>
        <div class="wr-nav__section">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
      </div>

      <!-- Bar chart -->
      <div
        class="wr__bar-chart wr-bar-chart wr-card perspective drop-shadow"
      >
        <div class="drop-shadow__annotation drop-shadow__annotation--block-start">
          <span>&lt;BarChart /&gt;</span>
        </div>
        <div class="perspective"></div>
        <div class="perspective"></div>
        <div class="perspective"></div>
        <div class="perspective"></div>
        <div class="perspective"></div>
      </div>

      <!-- Pie chart -->
      <div
        class="wr__pie-chart wr-pie-chart wr-card perspective drop-shadow"
      >
        <div class="drop-shadow__annotation drop-shadow__annotation--block-start">
          <span>&lt;PieChart /&gt;</span>
        </div>
        <div class="wr-pie-chart__chart perspective"></div>
        <div class="wr-pie-chart__legend">
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

      <!-- Line chart -->
      <div
        class="wr__line-chart wr-line-chart wr-card perspective drop-shadow"
      >
        <div class="drop-shadow__annotation drop-shadow__annotation--block-start">
          <span>&lt;TrendChart /&gt;</span>
        </div>
        <div class="wr-line-chart__container perspective">
          <svg
            width="107"
            height="70"
            viewBox="0 0 107 70"
            fill="none"
          >
            <defs>
              <polyline
                id="wr-line"
                points="0,58 27,46 53,32 80,35 107,26"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </defs>

            <polyline
              class="wr-line-chart__area"
              points="0,58 27,46 53,32 80,35 107,26 107,70 0,70"
            />

            <g class="wr-line-chart__shadow">
              <use href="#wr-line" transform="translate(1,1)" />
              <use href="#wr-line" transform="translate(2,2)" />
              <use href="#wr-line" transform="translate(3,3)" />
              <use href="#wr-line" transform="translate(4,4)" />
              <use href="#wr-line" transform="translate(5,5)" />
            </g>

            <use href="#wr-line" class="wr-line-chart__line" />
            <circle
              class="wr-line-chart__dot"
              cx="27"
              cy="46"
              r="2.5"
            />
            <circle
              class="wr-line-chart__dot"
              cx="53"
              cy="32"
              r="2.5"
            />
            <circle
              class="wr-line-chart__dot"
              cx="80"
              cy="35"
              r="2.5"
            />
          </svg>
        </div>
      </div>

      <!-- Grid -->
      <div class="wr__grid wr-grid wr-card perspective drop-shadow">
        <span class="drop-shadow__annotation drop-shadow__annotation--inline-end">
          <span>&lt;DataGrid /&gt;</span>
        </span>
        <!-- Header -->
        <div><div class="skeleton perspective"></div></div>
        <div><div class="skeleton perspective"></div></div>
        <div><div class="skeleton perspective"></div></div>
        <div><div class="skeleton perspective"></div></div>
        <div><div class="skeleton perspective"></div></div>

        <!-- Row 1 -->
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__status">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="wr-grid__user">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__tags">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>

        <!-- Row 2 -->
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__status">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="wr-grid__user">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__tags">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>

        <!-- Row 3 -->
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__status">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="wr-grid__user">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__tags">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>

        <!-- Row 4 -->
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__status">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="wr-grid__user">
          <div class="skeleton perspective"></div>
        </div>
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__tags">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>

        <!-- Row 5 -->
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__status">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div class="wr-grid__user">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
        <div><div class="skeleton perspective"></div></div>
        <div class="wr-grid__tags">
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
          <div class="skeleton perspective"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("wrike-app", WrikeAppComponent);
