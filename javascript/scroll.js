// let mqMinlg = window.matchMedia("(min-width: 1024px)");
// let mqMaxSm = window.matchMedia("(max-width: 480px)");
// let mqMouse = window.matchMedia("(hover: hover)");

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const siteHeader = document.querySelector(".site-header"),
  navMenu = document.querySelector(".nav-menu"),
  headerCtaWrapper = document.querySelector(".header-cta-wrapper"),
  menuBtnWrapper = document.querySelector(".menu-btn-wrapper"),
  menuBtn = document.querySelector(".menu-btn"),
  headerCta1 = headerCtaWrapper.querySelector(".cta-1"),
  headerCta2 = headerCtaWrapper.querySelector(".cta-2"),
  vidText = document.querySelector('.video-paragraph'),
  platformHeadline = document.querySelector('.platform-headline');

const vidTextOffsetTop = vidText.offsetTop;
const vidTextHeight = vidText.offsetHeight;

menuBtn.setAttribute("tabindex", "-1");

const checkScroll = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  // Header/Nav scroll logic
  const isNavOpen = navMenu.classList.contains("menu-active");

  if (scrollPosition >= 24) {
    siteHeader.classList.add("scroll-active");
    headerCtaWrapper.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-hidden", "false");
    menuBtn.removeAttribute("tabindex");
    headerCta1.setAttribute("tabindex", "-1");
    headerCta2.setAttribute("tabindex", "-1");
  } else {
    siteHeader.classList.remove("scroll-active");
    headerCtaWrapper.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("tabindex", "-1");
    headerCta1.removeAttribute("tabindex");
    headerCta2.removeAttribute("tabindex");
  }

  if (scrollPosition < 24 && isNavOpen) {
    menuBtnWrapper.classList.add('menu-wrapper-page-top');
  } else {
    menuBtnWrapper.classList.remove('menu-wrapper-page-top');
  }

  // Video Section scroll logic
  const isVidTextVisible = (scrollPosition + windowHeight) > vidTextOffsetTop && scrollPosition < (vidTextOffsetTop + vidTextHeight);

  if (isVidTextVisible) {
    // let scrollProgress = (scrollPosition + windowHeight - vidTextOffsetTop) / (vidTextHeight + windowHeight);
    let scrollProgress = (scrollPosition + windowHeight - vidTextOffsetTop - 56) / (vidTextHeight + (windowHeight / 16)); // Tweak the start and end of the animation
    scrollProgress = Math.min(scrollProgress, 1);
    const backgroundSize = (scrollProgress * 100) + '% 100%';
    vidText.style.backgroundSize = backgroundSize;
  }

  // Platform logic
  function checkDeviceVisibility(deviceClass, multiplier, addClass) {
    const device = document.querySelector(deviceClass);
    const deviceTop = device.getBoundingClientRect().top;
    const deviceBottom = device.getBoundingClientRect().bottom;
    const deviceVisible = (deviceTop * multiplier) < window.innerHeight && deviceBottom > 0;
  
    if (deviceVisible) {
      console.log('device is visible');
      platformHeadline.classList.add(addClass);
    } else {
      platformHeadline.classList.remove(addClass);
    }
  }
  
  checkDeviceVisibility('.device-img-1', 3, 'device-1');
  checkDeviceVisibility('.device-img-2', 4, 'device-2');
  checkDeviceVisibility('.device-img-3', 4, 'device-3');
  checkDeviceVisibility('.device-img-4', 4, 'device-4');
  checkDeviceVisibility('.device-img-5', 4, 'device-5');
};

window.addEventListener("scroll", throttle(checkScroll, 100)); // Throttle checkScroll, adjust 100ms as needed

