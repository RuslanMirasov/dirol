const lazyImages = document.querySelectorAll('img[data-src]');

function isInViewport(img) {
  const rect = img.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function lazyLoadImages() {
  lazyImages.forEach(img => {
    if (isInViewport(img) && img.dataset.src) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-lazy');
      img.removeAttribute('data-src');
      img.style.opacity = '1';
    }
  });
}

lazyLoadImages();

window.addEventListener('scroll', lazyLoadImages);
window.addEventListener('resize', lazyLoadImages);
