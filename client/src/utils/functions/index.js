import { CLICK_DELAY } from "../../constants";

export const strangeNumber = (type, str) => {
  let string = str;
  if (type === "tel" && string) {
    if (string[0] === "8") {
      string = string.replace("8", "+7");
    }
    if (string.indexOf(" ") !== -1) {
      while (string.indexOf(" ") !== -1) {
        string = string.replace(" ", "");
      }
    }
    if (string.indexOf("-") !== -1) {
      while (string.indexOf("-") !== -1) {
        string = string.replace("-", "");
      }
    }
    return string;
  }
  return string;
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

export function inMobile() {
  if (
    // /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
    (window.matchMedia("(max-width:767px)").matches)
  ) {
    // код для мобильных устройств
    return true;
  }
  return false;
}