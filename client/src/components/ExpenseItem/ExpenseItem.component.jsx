import React, { useState } from "react";
import { CLICK_DELAY, CLICK_DURATION } from "../../constants";

export const ExpenseItem = props => {

  const [clickStartTime, setClickStartTime] = useState(null);
  const [clickEndTime, setClickEndTime] = useState(null);
  // const [clickDelay, setClickDelay] = useState(null);
  const [timer, setTimer] = useState(null);

  const returnExpenseItemIdForChanging = () => {
    const { data, changeExpenseItem } = props;
    return changeExpenseItem({
      expenseItemId: data.id,
    });
  }

  const returnExpenseItemIdForDeleting = () => {
    const { data, deleteExpenseItem } = props;
    return deleteExpenseItem({
      expenseItemId: data.id,
    });
  }

  const returnDataForCreateCost = () => {
    const { data, addCost } = props;
    return addCost({
      expenseItemId: data.id,
    });
  }

  const onShortClick = () => {
    console.log("onShortClick")
    returnDataForCreateCost();
  }

  const onLongClick = () => {
    console.log("onLongClick")
    returnExpenseItemIdForDeleting();
  }

  const onCustomDoubleClick = () => {
    console.log("onCustomDoubleClick")
    // returnExpenseItemIdForChanging();
    returnExpenseItemIdForDeleting();
  }

  const onMouseDown = () => {
    setClickStartTime(new Date().getTime());
  }

  const onMouseUp = () => {
    const endTime = new Date().getTime();
    setClickEndTime(endTime);
    // setClickDelay(endTime);

    const difference = Math.abs(clickStartTime - endTime);
    console.log(clickStartTime, endTime, difference, CLICK_DURATION)
    if (difference > CLICK_DURATION) {
      onLongClick();
    } else {
      if (!timer) {
        const tmr = setTimeout(() => {
          onShortClick();
          clearTimeout(tmr);
        }, CLICK_DELAY);
        setTimer(tmr);
      } else {
        clearTimeout(timer);
        onCustomDoubleClick();
      }
    }
  }

  return (
    <article
      className="expense-item-button"
      style={{backgroundColor: props.data.color}}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
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