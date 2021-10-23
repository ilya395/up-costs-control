import React from "react";
import s from "./ExpenseItemsList.module.scss";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.component";

export const ExpenseItemsList = () => {
  return (
    <div className={s["expense-items-list"]}>
      <div className={s["expense-items-list__element"]}>
        <ExpenseItem />
      </div>
      <div className={s["expense-items-list__element"]}>
        <ExpenseItem />
      </div>
      <div className={s["expense-items-list__element"]}>
        <ExpenseItem />
      </div>
      <div className={s["expense-items-list__element"]}>
        <ExpenseItem />
      </div>
    </div>
  );
}