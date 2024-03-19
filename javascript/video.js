let mqTouch = window.matchMedia("(hover: none) and (pointer: coarse)");

const enzyVideo = document.querySelector(".enzy-video"),
  videoToggleBtn = document.querySelector(".video-toggle-btn"),
  playIconWrapper = document.querySelector(".play-icon-wrapper"),
  pauseIconWrapper = document.querySelector(".pause-icon-wrapper");

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
};

enzyVideo.addEventListener("click", toggleVideoPlayState);
videoToggleBtn.addEventListener("click", toggleVideoPlayState);

enzyVideo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    toggleVideoPlayState();
  }
});

// Remove on touch screen devices
if (mqTouch.matches) {
  videoToggleBtn.addEventListener("click", () => {
    videoToggleBtn.style.display = "none";
  });
}

// Pause video when scrolling out of view
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        enzyVideo.pause();
        videoToggleBtn.style.opacity = "1";
        playIconWrapper.style.display = "flex";
        pauseIconWrapper.style.display = "none";
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the video is out of view
  }
);

observer.observe(enzyVideo);
