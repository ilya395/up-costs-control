import React from "react";
import cn from "classnames";
import s from "./Preloder.module.scss";
import { CSSTransition } from "react-transition-group";
import { LOADING_APP } from "../../../constants";

export const PreloaderView = ({status}) => {
  return (
    <CSSTransition
      in={status.active}
      timeout={400}
      classNames={{
        enterActive: s["preloader-show"],
        exitActive: s["preloader-hide"],
      }}
      mountOnEnter
      unmountOnExit
    >
    <div className={cn(s["preloader-layer"], { [s["white"]]: status.mode === LOADING_APP ? true : false })}>
      <div className={cn(s["preloader-container"])}>
        <div className={cn(s["lds-dual-ring"])}></div>
      </div>
    </div>
    </CSSTransition>
  );
}