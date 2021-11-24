import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpenseItemAction } from "../../../modules/costs";
import { DeleteExpenseItemFormView } from "../view/DeleteExpenseItemForm.view";

export const DeleteExpenseItemFormContainer = props => {

  const { allProps } = props;

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
    />
  );
}