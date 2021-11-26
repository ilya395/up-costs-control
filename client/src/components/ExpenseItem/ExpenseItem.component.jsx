import React, { useState } from "react";
import { CLICK_DELAY, CLICK_DURATION } from "../../constants";

export const ExpenseItem = props => {

  const [clickStartTime, setClickStartTime] = useState(null);
  const [clickEndTime, setClickEndTime] = useState(null);

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
    returnExpenseItemIdForChanging();
  }

  const onMouseDown = () => {
    setClickStartTime(new Date().getTime());
  }

  const onMouseUp = () => {
    const endTime = new Date().getTime();
    setClickEndTime(endTime);

    const difference = Math.abs(clickStartTime - endTime);
    if (difference > CLICK_DURATION) {
      onLongClick();
    } else {
      if (!timer || (timer > CLICK_DELAY)) {
        const tmr = setTimeout(() => {
          onShortClick();
          clearTimeout(tmr);
          setTimer(null);
        }, CLICK_DELAY);
        setTimer(tmr);
      } else {
        onCustomDoubleClick();
        clearTimeout(timer);
        setTimer(null);
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