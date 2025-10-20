class PhotoStackComponent extends HTMLElement {
  // CONSTRUCTOR ---
  constructor() {
    super();
    this.currentIndex = 0;
    this.currentPhoto = null;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDragging = false;
    this.hasMoved = false;
    this.dragThreshold = 5;

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  // LIFECYCLE METHODS ---
  connectedCallback() {
    this.classList.add("photo-stack");

    this.photoCount = this.photos.length;
    this.style.setProperty("--amount", this.photoCount);

    this.setupAccessibility(this.photoCount);
    this.renderUIElements();
    this.setupPhotos();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListener("mousedown", this.handleDragStart);
    this.removeEventListener("mousemove", this.handleDragMove);
    this.removeEventListener("mouseup", this.handleDragEnd);
    this.removeEventListener("mouseleave", this.handleDragEnd);
    this.removeEventListener("touchstart", this.handleDragStart);
    this.removeEventListener("touchmove", this.handleDragMove);
    this.removeEventListener("touchend", this.handleDragEnd);
    this.removeEventListener("touchcancel", this.handleDragEnd);
    this.removeEventListener("keydown", this.handleKeydown);
  }

  // GETTERS/SETTERS ---
  get photos() {
    return this.querySelectorAll("img");
  }

  // SETUP METHODS ---
  setupAccessibility(photoCount) {
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "group");
    this.setAttribute("aria-roledescription", "carousel");
    this.setAttribute("aria-describedby", "photo-stack-hint");
    this.setAttribute(
      "aria-label",
      `A stack of ${photoCount} photos. Use arrow keys to flip through photos`
    );
  }

  renderUIElements() {
    const uiHTML = `
      <p class="photo-stack__caption" 
         id="photo-stack-caption" 
         aria-live="assertive" 
         aria-atomic="true">
        <span class="sr-only" id="photo-stack-counter"></span>
      </p>
      <p class="photo-stack__hint" 
         id="photo-stack-hint">
        Use arrow keys to flip through photos 
        <span aria-hidden="true">
          <span>←</span>
          <span>→</span>
        </span>
      </p>
    `;

    this.insertAdjacentHTML("beforeend", uiHTML);

    // Cache references to created elements
    this.captionElement = this.querySelector("#photo-stack-caption");
    this.counterElement = this.querySelector("#photo-stack-counter");
    this.hintElement = this.querySelector("#photo-stack-hint");
  }

  setupEventListeners() {
    // Mouse events
    this.addEventListener("mousedown", this.handleDragStart);
    this.addEventListener("mousemove", this.handleDragMove);
    this.addEventListener("mouseup", this.handleDragEnd);
    this.addEventListener("mouseleave", this.handleDragEnd);

    // Touch events
    this.addEventListener("touchstart", this.handleDragStart, {
      passive: false,
    });
    this.addEventListener("touchmove", this.handleDragMove, { passive: false });
    this.addEventListener("touchend", this.handleDragEnd);
    this.addEventListener("touchcancel", this.handleDragEnd);

    // Keyboard navigation
    this.addEventListener("keydown", this.handleKeydown);

    // Photo click listeners
    this.photos.forEach((photo) => {
      photo.addEventListener("click", this.handlePhotoClick);
    });
  }

  setupPhotos() {
    this.photos.forEach((photo, index) => {
      // Set attributes
      photo.setAttribute("draggable", "false");
      photo.setAttribute("aria-describedby", "photo-stack-caption");

      // Initialize position
      photo.dataset.position = index;
      photo.style.setProperty("--position", index);
    });

    this.updateCaption();
    this.updatePhotosAriaHiddenState();
  }

  // PUBLIC NAVIGATION METHODS ---
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photoCount;
    this.photos.forEach((photo) => this.updatePhotoPosition(photo, -1));
    this.updateCaption();
    this.updatePhotosAriaHiddenState();
  }

  previous() {
    this.currentIndex =
      (this.currentIndex - 1 + this.photoCount) % this.photoCount;
    this.photos.forEach((photo) => this.updatePhotoPosition(photo, 1));
    this.updateCaption();
    this.updatePhotosAriaHiddenState();
  }

  goToFirst() {
    while (this.currentIndex !== 0) {
      this.previous();
    }
  }

  goToLast() {
    while (this.currentIndex !== this.photoCount - 1) {
      this.next();
    }
  }

  // HELPER METHODS ---
  updatePhotoPosition(photo, delta) {
    let position = parseInt(photo.dataset.position);
    position += delta;

    if (position < 0) {
      position = this.photoCount - 1;
    } else if (position >= this.photoCount) {
      position = 0;
    }

    photo.dataset.position = position;
    photo.style.setProperty("--position", position);
  }

  updatePhotosAriaHiddenState() {
    this.photos.forEach((photo) => {
      const position = parseInt(photo.dataset.position);
      position === 0
        ? photo.removeAttribute("aria-hidden")
        : photo.setAttribute("aria-hidden", "true");
    });
  }

  getTopPhoto() {
    return Array.from(this.photos).find(
      (photo) => parseInt(photo.dataset.position) === 0
    );
  }

  updateCaption() {
    if (!this.captionElement) return;

    const topPhoto = this.getTopPhoto();

    // Update counter
    this.counterElement.textContent = `Photo ${this.currentIndex + 1} of ${
      this.photoCount
    }. `;

    // Clear caption items
    const captionItems = this.captionElement.querySelectorAll(
      ".photo-stack__caption-item"
    );
    captionItems.forEach((item) => item.remove());

    if (topPhoto && (topPhoto.dataset.caption || topPhoto.dataset.location)) {
      const fragment = document.createDocumentFragment();

      // Caption
      if (topPhoto.dataset.caption) {
        const captionSpan = document.createElement("span");
        captionSpan.className = "photo-stack__caption-item";
        captionSpan.textContent = topPhoto.dataset.caption;
        fragment.appendChild(captionSpan);
      }

      // Location
      if (topPhoto.dataset.location) {
        const locationSpan = document.createElement("span");
        locationSpan.className = "photo-stack__caption-item";
        locationSpan.textContent = topPhoto.dataset.location;
        fragment.appendChild(locationSpan);
      }

      this.captionElement.appendChild(fragment);
    }
  }

  getTouchPoint(event) {
    return event.type.startsWith("touch") ? event.touches[0] : event;
  }

  // EVENT HANDLERS ---
  handleKeydown(event) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case " ":
      case "Enter":
        event.preventDefault();
        this.next();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        this.previous();
        break;
      case "Home":
        event.preventDefault();
        this.goToFirst();
        break;
      case "End":
        event.preventDefault();
        this.goToLast();
        break;
    }
  }

  handlePhotoClick(event) {
    if (!this.isDragging && !this.wasDragging) {
      this.next();
    }
    this.wasDragging = false;
    event.stopPropagation();
  }

  handleDragStart(event) {
    const target = event.target.closest("img");
    if (!target) return;

    this.isDragging = true;
    this.hasMoved = false;
    this.currentPhoto = target;

    const point = this.getTouchPoint(event);
    this.startX = point.clientX;
    this.startY = point.clientY;

    event.preventDefault();
  }

  handleDragMove(event) {
    if (!this.isDragging || !this.currentPhoto) return;

    const point = this.getTouchPoint(event);
    this.currentX = point.clientX - this.startX;
    this.currentY = point.clientY - this.startY;

    if (!this.hasMoved) {
      const distanceSquared = this.currentX ** 2 + this.currentY ** 2;
      if (distanceSquared > this.dragThreshold ** 2) {
        this.hasMoved = true;
        this.currentPhoto.classList.add("is-dragging");
      }
    }

    if (this.hasMoved) {
      this.currentPhoto.style.translate = `${this.currentX}px ${this.currentY}px`;
    }

    event.preventDefault();
  }

  handleDragEnd(event) {
    if (!this.isDragging || !this.currentPhoto) return;

    this.isDragging = false;
    const draggedPhoto = this.currentPhoto;

    if (this.hasMoved) {
      this.wasDragging = true;

      draggedPhoto.classList.remove("is-dragging");
      draggedPhoto.classList.add("is-returning");
      draggedPhoto.style.translate = "";

      this.next();

      draggedPhoto.addEventListener(
        "transitionend",
        () => draggedPhoto.classList.remove("is-returning"),
        { once: true }
      );
    }

    this.currentPhoto = null;
    this.currentX = 0;
    this.currentY = 0;
    this.hasMoved = false;

    event.preventDefault();
  }
}

customElements.define("photo-stack", PhotoStackComponent);
