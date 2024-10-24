export const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
};

export const isInViewport = (el, gap) => {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight + gap && rect.bottom >= -gap;
};
