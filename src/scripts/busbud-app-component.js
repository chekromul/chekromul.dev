class BusbudAppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.className = "bb";
    this.innerHTML = `
      <div class="bb__header">
        <div class="bb__nav">
          <div class="bb__logo perspective drop-shadow">
            <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
              <span>&lt;BrandLogo /&gt;</span>
            </div>
            <svg width="32" height="32" viewBox="0 0 32 32">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.67819 11.7749L11.7749 5.6782C13.2538 4.19929 13.9933 3.45983 14.846 3.18278C15.596 2.93907 16.404 2.93907 17.154 3.18278C18.0067 3.45983 18.7461 4.19928 20.225 5.67817L20.2251 5.67819L26.3218 11.775L26.3218 11.775C27.8007 13.2539 28.5402 13.9933 28.8172 14.846C29.0609 15.596 29.0609 16.404 28.8172 17.154C28.5402 18.0067 27.8007 18.7461 26.3218 20.2251L20.225 26.3218C18.7461 27.8007 18.0067 28.5402 17.154 28.8172C16.404 29.0609 15.596 29.0609 14.846 28.8172C13.9933 28.5402 13.2539 27.8007 11.7749 26.3218L5.67819 20.225C4.19928 18.7461 3.45983 18.0067 3.18278 17.154C2.93907 16.404 2.93907 15.596 3.18278 14.846C3.45983 13.9933 4.19929 13.2538 5.67819 11.7749L5.67819 11.7749ZM21.9385 14.8571C21.8673 15.3503 21.7348 15.8337 21.5433 16.2961C21.2417 17.0241 20.7998 17.6855 20.2426 18.2426C19.6855 18.7998 19.0241 19.2417 18.2961 19.5433C17.5681 19.8448 16.7879 20 16 20C15.2121 20 14.4318 19.8448 13.7039 19.5433C12.9759 19.2417 12.3145 18.7998 11.7574 18.2426C11.2002 17.6855 10.7582 17.0241 10.4567 16.2961C10.2652 15.8337 10.1327 15.3503 10.0615 14.8571L8.08205 15.1429C8.17695 15.8004 8.3536 16.445 8.60896 17.0615C9.011 18.0321 9.60027 18.914 10.3431 19.6569C11.086 20.3997 11.9679 20.989 12.9385 21.391C13.9091 21.7931 14.9494 22 16 22C17.0506 22 18.0909 21.7931 19.0615 21.391C20.0321 20.989 20.914 20.3997 21.6568 19.6569C22.3997 18.914 22.989 18.0321 23.391 17.0615C23.6464 16.445 23.823 15.8004 23.9179 15.1429L21.9385 14.8571Z"
              />
            </svg>
          </div>
          <div class="bb__menu drop-shadow">
            <div class="drop-shadow__annotation drop-shadow__annotation--inline-end">
              <span>&lt;NavMenu /&gt;</span>
            </div>
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
        </div>
        <div class="bb__search bb-search perspective drop-shadow">
          <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
            <span>&lt;SearchForm /&gt;</span>
          </div>
          <div class="bb-search__item bb-search__destination">
            <div class="bb-swap">
              <svg width="20" height="20" viewBox="0 0 256 256">
                <path
                  d="M212.24,171.76a6,6,0,0,1,0,8.48l-32,32a6,6,0,0,1-8.48-8.48L193.51,182H48a6,6,0,0,1,0-12H193.51l-21.75-21.76a6,6,0,0,1,8.48-8.48ZM75.76,116.24a6,6,0,0,0,8.48-8.48L62.49,86H208a6,6,0,0,0,0-12H62.49L84.24,52.24a6,6,0,0,0-8.48-8.48l-32,32a6,6,0,0,0,0,8.48Z"
                />
              </svg>
            </div>
          </div>
          <div class="bb-search__item"></div>
          <div class="bb-search__item"></div>
          <div class="bb-search__item"></div>
          <div class="bb-search__item bb-search__button">
            <svg width="20" height="20" viewBox="0 0 256 256">
              <path
                d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"
              />
            </svg>
          </div>
        </div>
        <div class="bb__dates bb-dates perspective drop-shadow">
          <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
            <span>&lt;FareDates /&gt;</span>
          </div>
          <div class="bb-dates__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-dates__item bb-dates__item--selected">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-dates__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-dates__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-dates__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-dates__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-dates__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
        </div>
      </div>
      <div class="bb__content">
        <div class="bb__toolbar bb-toolbar drop-shadow">
          <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
            <span>&lt;SearchToolbar /&gt;</span>
          </div>
          <div class="bb-toolbar__amount">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-toolbar__sort">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
        </div>
        <div class="bb-filters drop-shadow">
          <div class="drop-shadow__annotation drop-shadow__annotation--inline-start">
            <span>&lt;SearchFilters /&gt;</span>
          </div>
          <div class="bb-filters__heading skeleton perspective"></div>
          <div class="bb-filters__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-filters__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-filters__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-filters__item">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
        </div>
        <div class="bb-card perspective drop-shadow">
          <div class="drop-shadow__annotation drop-shadow__annotation--inline-end">
            <span>&lt;DepartureCard /&gt;</span>
          </div>
          <div class="bb-card__operator skeleton perspective"></div>
          <div class="bb-card__content bb-card-content">
            <div>
              <div class="skeleton perspective"></div>
              <div class="skeleton perspective"></div>
              <div class="skeleton perspective"></div>
            </div>
            <svg width="20" height="20" viewBox="0 0 256 256">
              <path
                d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z"
              />
            </svg>
            <div>
              <div class="skeleton perspective"></div>
              <div class="skeleton perspective"></div>
              <div class="skeleton perspective"></div>
            </div>
          </div>
          <div class="bb-card__amenities">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-card__meta">
            <div class="skeleton perspective"></div>
            <div class="skeleton perspective"></div>
          </div>
          <div class="bb-card__button skeleton perspective"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("busbud-app", BusbudAppComponent);
