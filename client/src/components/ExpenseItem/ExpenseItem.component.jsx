import React, { useEffect, useRef, useState } from "react";
import { CLICK_DELAY, CLICK_DURATION } from "../../constants";
import cn from "classnames";
import s from "./ExpenseItem.module.scss";
import { debounce, inMobile, throttle } from "../../utils";

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

  const makeMove = () => {
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

  const onShortClick = () => {
    returnDataForCreateCost();
  }

  const onLongClick = () => {
    returnExpenseItemIdForDeleting();
  }

  const onCustomDoubleClick = () => {
    returnExpenseItemIdForChanging();
  }

  const onMouseDown = () => { // убрать для мобилки
    if (!inMobile()) {
    console.log("onMouseDown")
    setClickStartTime(new Date().getTime());
    }
  }

  const onMouseUp = () => { // убрать для мобилки
    if (!inMobile()) {
      console.log("onMouseUp")
      makeMove();
    }
  }

  const [readyToDAndD, setReadyToDAndD] = useState(false);

  const onDragStart = (event) => {
    const target = event.target;
    setReadyToDAndD(true);
    props.getDroppableElement({
      id: target.id,
      index: target.getAttribute("index"),
    });
  }

  const onDragEnd = () => {
    setReadyToDAndD(false);
    props.getDroppableElement(null);
  }

  const [itemCoordinates, setItemCoordinates] = useState(null); // координаты периметра
  const refItem = useRef(null);
  useEffect(() => {
    // console.log(props.coordinates && props.coordinates.touch)
    const elem = refItem.current;

    if (readyToDAndD) { // это пертаскиваемый объект
      setItemCoordinates({
        top: props.coordinates && props.coordinates.elem && props.coordinates.elem.top, // itemCoordinates && itemCoordinates.top, // + props.coordinates.offset.top, // touch or element
        left: props.coordinates && props.coordinates.elem && props.coordinates.elem.left, // itemCoordinates && itemCoordinates.left, // + props.coordinates.offset.left,
      });
    }

    // условие попадания центра объекта в периметр зоны дропа
    if (!readyToDAndD && props.coordinates) { // это статичный объект
      const elem = refItem.current;
      const itemCoords = {
        top: 0, //elem.getBoundingClientRect().top,
        left: 0, //elem.getBoundingClientRect().left,
      };
      console.log(itemCoords)
      setItemCoordinates(itemCoords);
      if (
        props.coordinates.top > itemCoords.bottom && props.coordinates.top < itemCoords.top &&
        props.coordinates.left > itemCoords.left && props.coordinates.right < itemCoords.right
      ) {
        props.setAcceptor({
          id: props.data.id,
          index: props.data.index,
        });
        props.onTouchMoveHandler(true);
      } else {
        props.setAcceptor(null);
        props.onTouchMoveHandler(false)
      }
    }

  }, [props.coordinates])

  const onTouchStart = (event) => {
    if (inMobile()) {
      // console.log("onTouchStart")
      setClickStartTime(new Date().getTime());
      setReadyToDAndD(true);
      props.getDroppableElement({
        id: event.target.id,
        index: event.target.getAttribute("index"),
      });

      const touch = event.targetTouches[0]; // 1 finger
      const coords = {
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
        offset: {
          left: 0,
          top: 0,
        }
      };
      props.setCoordinates(coords);
    }
  }

  const onTouchEnd = () => {
    if (inMobile()) {
      // console.log("onTouchEnd")
      makeMove();

      props.onTouchEndHandler();

      props.setCoordinates(null);

      setReadyToDAndD(false);

      props.getDroppableElement(null);
    }
  }

  const onTouchMove = event => {
    if (
      // +event.target.id == +props.data.id
      readyToDAndD
    ) {

      const touch = event.targetTouches[0]; // 1 finger

      const offsetX = touch.clientX - (props.coordinates && props.coordinates.touch && props.coordinates.touch.left ? props.coordinates.touch.left : touch.clientX);
      const offsetY = touch.clientY - (props.coordinates && props.coordinates.touch && props.coordinates.touch.top ? props.coordinates.touch.top : touch.clientY);
      const coords = {
        id: +event.target.id,
        index: +event.target.getAttribute("index"),
        touch: {
          left: touch.clientX, // event.target.getBoundingClientRect().left + props.coordinates.offset.left, //touch.pageX - parentContainer.left - (event.target.getBoundingClientRect().left - parentContainer.left), // - event.target.offsetWidth * 1.5,
          top: touch.clientY, // event.target.getBoundingClientRect().top + props.coordinates.offset.top, // touch.pageY - parentContainer.top - (event.target.getBoundingClientRect().top - parentContainer.top), // - event.target.offsetWidth * 1.5,
          right: "auto",
          bottom: "auto",
        },
        elem: {
          top: itemCoordinates.top + offsetY,
          left: itemCoordinates.left + offsetX,
        },
        offset: {
          left: offsetX,
          top: offsetY,
        }
      };

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