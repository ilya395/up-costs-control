import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseItemAction, changeExpenseItemAction, deleteExpenseItemAction } from "../../../modules/costs";
import { modalAddExpenseItemAction, modalCloseExpenseItemAction, modalDeleteExpenseItemAction } from "../../../modules/modal";
import { ExpenseItemFormView } from "../view/ExpenseItemForm.view";

export const ExpenseItemFormContainer = props => {

  const { allProps } = props;

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(modalCloseExpenseItemAction());
  }

  const onChange = data => {
    dispatch(changeExpenseItemAction(data));
  }

  const onDelete = data => {
    dispatch(deleteExpenseItemAction(data));
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
        onDelete={onDelete}
        onAdd={onAdd}
      />
    </>
  );
}
