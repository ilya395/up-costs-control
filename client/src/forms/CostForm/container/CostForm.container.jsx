import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CostFormView } from "../view/CostForm.view";
import { CLICK_DELAY, MODAL_ADD_COST, NOTIFICATION_WARNING } from "../../../constants";
import { addCostsAction, addCostsAwaitSelector, editCostAction, modalClearAction, modalCloseAction, notificationMessageAction } from "../../../modules";
import { cheekiBreekiValidator, throttle } from "../../../utils";

export const CostFormContainer = props => {

  const { allProps } = props;

  const { mode, ...rest } = allProps;

  const [localThrottle, setLocalthrottle] = useState(false);

  useEffect(() => {
    if (localThrottle) {
      setTimeout(() => {
        setLocalthrottle();
      }, CLICK_DELAY);
    }
  }, [localThrottle]);

  const costsAddAwait = useSelector(addCostsAwaitSelector);

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(modalCloseAction());
    dispatch(modalClearAction());
  }

  const validateCost = ({ amount, description }) => {

    let result = true;

    if (!cheekiBreekiValidator.checkNumber(+amount)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните поле стоимости!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }

    if (description && !cheekiBreekiValidator.checkText(description)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните поле описания!",
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
    mode === MODAL_ADD_COST ?
      dispatch(addCostsAction(data)) :
      dispatch(editCostAction(data));
  }

  const onThrottleSave = throttle(saveHandler, 5000);

  const onSave = data => onThrottleSave(data);

  return (
    <CostFormView
      props={{...allProps}}
      onCancel={onCancel}
      onSave={onSave}
      disabled={costsAddAwait || localThrottle}
    />
  );
}