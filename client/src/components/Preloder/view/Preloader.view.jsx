import React from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import { LOADING_APP } from "../../../constants";

export const PreloaderView = ({status}) => {
  return (
    <CSSTransition
      in={status.active}
      timeout={400}
      classNames={{
        enterActive: "preloader-show",
        exitActive: "preloader-hide",
      }}
      mountOnEnter
      unmountOnExit
    >
    <div className={cn("preloader-layer", { "white": status.mode === LOADING_APP ? true : false })}>
      <div className={"preloader-container"}>
        <div className={"lds-dual-ring"}></div>
      </div>
    </div>
    </CSSTransition>
  );
}