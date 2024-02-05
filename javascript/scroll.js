const toggleClassOnScroll = () => {
  const siteHeader = document.querySelector(".site-header");
  const headerCtaWrapper = document.querySelector(".header-cta-wrapper");

  const checkScroll = () => {
    if (window.scrollY >= 96) {
      siteHeader.classList.add("scroll-active");
      headerCtaWrapper.setAttribute("aria-hidden", "true");
    } else {
      siteHeader.classList.remove("scroll-active");
      headerCtaWrapper.removeAttribute("aria-hidden");
    }
  };

  window.addEventListener("scroll", checkScroll);
};

toggleClassOnScroll();
