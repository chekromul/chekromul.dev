class ProjectComponent extends HTMLElement {
  static get observedAttributes() {
    return [
      "title",
      "description",
      "image",
      "image-alt",
      "url",
      "source",
      "video",
    ];
  }

  constructor() {
    super();
    this._video = null;
    this._isPlaying = false;
    this._boundUpdateVideoState = null;
  }

  connectedCallback() {
    this.render();
    this.setupVideoHandlers();
  }

  disconnectedCallback() {
    this.cleanupVideoHandlers();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const description = this.getAttribute("description") || "";
    const image = this.getAttribute("image") || "";
    const imageAlt = this.getAttribute("image-alt") || title;
    const url = this.getAttribute("url") || "#";
    const source = this.getAttribute("source") || "";
    const video = this.getAttribute("video") || "";

    const getSourceIcon = () => {
      if (source === "github") {
        return `
          <svg width="24" height="24" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z" />
          </svg>
        `;
      } else if (source === "codepen") {
        return `
          <svg width="24" height="24" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M235.79,89l-104-56a8,8,0,0,0-7.58,0l-104,56A8,8,0,0,0,16,96v64a8,8,0,0,0,4.21,7.05l104,56a8,8,0,0,0,7.58,0l104-56A8,8,0,0,0,240,160V96A8,8,0,0,0,235.79,89ZM224,146.61,189.45,128,224,109.39Zm-51.43-27.7L136,99.22V53.39L215.13,96Zm-44.57,24L100.3,128,128,113.09,155.7,128Zm-8-89.52V99.22L83.43,118.91,40.87,96Zm-88,56L66.55,128,32,146.61Zm51.43,27.7L120,156.78v45.83L40.87,160ZM136,202.61V156.78l36.57-19.69L215.13,160Z"/>
          </svg>
        `;
      }
      return "";
    };

    this.className = "project";
    this.innerHTML = `
      <div class="project__container">
        <div class="project__ear">
          ${getSourceIcon()}
        </div>
        <div class="project__content">
          <a
            class="project__title"
            href="${url}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              ${title}
            </span>
          </a>
          <div class="project__description">
            <p>
              ${description}
            </p>
          </div>
        </div>
        <img
          class="project__image"
          src="${image}"
          alt="${imageAlt}"
          loading="lazy"
        />
        ${
          video &&
          `
          <video
            class="project__video"
            src="${video}"
            muted
            loop
            playsinline
            preload="none"
          ></video>
        `
        }
      </div>
    `;
  }

  setupVideoHandlers() {
    this._video = this.querySelector(".project__video");
    if (!this._video) return;

    // Добавляем обработчик готовности видео
    this._video.addEventListener("canplaythrough", () => {
      this._video.classList.add("is-playback-ready");
    });

    // Check if device supports hover (non-touch device)
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    // Only add video handlers for non-touch devices
    if (supportsHover) {
      // Create bound functions once and reuse them
      if (!this._boundUpdateVideoState) {
        this._boundUpdateVideoState = () => {
          if (this.matches(":hover, :focus-within")) {
            this.playVideo();
          } else {
            this.pauseVideo();
          }
        };
      }

      this.addEventListener("mouseenter", this._boundUpdateVideoState);
      this.addEventListener("mouseleave", this._boundUpdateVideoState);
      this.addEventListener("focusin", this._boundUpdateVideoState);
      this.addEventListener("focusout", this._boundUpdateVideoState);
    }
  }

  playVideo() {
    if (this._video && !this._isPlaying) {
      this._video.currentTime = 0;
      this._video.play().catch(() => {});
      this._isPlaying = true;
    }
  }

  pauseVideo() {
    if (this._video && this._isPlaying) {
      this._video.pause();
      this._isPlaying = false;
    }
  }

  cleanupVideoHandlers() {
    if (this._boundUpdateVideoState) {
      this.removeEventListener("mouseenter", this._boundUpdateVideoState);
      this.removeEventListener("mouseleave", this._boundUpdateVideoState);
      this.removeEventListener("focusin", this._boundUpdateVideoState);
      this.removeEventListener("focusout", this._boundUpdateVideoState);
    }

    // Ensure video is paused and cleaned up
    if (this._video && this._isPlaying) {
      this._video.pause();
      this._isPlaying = false;
    }
    this._video = null;
  }
}

customElements.define("app-project", ProjectComponent);
