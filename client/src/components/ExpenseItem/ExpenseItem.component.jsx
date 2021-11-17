import React from "react";

export const ExpenseItem = props => {

  const returnExpenseItemId =() => {
    const { data, changeExpenseItem } = props;
    return changeExpenseItem(data.id);
  }

  return (
    <article
      className="expense-item-button"
      style={{backgroundColor: props.data.color}}
      onClick={returnExpenseItemId}
    >
      <h3 className="expense-item-button__title simple-text_other lowercase">
        {props.data.name}
      </h3>
      <div className="expense-item-button__price simple-text_number">
        {props.data.costsAmount || "0"}
      </div>
    </article>
  );
}