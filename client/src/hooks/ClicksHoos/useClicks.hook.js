import { useState } from "react";
import { CLICK_DELAY, CLICK_DURATION } from "../../constants";

export const useClicks = data => {
  const {
    shortClickCallback = null,
    doubleClickCallback = null,
    longClickCallback = null,
    touchCallback = null,
  } = data;

  const [clickStartTime, setClickStartTime] = useState(null);

  const [clickEndTime, setClickEndTime] = useState(null);

  const [timer, setTimer] = useState(null);

  const clear = () => {
    setClickStartTime(null);
    setClickEndTime(null);
  }

  const makeMove = () => {
    if (!clickStartTime) {
      return;
    }
    const endTime = new Date().getTime();
    setClickEndTime(endTime);

    const difference = Math.abs(clickStartTime - endTime);
    if (difference > CLICK_DURATION && difference < CLICK_DURATION * 2) {
      longClickCallback && longClickCallback();
      clear();
    } else if (difference > CLICK_DURATION * 2) { // touch or dragging
      touchCallback && touchCallback();
      clear();
    } else {
      if (!timer || (timer > CLICK_DELAY)) {
        const tmr = setTimeout(() => {
          shortClickCallback && shortClickCallback();
          clearTimeout(tmr);
          setTimer(null);
          clear();
        }, CLICK_DELAY);
        setTimer(tmr);
      } else {
        doubleClickCallback && doubleClickCallback();
        clearTimeout(timer);
        setTimer(null);
        clear();
      }
    }
  }

  return {
    setValueClickStartTime: () => setClickStartTime(new Date().getTime()),
    setNullClickStartTime: () => setClickStartTime(null),
    setClickEndTime: () => setClickEndTime(new Date().getTime()),
    makeMove: () => makeMove(),
  }
}