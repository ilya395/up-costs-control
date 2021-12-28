import { useEffect, useState } from "react";

export const useScrollController = (arg = true) => {
  const [scroll, setScroll] = useState(arg);

  const scrollHandler = (event) => {
    !scroll &&
    event.preventDefault();
  }

  const changeScroll = argument => setScroll(argument);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return {
    scroll,
    setScroll: changeScroll,
  }
}