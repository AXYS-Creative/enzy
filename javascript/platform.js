const maxLg = window.matchMedia("(max-width: 1024px)");

// Platform Variables
const deviceShowcase = document.querySelector(".device-showcase");
const deviceImagesMobile = document.querySelectorAll(".device-img-mobile");

const handleMediaQueryChange = (mediaQuery) => {
  if (mediaQuery.matches) {
    deviceShowcase.setAttribute("aria-hidden", "true");
    deviceImagesMobile.forEach((el) => el.setAttribute("aria-hidden", "false"));
  } else {
    deviceShowcase.setAttribute("aria-hidden", "false");
    deviceImagesMobile.forEach((el) => el.setAttribute("aria-hidden", "true"));
  }
};

maxLg.addEventListener("change", handleMediaQueryChange);

handleMediaQueryChange(maxLg);
