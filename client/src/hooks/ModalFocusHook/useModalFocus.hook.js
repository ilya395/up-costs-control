import { useState } from "react";

export const useModalFocus = (initialValue = false) => {
  const [focusing, setFocusing] = useState(initialValue);

  const inMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
      (window.matchMedia("(max-width:767px)").matches)
    ) {
      // код для мобильных устройств
      console.log("mob")
      return true;
    }
    return false;
  }

  return {
    uiFocusing: focusing,
    setUiFocusing: arg => {
      // проверка мобильного устройства и ширины экрана
      inMobile() && setFocusing(arg);
    }
  }
}