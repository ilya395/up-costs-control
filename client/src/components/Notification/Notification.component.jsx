import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { CLICK_DELAY } from "../../constants";
import { clearNotificationMessageAction } from "../../modules/notification/store/actions";
import { NotificationPlate } from "./NotificationPlate/NotificationView.component";

export const Notification = () => {
  console.log("Notification")
  const dispatch = useDispatch();

  const messages = useSelector(state => state.notification.messages);

  const clearNotification = useCallback(message => { // передаем потомку не новую ссылку на функцию, а одну и туже моммоизацию этой ссылки, и в потомке не создается отдельного метода для обработки ф-ии, а используется анонимная ф-ия
    dispatch(clearNotificationMessageAction(message));
  }, []);

  return (
    <>
      {/* <div className="notification-container"> */}
        <TransitionGroup className="notification-container">
          {
            messages &&
            messages.length > 0 &&
            messages.map((item, index) => (
              <NotificationPlate
                key={
                  // `${index}: ${item.message}`
                  item.message
                }
                message={item.message}
                active={item.active}
                delay={index*CLICK_DELAY/2}
                type={item.notificationType}
                clearNotification={clearNotification}
              />
            ))
          }
        </TransitionGroup>

      {/* </div> */}
    </>
  );
}