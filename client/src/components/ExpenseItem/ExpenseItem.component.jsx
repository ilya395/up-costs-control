import React from "react";

export const ExpenseItem = props => {
  return (
    <article className="expense-item-button">
      <h3 className="expense-item-button__title simple-text_other lowercase">
        {props.data.name}
      </h3>
      <div className="expense-item-button__price simple-text_number">
        {props.data.amount || "0"}
      </div>
    </article>
  );
}