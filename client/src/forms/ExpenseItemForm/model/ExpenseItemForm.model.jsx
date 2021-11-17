import React from "react";
import { ExpenseItemFormView } from "../view/ExpenseItemForm.view";

export const ExpenseItemFormModel = props => {
  console.log("ExpenseItemFormModel: ", props)
  const { allProps } = props;
  console.log(allProps)
  return (
    <>
      <ExpenseItemFormView
        data={{...allProps}}
      />
    </>
  );
}
