let pageLoaded = false;
let timerDone = false;
document.body.style = "overflow: hidden;";

const attemptCompleteLoading = () => {
  if (pageLoaded && timerDone) {
    const loadingScreen = document.querySelector(".loading-screen");
    const hero = document.querySelector("#hero-section");

    if (loadingScreen) {
      loadingScreen.classList.add("load-complete");
      loadingScreen.setAttribute("aria-hidden", "true");
      hero.classList.add("load-complete");
      document.body.style = "overflow: auto;";
    }
  }
};

window.addEventListener("load", () => {
  pageLoaded = true;
  attemptCompleteLoading();
});

setTimeout(() => {
  timerDone = true;
  attemptCompleteLoading();
}, 2000);
