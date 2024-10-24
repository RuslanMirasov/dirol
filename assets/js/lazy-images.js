import { throttle, isInViewport } from './utils.js';

const lazyImages = document.querySelectorAll('img[data-src]');

function lazyLoadImages() {
  lazyImages.forEach(img => {
    if (isInViewport(img, 200) && img.dataset.src) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.style.opacity = '1';
    }
  });
}

lazyLoadImages();

window.addEventListener('scroll', throttle(lazyLoadImages, 200));
window.addEventListener('resize', throttle(lazyLoadImages, 200));
