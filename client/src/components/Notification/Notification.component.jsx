import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLICK_DELAY } from "../../constants";
import { clearNotificationMessageAction } from "../../modules/notification/store/actions";
import { NotificationPlate } from "./NotificationPlate/NotificationView.component";

export const Notification = () => {

  const dispatch = useDispatch();

  // const [state, setState] = useState(null);

  const messages = useSelector(state => state.notification.messages);
  // console.log("messages: ", messages)

  // useEffect(() => {
  //   setState(authError)
  // }, [authError])

  const clearNotification = message => {
    dispatch(clearNotificationMessageAction(message));
  }

  return (
    <>
      <div className="notification-container">
        {
          messages &&
          messages.length > 0 &&
          messages.map((item, index) => (
            <NotificationPlate
              key={`${index}: ${item.message}`}
              message={item.message}
              active={item.active}
              delay={index*CLICK_DELAY}
              type={item.notificationType}
              clearNotification={clearNotification}
            />
          ))
        }
      </div>
    </>
  );
}