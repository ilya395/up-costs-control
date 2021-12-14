import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CostFormView } from "..";
import { CLICK_DELAY, NOTIFICATION_WARNING } from "../../../constants";
import { addCostsAction, modalClearAction, modalCloseAction, notificationMessageAction } from "../../../modules";
import { cheekiBreekiValidator, throttle } from "../../../utils";


export const CostFormContainer = props => {
  console.log("CostFormContainer")

  const { allProps } = props;

  const [localThrottle, setLocalthrottle] = useState(false);

  useEffect(() => {
    if (localThrottle) {
      setTimeout(() => {
        setLocalthrottle();
      }, CLICK_DELAY);
    }
  }, [localThrottle]);

  const costsAddAwait = useSelector(state => state.costsAdd.await);

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(modalCloseAction());
    dispatch(modalClearAction());
  }

  const validateCost = ({ amount, description }) => {

    let result = true;
    if (!cheekiBreekiValidator.checkNumber(+amount)) {
      console.log("validateCost")
      dispatch(notificationMessageAction({
        message: "Корректно заполните поле стоимости!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    return result;
  }

  const saveHandler = data => {
    if (!validateCost(data)) {
      return;
    }
    dispatch(addCostsAction(data));
  }

  const onThrottleSave = throttle(saveHandler, 5000);

  const onSave = data => {
    onThrottleSave(data);
  }



  return (
    <CostFormView
      props={{...allProps}}
      onCancel={onCancel}
      onSave={onSave}
      disabled={costsAddAwait || localThrottle}
    />
  );
}