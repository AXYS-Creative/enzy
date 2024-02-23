let minMd = window.matchMedia("(min-width: 768px)");
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

const allDeviceText = document.querySelectorAll('.device-text');

// Video Section Defaults
const vidTextOffsetTop = vidText.offsetTop;
const vidTextHeight = vidText.offsetHeight;

// Header Defaults
menuBtn.setAttribute("tabindex", "-1");

// Platform Section Defaults
allDeviceText.forEach(textblock => textblock.setAttribute("aria-hidden", "true"))

// Scroll Animations

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
};

window.addEventListener("scroll", throttle(checkScroll, 100)); // Throttle checkScroll, adjust 100ms as needed

// Platform Intersection Observer

const platformDeviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const targetId = entry.target.dataset.id;
    const deviceClass = `device-${targetId}`;
    const deviceTextSelector = `.device-text-${targetId}`;
    const deviceTextElement = document.querySelector(deviceTextSelector);

    if (entry.isIntersecting) {
      platformHeadline.classList.add(deviceClass);
      deviceTextElement.setAttribute('aria-hidden', 'false');
    } else {
      platformHeadline.classList.remove(deviceClass);
      if (!platformHeadline.classList.contains(deviceClass)) {
        deviceTextElement.setAttribute('aria-hidden', 'true');
      }
    }
  });
}, {
  root: null, // Viewport
  rootMargin: '0px',
  threshold: window.innerHeight < 580 ? 0.1 : 0.5
});

document.querySelectorAll('.device-img').forEach((img, index) => {
  img.setAttribute('data-id', index + 1);
  platformDeviceObserver.observe(img);
});

// Platform Section Scroll Snap
let allowScrollSnap = true;

const platformScrollSnap = () => {
  const deviceImg = document.querySelectorAll('.device-img');
  
  const scrollSnapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && allowScrollSnap) {
        entry.target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  });
  
  deviceImg.forEach(image => {
    scrollSnapObserver.observe(image);
  });
};

// Toggle scroll snap when clicking page links
const handleSmoothScroll = (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (target) {
    allowScrollSnap = false;
    setTimeout(() => { allowScrollSnap = true; }, 1000);
  }
};

const watchQueryMd = (e) => {
  if (e.matches) {
    document.addEventListener('click', handleSmoothScroll);
    window.addEventListener("scroll", throttle(platformScrollSnap, 500));
  }
}

minMd.addEventListener('change', watchQueryMd);

watchQueryMd(minMd);