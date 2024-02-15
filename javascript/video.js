const enzyVideo = document.querySelector('.enzy-video'),
 videoToggleBtn = document.querySelector('.video-toggle-btn'),
 playIconWrapper = document.querySelector('.play-icon-wrapper'),
 pauseIconWrapper = document.querySelector('.pause-icon-wrapper');

videoToggleBtn.addEventListener('click', () => {
  console.log('clicked video button')

  if (enzyVideo.paused || enzyVideo.ended) {
    enzyVideo.play();
    playIconWrapper.style.display = "none";
    pauseIconWrapper.style.display = "flex";
  } else {
    enzyVideo.pause();
    playIconWrapper.style.display = "flex";
    pauseIconWrapper.style.display = "none";
  }
});