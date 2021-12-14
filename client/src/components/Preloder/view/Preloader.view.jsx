import React from "react";
import cn from "classnames";
import s from "./Preloder.module.scss";
import { CSSTransition } from "react-transition-group";

export const PreloaderView = ({active}) => {
  return (
    <CSSTransition
      in={active}
      timeout={400}
      classNames={{
        enterActive: s["preloader-show"],
        exitActive: s["preloader-hide"],
      }}
      mountOnEnter
      unmountOnExit
    >
    <div className={cn(s["preloader-layer"], s["white"])}>
      <div className={cn(s["preloader-container"])}>
        <div className={cn(s["lds-dual-ring"])}></div>
      </div>
    </div>
    </CSSTransition>

  );
}