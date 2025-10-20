import { createNoise2D } from "simplex-noise";

const svgNs = "http://www.w3.org/2000/svg";

class NoiseLine {
  // Represents a single noisy line
  constructor(x, y, length, amplitude, simplex, xZoom, yZoom) {
    this.x = x; // Start X
    this.y = y; // Start Y
    this.length = length; // Line length
    this.amplitude = amplitude; // Wave amplitude
    this.simplex = simplex;
    this.xZoom = xZoom;
    this.yZoom = yZoom;
  }

  // Draws the line as an SVG path and applies animation delay
  draw(groupElement, delay = 0) {
    const path = document.createElementNS(svgNs, "path");
    const points = this.generatePoints();
    const commands = this.convertPointsToCommands(points);
    path.setAttribute("d", commands);

    groupElement.appendChild(path);

    // Set CSS variables for animation (path length and delay)
    path.style.setProperty("--path-length", path.getTotalLength());
    path.style.setProperty("--line-delay", `${delay}s`);
  }

  // Generates noisy points for the line
  generatePoints() {
    const points = [];
    const dx = this.length / 200; // Calculate step size so that the line is split into ~200 segments

    for (let x = 0; x < this.length; x += dx) {
      // Calculate the y position using simplex noise for a wavy effect
      const y =
        this.y +
        this.simplex(x / this.xZoom, this.y / this.yZoom) * this.amplitude;
      points.push(`${(this.x + x).toFixed(1)}, ${y.toFixed(1)}`);
    }

    return points;
  }

  // Converts array of points to SVG path commands
  convertPointsToCommands(points) {
    const commands = [`M ${points[0]}`]; // Move to first point

    for (let i = 1; i < points.length; i++) {
      commands.push(`L ${points[i]}`); // Line to next point
    }

    return commands.join(" ");
  }
}

class NoiseLines extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.w = 0;
    this.h = 0;
    this.prevW = 0;
    this.prevH = 0; // Cache previous dimensions to avoid unnecessary redraws
    this.currentGroup = null; // Cache current group element
    this.resizeObserver = null;
    this.scrollHandler = null; // Store scroll handler reference for cleanup
    this.hasDrawn = false; // Track if initial draw has happened
  }

  static get observedAttributes() {
    return ["clickable", "on-scroll-end", "on-visible", "compact"];
  }

  connectedCallback() {
    this.render();
    this.setupResizeObserver();

    // Check if scroll-end trigger is enabled
    if (this.hasAttribute("on-scroll-end")) {
      this.setupScrollEndObserver();
    } else if (this.hasAttribute("on-visible")) {
      this.setupVisibilityObserver();
    } else {
      this.draw();
    }

    if (this.hasAttribute("clickable")) {
      this.svg.addEventListener("click", () => this.draw());
    }
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.querySelector("svg")) {
      this.updateGradient();
    }
  }

  render() {
    const gradientId = `gradient-${Math.random().toString(36).slice(2, 11)}`;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        g {
          stroke: url(#${gradientId});
          stroke-width: 1;
          stroke-linecap: round;
        }

        path {
          stroke-dasharray: var(--path-length);
          stroke-dashoffset: var(--path-length);
          animation: drawLine 0.75s cubic-bezier(0.47, 0, 0.745, 0.715) forwards;
          animation-delay: var(--line-delay);
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      </style>
      <svg aria-hidden="true">
        <defs>
          <linearGradient
            id="${gradientId}"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
          >
            <stop offset="0%" stop-color="var(--color-theme-3)" />
            <stop offset="100%" stop-color="var(--color-theme-8)" />
          </linearGradient>
        </defs>
      </svg>
    `;

    this.svg = this.shadowRoot.querySelector("svg");
    this.gradient = this.shadowRoot.querySelector("linearGradient");
  }

  setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeSVG();
    });
    this.resizeObserver.observe(this);
  }

  setupScrollEndObserver() {
    // For on-scroll-end: check if page is scrolled to bottom
    this.scrollHandler = () => {
      if (!this.hasDrawn) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        // Check if scrolled to bottom (with small threshold for rounding errors)
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

        if (isAtBottom) {
          this.hasDrawn = true;
          this.draw();
          // Remove listener after first draw
          window.removeEventListener("scroll", this.scrollHandler);
        }
      }
    };

    window.addEventListener("scroll", this.scrollHandler, { passive: true });

    // Also check on load in case page is already at bottom
    this.scrollHandler();
  }

  setupVisibilityObserver() {
    // For on-visible: render lines when element enters viewport
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasDrawn) {
            this.hasDrawn = true;
            this.draw();
            obs.disconnect();
          }
        });
      },
      { threshold: 1 }
    );
    observer.observe(this);
  }

  resizeSVG() {
    // Get current dimensions
    const newW = this.offsetWidth;
    const newH = this.offsetHeight;

    // Early return if no valid dimensions
    if (!newW || !newH) return;

    // Check if dimensions actually changed to avoid unnecessary redraws
    if (newW === this.prevW && newH === this.prevH) return;

    // Update cached dimensions
    this.w = newW;
    this.h = newH;
    this.prevW = newW;
    this.prevH = newH;

    // Update gradient height
    this.gradient?.setAttribute("y2", this.h);

    // Only redraw if not triggered on scroll-end or already drawn
    if (!this.hasAttribute("on-scroll-end") || this.hasDrawn) {
      this.draw();
    }
  }

  draw() {
    // Remove previous group if exists
    this.currentGroup?.remove();

    // Early return if no valid dimensions
    if (!this.w || !this.h) return;

    // Initialize noise and create new group
    const simplex = createNoise2D();
    this.currentGroup = document.createElementNS(svgNs, "g");
    this.currentGroup.setAttribute("fill", "none");

    // Determine compact mode
    const isCompact = this.hasAttribute("compact");

    // Noise and line parameters for normal and compact mode
    const xZoom = isCompact
      ? Math.random() * 80 + 80
      : Math.random() * 200 + 200;
    const yZoom = isCompact
      ? Math.random() * 120 + 80
      : Math.random() * 400 + 300;
    const deltaY = isCompact ? Math.random() * 4 + 3 : Math.random() * 8 + 6;

    // Calculate line count and generate lines directly
    const count = Math.floor(this.h / deltaY);
    const lines = [];

    for (let i = 0, y = 0; y < this.h; y += deltaY, i++) {
      const amplitude = isCompact
        ? 3 + 12 * Math.sin((Math.PI * i) / count)
        : 10 + 50 * Math.sin((Math.PI * i) / count);
      const line = new NoiseLine(
        0,
        y,
        this.w,
        amplitude,
        simplex,
        xZoom,
        yZoom
      );
      lines.push(line);
    }

    // Draw all lines with animation delays
    lines.forEach((line, index) => {
      line.draw(this.currentGroup, index * 0.01);
    });

    this.svg.appendChild(this.currentGroup);
  }
}

customElements.define("noise-lines", NoiseLines);
