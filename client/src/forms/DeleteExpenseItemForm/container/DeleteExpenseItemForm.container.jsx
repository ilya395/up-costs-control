import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseItemAction } from "../../../modules/costs";
import { DeleteExpenseItemFormView } from "../view/DeleteExpenseItemForm.view";

export const DeleteExpenseItemFormContainer = props => {
  console.log("DeleteExpenseItemFormContainer")

  const { allProps } = props;

  const expenseItemsDeleteAwait = useSelector(state => state.expenseItemsDelete.await);

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