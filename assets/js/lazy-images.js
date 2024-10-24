const lazyImages = document.querySelectorAll('img[data-src]');

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
}

function isInViewport(el, gap) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight + gap && rect.bottom >= -gap;
}

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
