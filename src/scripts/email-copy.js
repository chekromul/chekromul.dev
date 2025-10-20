class EmailCopy extends HTMLElement {
  connectedCallback() {
    const email = this.getAttribute("email") || "chekromul@gmail.com";

    this.classList.add("email");
    this.innerHTML = `
      <button type="button" aria-describedby="email-hint">
        <span class="email-hint__text-container">
          <span class="email-hint__text">
            <span>${email}</span>
            <span role="status" aria-live="polite"></span>
          </span>
        </span>
        <svg width="33" height="38" viewBox="0 0 33 38" aria-hidden="true">
          <path
            d="M1.3391 37C8.42916 30.5968 12.5 21.4749 12.5 11.8795V0.5H32.5V12.5C32.5 26.031 21.531 37 8 37H1.3391Z"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </button>
      <small id="email-hint">
        <span aria-hidden="true">⬑ </span>
        <span class="email__hint-click">click</span>
        <span class="email__hint-tap">tap</span>
        to copy
      </small>
      <div class="email__emojis" aria-hidden="true"></div>
    `;

    this.button = this.querySelector("button");
    this.hint = this.querySelector("small");
    this.originalHintText = this.hint.innerHTML;
    this.timeoutId = null;

    this.button.addEventListener("click", () => this.handleClick());
  }

  async handleClick() {
    const email = this.getAttribute("email") || "chekromul@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      this.showCopiedMessage();
      this.createFallingEmojis();
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }

  showCopiedMessage() {
    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Add success state
    this.classList.add("email--copied");

    // Update the status text in span[role="status"]
    const statusSpan = this.querySelector('span[role="status"]');
    if (statusSpan) {
      statusSpan.innerHTML = '<span class="sr-only">email </span>copied!';
    }

    // Reset after 2 seconds
    this.timeoutId = setTimeout(() => {
      this.classList.remove("email--copied");
      const hintText = this.querySelector(".email-hint__text");
      if (hintText && statusSpan) {
        hintText.addEventListener(
          "transitionend",
          () => {
            statusSpan.innerHTML = "";
          },
          { once: true }
        );
      } else if (statusSpan) {
        statusSpan.innerHTML = "";
      }
      this.timeoutId = null;
    }, 2000);
  }

  createFallingEmojis() {
    const svgs = [
      '<svg width="32" height="32" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" /></svg>',
      '<svg width="32" height="32" viewBox="0 0 256 256"><path d="M128,24a104,104,0,0,0,0,208c21.51,0,44.1-6.48,60.43-17.33a8,8,0,0,0-8.86-13.33C166,210.38,146.21,216,128,216a88,88,0,1,1,88-88c0,26.45-10.88,32-20,32s-20-5.55-20-32V88a8,8,0,0,0-16,0v4.26a48,48,0,1,0,5.93,65.1c6,12,16.35,18.64,30.07,18.64,22.54,0,36-17.94,36-48A104.11,104.11,0,0,0,128,24Zm0,136a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/></svg>',
    ];
    const container = this.querySelector(".email__emojis");
    const emojiCount = 12;

    for (let i = 0; i < emojiCount; i++) {
      const template = document.createElement("template");
      template.innerHTML = svgs[Math.floor(Math.random() * svgs.length)];
      const icon = template.content.firstChild;

      // Random position, delay, rotation
      const leftPosition = 10 + Math.random() * 80; // 10% to 90%
      const topPosition = Math.random() * 50; // 0% to 50%
      const delay = Math.random() * 0.2; // 0 to 0.2s delay
      const duration = 0.8 + Math.random() * 0.4; // 0.8 to 1.2s duration
      const rotation = -180 + Math.random() * 360; // -180deg to 180deg

      icon.style.left = `${leftPosition}%`;
      icon.style.top = `${topPosition}%`;
      icon.style.animationDelay = `${delay}s`;
      icon.style.animationDuration = `${duration}s`;
      icon.style.setProperty("--rotation", `${rotation}deg`);

      container.appendChild(icon);

      // Remove icon after animation completes
      setTimeout(() => {
        icon.remove();
      }, (delay + duration) * 1000);
    }
  }

  disconnectedCallback() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

customElements.define("email-copy", EmailCopy);
