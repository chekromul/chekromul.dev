// based on Max Böck's theme switcher — mxb.dev/blog/color-theme-switcher/

const SELECTORS = {
  picker: '.js-themepicker',
  toggleBtn: '.js-themepicker-toggle',
  themeSelectBtn: '.js-themepicker-select'
}
const CLASSES = {
  open: 'themepicker--open',
}
const THEME_STORAGE_KEY = 'theme'

function setMetaTheme() {
  const metaTag = document.querySelector('meta[name="theme-color"]');
  let color = getComputedStyle(document.documentElement).getPropertyValue('--color-bg');
  metaTag.setAttribute('content', `rgb(${color})`);
}

class ThemePicker {
  constructor() {
    this.isOpen = false;
    this.activeTheme = 'default';
    this.hasLocalStorage = typeof Storage !== 'undefined';

    this.picker = document.querySelector(SELECTORS.picker);
    this.toggleBtn = document.querySelector(SELECTORS.toggleBtn);
    this.themeSelectBtns = Array.from(document.querySelectorAll(SELECTORS.themeSelectBtn));

    this.init();
  }

  init() {
    const systemPreference = this.getSystemPreference();
    const storedPreference = this.getStoredPreference();

    if (storedPreference) {
      this.activeTheme = storedPreference;
    } else if (systemPreference) {
      this.activeTheme = systemPreference;
    }

    this.setActiveItem();
    this.bindEvents();
    setMetaTheme();
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.togglePicker());

    this.themeSelectBtns.forEach((btn) => {
      const id = btn.dataset.theme;
      if (id) {
        btn.querySelector('input').addEventListener('change', () => this.setTheme(id));
      }
    })
  }

  getSystemPreference() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return false;
  }

  getStoredPreference() {
    if (this.hasLocalStorage) {
      return localStorage.getItem(THEME_STORAGE_KEY);
    }
    return false;
  }

  setActiveItem() {
    this.themeSelectBtns.forEach((btn) => {
      btn.querySelector('input').removeAttribute('checked');

      if (btn.dataset.theme === this.activeTheme) {
        btn.querySelector('input').setAttribute('checked', true);
      }
    })

    setMetaTheme();
  }

  setTheme(id) {
    this.activeTheme = id;
    document.documentElement.setAttribute('data-theme', id);

    if (this.hasLocalStorage) {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    }

    this.setActiveItem();
  }

  togglePicker(force) {
    this.isOpen = typeof force === 'boolean' ? force : !this.isOpen;
    this.toggleBtn.setAttribute('aria-expanded', String(this.isOpen));

    if (this.isOpen) {
      this.picker.removeAttribute('hidden');
      window.setTimeout(() => {
        this.picker.classList.add(CLASSES.open)
      }, 20);
    } else {
      const transitionHandler = () => {
        this.picker.removeEventListener('transitionend', transitionHandler);
        this.picker.setAttribute('hidden', true);
      }
      this.picker.addEventListener('transitionend', transitionHandler);
      this.picker.classList.remove(CLASSES.open);
    }
  }
}

new ThemePicker();
