import React from "react";
import { useDispatch } from "react-redux";
import { modalClearAction, modalCloseAction } from "../../../modules";
import { addExpenseItemAction, changeExpenseItemAction } from "../../../modules/costs";
import { ExpenseItemFormView } from "../view/ExpenseItemForm.view";

export const ExpenseItemFormContainer = props => {

  const { allProps } = props;

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

  return (
    <>
      <ExpenseItemFormView
        data={{...allProps}}
        onCancel={onCancel}
        onChange={onChange}
        onAdd={onAdd}
      />
    </>
  );
}
