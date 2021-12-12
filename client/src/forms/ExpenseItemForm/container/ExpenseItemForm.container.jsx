import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalClearAction, modalCloseAction } from "../../../modules";
import { addExpenseItemAction, changeExpenseItemAction } from "../../../modules/costs";
import { cheekiBreekiValidator } from "../../../utils";
import { ExpenseItemFormView } from "../view/ExpenseItemForm.view";

export const ExpenseItemFormContainer = props => {

  const { allProps } = props;

  const expenseItemsAddAwait = useSelector(state => state.expenseItemsAdd.await);
  const expenseItemsChangeAwait = useSelector(state => state.expenseItemsChange.await);
  console.log(expenseItemsAddAwait, expenseItemsChangeAwait)

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(modalCloseAction());
    dispatch(modalClearAction());
  }

  const onChange = data => {
    dispatch(changeExpenseItemAction(data));
  }

  const onAdd = data => {
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

  return (
    <>
      <ExpenseItemFormView
        data={{...allProps}}
        onCancel={onCancel}
        onChange={onChange}
        onAdd={onAdd}
        disabled={expenseItemsAddAwait || expenseItemsChangeAwait}
      />
    </>
  );
}
