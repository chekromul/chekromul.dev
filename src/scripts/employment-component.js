class EmploymentComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [
      "logo",
      "logo-alt",
      "url",
      "url-browser",
      "period",
      "title",
      "preview-description",
    ];
  }

  connectedCallback() {
    this.render();
  }

  get logo() {
    return this.getAttribute("logo") || "";
  }

  get logoAlt() {
    return this.getAttribute("logo-alt") || "";
  }

  get url() {
    return this.getAttribute("url") || "#";
  }

  get urlBrowser() {
    return this.getAttribute("url-browser") || "";
  }

  get period() {
    return this.getAttribute("period") || "";
  }

  get title() {
    return this.getAttribute("title") || "";
  }

  get previewDescription() {
    return this.getAttribute("preview-description") || "";
  }

  render() {
    // Извлекаем app слот отдельно
    const appElement = this.querySelector('[slot="app"]');
    const appSlot = appElement?.outerHTML || "";

    // Удаляем app элемент из DOM перед извлечением описания
    if (appElement) {
      appElement.remove();
    }

    // Теперь извлекаем только описание без app элемента
    const descriptionSlot = this.innerHTML;

    const ariaLabel = this.previewDescription
      ? `aria-label="${this.previewDescription}"`
      : "";

    this.className = "employment";
    this.innerHTML = `
      <div class="employment__container grid">
        <!-- Content -->
        <div class="employment__content">
          <a
            class="employment__logo"
            href="${this.url}"
            target="_blank"
            rel="noopener"
          >
            <img src="${this.logo}" alt="${this.logoAlt}" loading="lazy" />
          </a>
          <p class="employment__period">${this.period}</p>
          <h3 class="employment__title">${this.title}</h3>
          <div class="employment__description">
            ${descriptionSlot}
          </div>
        </div>
        <!-- Canvas -->
        <div class="employment__canvas canvas js-handle-touch" role="img" ${ariaLabel}>
          <div class="app" aria-hidden="true">
            <app-browser class="app__browser" url="${this.urlBrowser}"></app-browser>
            <div class="app__background"></div>
            <div class="app__content">${appSlot}</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("app-employment", EmploymentComponent);
