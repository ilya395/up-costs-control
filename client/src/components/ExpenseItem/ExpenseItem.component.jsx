import React, { useContext, useEffect, useRef, useState } from "react";
import cn from "classnames";
import s from "./ExpenseItem.module.scss";
import { inMobile, throttle } from "../../utils";
import { useClicks } from "../../hooks";
import { ScrollControllerContext } from "../../context";
import { CLICK_DURATION } from "../../constants";

export const ExpenseItem = props => {

  const scrollController = useContext(ScrollControllerContext);

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
      setValueClickStartTime();
    }
  }

  const onMouseUp = () => {
    if (!inMobile()) {
      makeMove();
    }
  }

  const [readyToDAndD, setReadyToDAndD] = useState(false);

  const [clickTimer, setClickTimer] = useState(null); // таймер перехода в состояние touch

  const startHandler = (event) => {

    let timer = null;

    const wrapper = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setReadyToDAndD(true);
        props.getDroppableElement({
          id: event.target.id,
          index: event.target.getAttribute("index"),
        });
        clearTimeout(timer);
        clearTimeout(clickTimer)
        setClickTimer(null);
      }, CLICK_DURATION * 2 + 10);
      setClickTimer(timer);
    }

    return wrapper();
  }

  const endHandler = () => {
    clearTimeout(clickTimer)
    setClickTimer(null);

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
      const elem = refItem.current;

      const itemCoords = {
        top: elem.getBoundingClientRect().top,
        left: elem.getBoundingClientRect().left,
        bottom: elem.getBoundingClientRect().bottom,
        right: elem.getBoundingClientRect().right,
      };

      // setItemCoordinates(itemCoords);

      if (
        props.coordinates.position.y < itemCoords.bottom &&
        props.coordinates.position.y > itemCoords.top &&
        props.coordinates.position.x > itemCoords.left &&
        props.coordinates.position.x < itemCoords.right
      ) { // из всех статичных объектов должен отработать один
        // или debounce или проверять в род.методе заполненность или сравнивать данные в род.методе
        setItemCoordinates(null);
        props.onTouchMoveHandler({
          id: props.data.id,
          index: props.data.index,
        });
      } else if (props.canDrop && (props.canDrop.id === props.data.id)) { //это иммено наш объект-подложка
        props.onTouchMoveHandler(null)
      }
    }

  }, [props.coordinates]);

  const onTouchStart = (event) => {
    if (inMobile()) {
      setValueClickStartTime();

      startHandler(event);

      scrollController.setScroll(false);
    }
  }

  const onTouchEnd = () => {
    if (inMobile()) {
      makeMove();

      props.onTouchEndHandler();

      endHandler();

      props.setCoordinates(null);

      scrollController.setScroll(true);
    }
  }

  const onTouchMove = event => {
    if (readyToDAndD) {

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

  const fuckingTitle = title => {
    if (title.length < 12) {
      console.log(title.length)
      return title;
    }
    let newTitle = title;
    newTitle = newTitle.slice(0, 11);
    newTitle = newTitle[newTitle.length - 1] == " " ? newTitle.slice(0, newTitle.length - 1) : newTitle;
    return newTitle = `${newTitle}...`;
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
        {fuckingTitle(props.data.name)}
      </h3>
      <div className="expense-item-button__price simple-text_number" style={{pointerEvents: "none"}}>
        {props.data.costsAmount || "0"}
      </div>
    </article>
  );
}