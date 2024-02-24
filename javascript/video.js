const enzyVideo = document.querySelector('.enzy-video'),
      videoToggleBtn = document.querySelector('.video-toggle-btn'),
      playIconWrapper = document.querySelector('.play-icon-wrapper'),
      pauseIconWrapper = document.querySelector('.pause-icon-wrapper');

const toggleVideoPlayState = () => {
  
  if (enzyVideo.paused || enzyVideo.ended) {
    enzyVideo.play();
    videoToggleBtn.style.opacity = "0";
    playIconWrapper.style.display = "none";
    pauseIconWrapper.style.display = "flex";
  } else {
    enzyVideo.pause();
    videoToggleBtn.style.opacity = "1";
    playIconWrapper.style.display = "flex";
    pauseIconWrapper.style.display = "none";
  }
}

enzyVideo.addEventListener('click', toggleVideoPlayState);
videoToggleBtn.addEventListener('click', toggleVideoPlayState);

enzyVideo.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    toggleVideoPlayState();
  }
});
