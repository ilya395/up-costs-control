import React, { useEffect } from "react";
import { useState } from "react";
import { PreloaderView } from "../view/Preloader.view";

export const PreloaderContainer = () => {
  const [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActive(!active);
    }, 3000);
  }, [])
  return (
    <PreloaderView
      active={active}
    />
  );
}