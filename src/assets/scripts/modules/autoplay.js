const videoAnchor = document.querySelector('.js-video-anchor');
const video = document.querySelector('.js-video');

const playVideo = function(event) {
  video.play();
  if(window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery || mediaQuery.matches) {
      video.pause();
      video.currentTime = 5;
    }
  }
};

const stopVideo = function(event) {
  video.pause();
  video.currentTime = 0;
};

videoAnchor.addEventListener('mouseover', playVideo, false);
videoAnchor.addEventListener('mouseout', stopVideo, false);
videoAnchor.addEventListener('focusin', playVideo, false);
videoAnchor.addEventListener('focusout', stopVideo, false);
