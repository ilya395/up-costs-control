import React from "react";
import s from "./ExpenseItemsList.module.scss";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.component";
import { AddExpenseItem } from "../AddExpenseItem/AddExpenseItem.component";

export const ExpenseItemsList = props => {
  return (
    <div className={s["expense-items-list"]}>
      {
        props.costs &&
        Array.isArray(props.costs) &&
        props.costs.map(item => (
          <div className={s["expense-items-list__element"]} key={item.id}>
            <ExpenseItem
              data={item}
              changeExpenseItem={props.changeExpenseItem}
              addCost={props.addCost}
              deleteExpenseItem={props.deleteExpenseItem}
            />
          </div>
        ))
      }
      <div className={s["expense-items-list__element"]}>
        <AddExpenseItem
          addNewExpenseItem={props.addNewExpenseItem}
        />
      </div>
    </div>
  );
}