import React from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { NOTIFICATION_ERROR, NOTIFICATION_INFO, NOTIFICATION_WARNING } from "../../../constants";

export const NotificationPlate = ({ message, delay, active, type, clearNotification }) => {

  const [localDelay, setLocalDelay] = useState(delay);

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
      timeout={400 + localDelay }
      classNames={{
        enterActive: "show",
        enterDone: "showed",
        exitActive: "hide",
        exitDone: "hided"
      }}
      mountOnEnter
      unmountOnExit
      onExited={() => clearNotification(message)}
    >
      <div className={`notification simple-text_main show ${setType(type)}`} style={{animationDelay: `${localDelay}ms`}}>
          {message}
      </div>
    </CSSTransition>
  );
}