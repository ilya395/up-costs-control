import React from "react";
import { ExpenseItemsListContainer } from "../../containers";
import s from "./Main.module.scss";

export const Main = () => {
  return (
    <div className="container">
      <main className={s["main-content-section"]}>
        <div className={s["main-content-section__title"]}>
          <h1>
            Мои расходы
          </h1>
        </div>
        <div className={s["main-content-section__datepicker"]}>
          1
        </div>
        <div className={s["main-content-section__expense-items-list"]}>
          <ExpenseItemsListContainer />
        </div>
        <div className={s["main-content-section__nav-bar"]}>
          3
          <nav className="nav-bar"></nav>
        </div>
      </main>
    </div>
  );
}