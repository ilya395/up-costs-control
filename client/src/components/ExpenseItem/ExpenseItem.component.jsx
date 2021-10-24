import React from "react";

export const ExpenseItem = () => {
  return (
    <article className="expense-item-button">
      <h3 className="expense-item-button__title simple-text_other lowercase">
        Аренда квартиры
      </h3>
      <div className="expense-item-button__price simple-text_number">
        20443.-
      </div>
    </article>
  );
}