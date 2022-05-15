import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseItemAction } from "../../../modules/costs";
import { DeleteExpenseItemFormView } from "../view/DeleteExpenseItemForm.view";
export { expenseItemsDeleteAwaitSelector } from "../../../modules";

export const DeleteExpenseItemFormContainer = props => {

  const { allProps } = props;

  const expenseItemsDeleteAwait = useSelector(expenseItemsDeleteAwaitSelector);

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteExpenseItemAction({
      id: allProps.id,
    }));
  }

  return (
    <DeleteExpenseItemFormView
      onDelete={onDelete}
      name={allProps.name}
      disabled={expenseItemsDeleteAwait}
    />
  );
}