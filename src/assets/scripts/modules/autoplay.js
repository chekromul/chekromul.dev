const videoAnchors = document.querySelectorAll('.js-video-anchor');

function playVideo(video) {
  video.play();
  if(window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery || mediaQuery.matches) {
      video.pause();
      video.currentTime = 5;
    }
  }
}

function stopVideo(video) {
  video.pause();
  video.currentTime = 0;
}

videoAnchors.forEach(anchor => {
  const video = anchor.nextElementSibling.querySelector('video');

  anchor.addEventListener('mouseover', (e) => playVideo(video), false);
  anchor.addEventListener('mouseout', (e) => stopVideo(video), false);
  anchor.addEventListener('focusin', (e) => playVideo(video), false);
  anchor.addEventListener('focusout', (e) => stopVideo(video), false);
})
