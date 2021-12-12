import React, { useState } from "react";
import { CLICK_DELAY, CLICK_DURATION } from "../../constants";
import cn from "classnames";
import s from "./ExpenseItem.module.scss";

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

  // const [articleClasses, setArticleClasses] = useState(cn({"expense-item-button": true,}));

  // useEffect(() => {
  //   if (readyToDAndD) {
  //     setArticleClasses(cn({
  //       ...articleClasses,
  //       "ready-to-drag-and-drop": true,
  //     }));
  //   } else {
  //     setArticleClasses(cn({
  //       ...articleClasses,
  //       "ready-to-drag-and-drop": false,
  //     }));
  //   }
  // }, [readyToDAndD])

  const [readyToDAndD, setReadyToDAndD] = useState(false);

  const onDragStart = (event) => {
    const target = event.target;
    console.log("onDragStart",)
    setReadyToDAndD(true);
    props.getDroppableElement({
      id: target.id,
      index: target.getAttribute("index"),
    });
  }

  const onDragEnd = () => {
    console.log("onDragEnd")
    setReadyToDAndD(false);
    props.getDroppableElement(null);
  }

  return (
    <article
      id={props.data.id}
      index={props.data.index}
      className={cn("expense-item-button", { [s["ready-to-drag-and-drop"]]: readyToDAndD })}
      style={{backgroundColor: props.data.color}}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={props.dragOver}
      onDragEnter={props.dragEnter}
      onDragLeave={props.dragLeave}
      onDrop={props.dragDrop}
    >
      <h3 className="expense-item-button__title simple-text_other lowercase" style={{pointerEvents: "none"}}>
        {props.data.name}
      </h3>
      <div className="expense-item-button__price simple-text_number" style={{pointerEvents: "none"}}>
        {props.data.costsAmount || "0"}
      </div>
    </article>
  );
}