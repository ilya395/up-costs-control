import React from "react";
import { useDispatch } from "react-redux";
import { addExpenseItemAction, changeExpenseItemAction } from "../../../modules/costs";
import { modalCloseAction } from "../../../modules/modal";
import { ExpenseItemFormView } from "../view/ExpenseItemForm.view";

export const ExpenseItemFormContainer = props => {

  const { allProps } = props;

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(modalCloseAction());
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
