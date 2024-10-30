import { menuToggle } from './menu.js';
import { throttle, debounce, responsiveText } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const refs = {
    preloader: document.querySelector('.preloader'),
    scrollLinks: document.querySelectorAll('.scrollto'),
    header: document.querySelector('.header'),
    responsiveTexts: document.querySelectorAll('[data-responsivetext]'),
    dirolSliders: document.querySelectorAll('.dirol-slider'),
    history: document.querySelector('.history'),
  };

  //RESPONSIVE TEXT
  const initResponsiveTexts = () => {
    if (!refs.responsiveTexts) return;

    refs.responsiveTexts.forEach(text => {
      responsiveText(text);
    });
  };

  window.addEventListener(
    'resize',
    debounce(() => {
      initResponsiveTexts();
    }, 200)
  );

  // SCROLL TO BLOCK
  refs.scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.innerWidth < 1024) {
        if (document.querySelector('[data-js="menu-backdrop"]').classList.contains('is-open')) {
          menuToggle();
        }
      }
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const distance = rect.top + window.scrollY;

        window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
        setTimeout(() => {
          history.pushState(null, null, targetId);
        }, 500);
      } else {
        window.location.href = `./${targetId}`;
      }
    });
  });

  //SLIDERS

  let sliders = [];

  function initSliders() {
    const sliderElements = document.querySelectorAll('[data-js="product-slider"]');

    sliderElements.forEach((slider, index) => {
      if (window.innerWidth <= 767) {
        if (!sliders[index]) {
          sliders[index] = new Swiper(slider, {
            allowTouchMove: true,
            slidesPerView: 'auto',
            spaceBetween: 150,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });
        }
      } else {
        if (sliders[index]) {
          sliders[index].destroy(true, true);
          sliders[index] = null;
        }
      }
    });
  }

  if (refs.dirolSliders.length > 0) {
    refs.dirolSliders.forEach((slider, index) => {
      sliders[index] = new Swiper(slider, {
        centeredSlides: true,
        allowTouchMove: true,
        slidesPerView: 'auto',
        spaceBetween: 80,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
          slideChange: function () {
            const activeSlide = this.slides[this.activeIndex];
            const category = activeSlide.getAttribute('data-category');
            if (category) {
              const categoryNameElement = document.querySelector('.category-name');
              categoryNameElement.textContent = category;
            }
          },
        },
      });
    });
  }

  if (refs.history) {
    const historySlider = new Swiper(refs.history, {
      centeredSlides: true,
      allowTouchMove: true,
      slidesPerView: 'auto',
      spaceBetween: 80,
      mousewheel: {
        releaseOnEdges: true,
      },
      initialSlide: window.innerWidth >= 1280 ? 1 : 0,
    });
  }

  //HIDE PRELOADER
  const hidePreloader = () => {
    if (refs.preloader) {
      refs.preloader.classList.add('hidden');
      setTimeout(() => {
        refs.preloader.remove();
      }, 600);
    }
  };

  // FIX HEADER
  const fixHeader = () => {
    if (window.scrollY > 0 && !refs.header.classList.contains('fix')) {
      refs.header.classList.add('fix');
    }
  };

  document.addEventListener('scroll', throttle(fixHeader, 600));
  document.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      refs.header.classList.remove('fix');
    }
  });

  window.addEventListener('load', () => {
    hidePreloader();
    fixHeader();
    initResponsiveTexts();
    initSliders();
  });

  window.addEventListener('resize', initSliders);
});
