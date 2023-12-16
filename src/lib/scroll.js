export const scrollToEl = (selector = false) => {
  let el;
  if (!selector && !window.location.hash) {
    return;
  }

  if (!selector) {
    const hash = window.location.hash;
    el = document.querySelector(hash);
  } else {
    el = document.querySelector(selector);
  }

  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth' });
};
