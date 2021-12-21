import React, { useEffect, useRef, useState } from "react";
import { CLICK_DELAY, CLICK_DURATION } from "../../constants";
import cn from "classnames";
import s from "./ExpenseItem.module.scss";
import { debounce, inMobile, throttle } from "../../utils";
import { useClicks } from "../../hooks";

export const ExpenseItem = props => {

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
    returnDataForCreateCost();
  }

  const onLongClick = () => {
    returnExpenseItemIdForDeleting();
  }

  const onCustomDoubleClick = () => {
    returnExpenseItemIdForChanging();
  }

  const { setValueClickStartTime, setNullClickStartTime, makeMove } = useClicks({
    shortClickCallback: onShortClick,
    doubleClickCallback: onCustomDoubleClick,
    longClickCallback: onLongClick,
  });

  const onMouseDown = () => {
    if (!inMobile()) {
      console.log("onMouseDown")
      // setClickStartTime(new Date().getTime());
      setValueClickStartTime();
    }
  }

  const onMouseUp = () => {
    if (!inMobile()) {
      console.log("onMouseUp")
      makeMove();
    }
  }

  const [readyToDAndD, setReadyToDAndD] = useState(false);

  const startHandler = (event) => {
    setReadyToDAndD(true);
    props.getDroppableElement({
      id: event.target.id,
      index: event.target.getAttribute("index"),
    });
  }

  const endHandler = () => {
    setReadyToDAndD(false);
    props.getDroppableElement(null);
  }

  const onDragStart = (event) => startHandler(event);

  const onDragEnd = () => endHandler();

  const [itemCoordinates, setItemCoordinates] = useState(null); // координаты периметра

  const refItem = useRef(null);

  useEffect(() => {
    if (readyToDAndD) { // это пертаскиваемый объект
      setItemCoordinates({
        top: props.coordinates && props.coordinates.elem && props.coordinates.elem.top,
        left: props.coordinates && props.coordinates.elem && props.coordinates.elem.left,
      });
    }

    // условие попадания центра объекта в периметр зоны дропа
    if (!readyToDAndD && props.coordinates && (props.coordinates.id !== props.data.id)) { // это статичный объект
      console.log("статика")
      const elem = refItem.current;
      const itemCoords = {
        top: elem.getBoundingClientRect().top,
        left: elem.getBoundingClientRect().left,
        bottom: elem.getBoundingClientRect().bottom,
        right: elem.getBoundingClientRect().right,
      };
      console.log(itemCoords)

      setItemCoordinates(props.data.id, itemCoords);
      if (
        props.coordinates.position.y < itemCoords.bottom &&
        props.coordinates.position.y > itemCoords.top &&
        props.coordinates.position.x > itemCoords.left &&
        props.coordinates.position.x < itemCoords.right
      ) {
        console.log("go!")
        return debounce(() => {
          props.setAcceptor({
            id: props.data.id,
            index: props.data.index,
          });
          props.onTouchMoveHandler(true);
          setItemCoordinates(null);
        })();
      } else {
        props.setAcceptor(null);
        props.onTouchMoveHandler(false)
        return;
      }
    }

  }, [props.coordinates]);

  const onTouchStart = (event) => {
    if (inMobile()) {
      console.log("onTouchStart")

      // setClickStartTime(new Date().getTime());
      setValueClickStartTime();

      startHandler(event);
    }
  }

  const onTouchEnd = () => {
    if (inMobile()) {
      console.log("onTouchEnd")
      makeMove();

      props.onTouchEndHandler();

      endHandler();

      props.setCoordinates(null);
    }
  }

  const onTouchMove = event => {
    if (readyToDAndD) {

      // setClickStartTime(null);
      setNullClickStartTime();

      const touch = event.targetTouches[0]; // 1 finger

      const offsetX = touch.clientX - (props.coordinates && props.coordinates.touch && props.coordinates.touch.left ? props.coordinates.touch.left : touch.clientX);
      const offsetY = touch.clientY - (props.coordinates && props.coordinates.touch && props.coordinates.touch.top ? props.coordinates.touch.top : touch.clientY);
      const coords = props.coordinates ? {
        id: +event.target.id,
        index: +event.target.getAttribute("index"),
        touch: {
          left: touch.clientX,
          top: touch.clientY,
          right: "auto",
          bottom: "auto",
        },
        elem: {
          top: itemCoordinates.top + offsetY,
          left: itemCoordinates.left + offsetX,
        },
        position: {
          x: event.target.getBoundingClientRect().left + event.target.getBoundingClientRect().width / 2,
          y: event.target.getBoundingClientRect().top + event.target.getBoundingClientRect().height / 2,
        },
        offset: {
          left: offsetX,
          top: offsetY,
        }
      } : {
        id: +event.target.id,
        index: +event.target.getAttribute("index"),
        touch: {
          left: touch.clientX,
          top: touch.clientY,
          right: "auto",
          bottom: "auto",
        },
        elem: {
          top: 0,
          left: 0,
        },
        position: {
          x: event.target.getBoundingClientRect().left + event.target.getBoundingClientRect().width / 2,
          y: event.target.getBoundingClientRect().top + event.target.getBoundingClientRect().height / 2,
        },
        offset: {
          left: 0,
          top: 0,
        }
      }
      return throttle(() => props.setCoordinates(coords))();
    }
  }

  return (
    <article
      id={props.data.id}
      index={props.data.index}
      className={cn("expense-item-button", { [s["ready-to-drag-and-drop"]]: readyToDAndD })}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={props.dragOver}
      onDragEnter={props.dragEnter}
      onDragLeave={props.dragLeave}
      onDrop={props.dragDrop}
      // onTouchCancel={props.onTouchCancel}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      style={{
        backgroundColor: props.data.color,
        position: readyToDAndD && itemCoordinates ? "fixed" : "relative",
        top: readyToDAndD && itemCoordinates ? `${itemCoordinates.top}px` : "",
        left: readyToDAndD && itemCoordinates ? `${itemCoordinates.left}px` : "",
        // zIndex: readyToDAndD ? "149" : "-1",
      }}
      ref={refItem}
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