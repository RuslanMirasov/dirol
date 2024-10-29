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

// Функция debounce
export const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const isInViewport = (el, gap) => {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight + gap && rect.bottom >= -gap;
};

export const responsiveText = text => {
  if (!text) return;

  const parentElement = text.parentElement;
  if (!parentElement) return;

  const parentWidth = parentElement.getBoundingClientRect().width;
  const fontSizes = text.dataset.size.split('|');

  let defaultFontSize;

  switch (true) {
    case window.innerWidth <= 767:
      defaultFontSize = fontSizes[2];
      break;
    case window.innerWidth <= 1023:
      defaultFontSize = fontSizes[1];
      break;
    default:
      defaultFontSize = fontSizes[0];
      break;
  }

  let currentFontSize = parseFloat(defaultFontSize);
  text.style.fontSize = `${currentFontSize}px`;

  while (text.scrollWidth > parentWidth && currentFontSize > 0) {
    currentFontSize -= 1;
    text.style.fontSize = `${currentFontSize}px`;
  }
};
