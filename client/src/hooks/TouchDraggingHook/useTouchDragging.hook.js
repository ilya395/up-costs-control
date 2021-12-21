import { useState } from "react";

export const useTouchDragging = (data) => {
  const { touchStart, touchMove, touchEnd } = data;

  const [clickStartTime, setClickStartTime] = useState(null);

  const [clickEndTime, setClickEndTime] = useState(null);

  return {
    setClickStartTime,
    setClickEndTime,
    status: () => {},

  }
}