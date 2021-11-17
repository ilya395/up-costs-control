import React from "react";

export const AddExpenseItem = props => {
  const addNew = () => {
    props.addNewExpenseItem();
  }
  return (
    <button className="add-expense-item-button" onClick={addNew}>
      <div className="add-expense-item-button__icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20H0H20ZM20 40V20V40ZM20 20V0V20ZM20 20H40H20Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </button>
  );
}