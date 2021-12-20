import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOTIFICATION_WARNING } from "../../../constants";
import { ModalContext } from "../../../context";
import { modalClearAction, modalCloseAction, notificationMessageAction } from "../../../modules";
import { addExpenseItemAction, changeExpenseItemAction } from "../../../modules/costs";
import { cheekiBreekiValidator } from "../../../utils";
import { ExpenseItemFormView } from "../view/ExpenseItemForm.view";

export const ExpenseItemFormContainer = props => {

  const { allProps } = props;

  const refName = useRef(null);

  const expenseItemsAddAwait = useSelector(state => state.expenseItemsAdd.await);

  const expenseItemsChangeAwait = useSelector(state => state.expenseItemsChange.await);

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(modalCloseAction());
    dispatch(modalClearAction());
  }

  const compareName = (newData, oldDate) => {
    if ((newData.name === oldDate.name) && (newData.color === oldDate.color)) {
      return true;
    }
    return false;
  }

  const onChange = data => {
    if (!validateExpenseItem(data)) {
      return;
    }
    if (compareName(data, allProps)) {
      dispatch(notificationMessageAction({
        message: "Данные не изменились!",
        notificationType: NOTIFICATION_WARNING
      }));
      return;
    }
    dispatch(changeExpenseItemAction(data));
  }

  const onAdd = data => {
    if (!validateExpenseItem(data)) {
      return;
    }
    dispatch(addExpenseItemAction(data));
  }

  const validateExpenseItem = ({name, color}) => {
    let result = true;
    if (!cheekiBreekiValidator.checkName(name)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните поле названия!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    if (!cheekiBreekiValidator.checkName(color)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните поле цвета!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    return result;
  }

  const modalContext = useContext(ModalContext);

  const focusHandler = (arg) => {
    modalContext.setUiFocusing(arg);
  }

  return (
    <>
      <ExpenseItemFormView
        data={{...allProps}}
        onCancel={onCancel}
        onChange={onChange}
        onAdd={onAdd}
        disabled={expenseItemsAddAwait || expenseItemsChangeAwait}
        refName={refName}
        focusHandler={focusHandler}
      />
    </>
  );
}
