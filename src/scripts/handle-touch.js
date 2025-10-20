export function initHandleTouch() {
  const elements = document.querySelectorAll(".js-handle-touch");
  if (!elements.length) return;

  elements.forEach(el => {
    el.addEventListener("touchstart", (event) => {
      el.classList.add("touched");
      event.stopPropagation();
    });

    el.addEventListener("touchend", () => {
      setTimeout(() => el.classList.remove("touched"), 150);
    });
  });

  document.addEventListener("touchstart", (event) => {
    elements.forEach(el => {
      if (!el.contains(event.target)) {
        el.classList.remove("touched");
      }
    });
  });
}
