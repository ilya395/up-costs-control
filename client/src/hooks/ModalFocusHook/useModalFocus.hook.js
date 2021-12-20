import { useState } from "react";
import { inMobile } from "../../utils";

export const useModalFocus = (initialValue = false) => {
  const [focusing, setFocusing] = useState(initialValue);

  return {
    uiFocusing: focusing,
    setUiFocusing: arg => {
      // проверка мобильного устройства и ширины экрана
      inMobile() && setFocusing(arg);
    }
  }
}