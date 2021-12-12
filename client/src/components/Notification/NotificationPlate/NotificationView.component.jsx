import React from "react";
import { CSSTransition } from "react-transition-group";
import { NOTIFICATION_ERROR, NOTIFICATION_INFO, NOTIFICATION_WARNING } from "../../../constants";

export const NotificationPlate = ({ message, delay, active, type, clearNotification }) => {

  const setType = type => {
    switch (type) {
      case NOTIFICATION_ERROR:
        return "error"
      case NOTIFICATION_INFO:
        return "info"
      case NOTIFICATION_WARNING:
        return "warning"
      default:
        return "success"
    }
  }

  return (
    <CSSTransition
      in={active}
      timeout={400}
      classNames={{
        enterActive: "show",
        exitActive: "hide",
      }}
      mountOnEnter
      unmountOnExit
      onExiting={() => console.log("onExiting")}
      onExited={() => {
        console.log("onExited")
        clearNotification(message)
      }}
    >
      <div className={`notification simple-text_main show ${setType(type)}`}>
          {message}
      </div>
    </CSSTransition>
  );
}