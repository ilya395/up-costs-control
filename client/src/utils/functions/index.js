import { CLICK_DELAY } from "../../constants";

export const strangeNumber = (type, str) => {
  if (type === "tel" && str && str[0] === "8") {
    return str.replace("8", "+7");
  }
  return str;
}

export function debounce(callback, delay = CLICK_DELAY) {
  let timer = null;

  return () => {
    const fn = () => {
      timer = null;
      callback();
    };

    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  }
}

export function throttle(callback, delay = CLICK_DELAY) {
  let trottle = false;


  function wrapper() {
    if (trottle) {
      return;
    }
    trottle = true;
    callback.apply(this, arguments);

    setTimeout(function() {
      trottle = false;
    }, delay);
  }

  return wrapper;
}