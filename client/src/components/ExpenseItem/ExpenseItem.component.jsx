import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import cn from "classnames";
import s from "./ExpenseItem.module.scss";
import { inMobile, throttle } from "../../utils";
import { useClicks } from "../../hooks";
import { ScrollControllerContext } from "../../context";
import { CLICK_DURATION } from "../../constants";
import { useHistory } from "react-router-dom";

export const ExpenseItem = props => {

  const {
    data,
    changeExpenseItem,
    deleteExpenseItem,
    addCost,
    getDroppableElement,
    coordinates,
    onTouchEndHandler,
    onTouchMoveHandler,
    canDrop,
    setCoordinates,
    dragOver,
    dragEnter,
    dragLeave,
    dragDrop,
  } = props;

  const history = useHistory();

  const redirectToCost = useCallback(() => history.push(`/expense-item/${data.id}`), [data.id]);

  const [clickedOnManagementBtn, setClickedOnManagementBtn] = useState(false);

  const scrollController = useContext(ScrollControllerContext);

  const returnExpenseItemIdForChanging = useCallback(() => changeExpenseItem({
    expenseItemId: data.id,
  }), [data.id, changeExpenseItem]);

  const returnExpenseItemIdForDeleting = useCallback(() => deleteExpenseItem({
    expenseItemId: data.id,
  }), [data.id, deleteExpenseItem]);

  const returnDataForCreateCost = useCallback(() => addCost({
    expenseItemId: data.id,
  }), [data.id, addCost]);

  const onShortClick = () => null; // returnDataForCreateCost();

  const onLongClick = () => null; // returnExpenseItemIdForDeleting();

  const onCustomDoubleClick = () => null; // returnExpenseItemIdForChanging();

  const { setValueClickStartTime, setNullClickStartTime, makeMove } = useClicks({
    shortClickCallback: onShortClick,
    doubleClickCallback: onCustomDoubleClick,
    longClickCallback: onLongClick,
  });

  const onMouseDown = () => !inMobile() && setValueClickStartTime();

  const onMouseUp = () => !inMobile() && makeMove();

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
        const values = {
          id: event.target.getAttribute("id"),
          index: event.target.getAttribute("index"),
        }
        getDroppableElement(values);
        clearTimeout(timer);
        clearTimeout(clickTimer)
        setClickTimer(null);
      }, CLICK_DURATION + 10);
      setClickTimer(timer);
    }

    return wrapper();
  }

  const endHandler = () => {
    clearTimeout(clickTimer)
    setClickTimer(null);

    setReadyToDAndD(false);
    getDroppableElement(null);
  }

  const onDragStart = (event) => startHandler(event);

  const onDragEnd = () => endHandler();

  const [itemCoordinates, setItemCoordinates] = useState(null); // координаты периметра

  const refItem = useRef(null);

  useEffect(() => {
    if (readyToDAndD) { // это пертаскиваемый объект
      setItemCoordinates({
        top: coordinates && coordinates.elem && coordinates.elem.top,
        left: coordinates && coordinates.elem && coordinates.elem.left,
      });
    }

    // условие попадания центра объекта в периметр зоны дропа
    if (!readyToDAndD && coordinates && (coordinates.id !== data.id)) { // это статичный объект
      const elem = refItem.current;

      const itemCoords = {
        top: elem.getBoundingClientRect().top,
        left: elem.getBoundingClientRect().left,
        bottom: elem.getBoundingClientRect().bottom,
        right: elem.getBoundingClientRect().right,
      };

      // setItemCoordinates(itemCoords);

      if (
        coordinates.position.y < itemCoords.bottom &&
        coordinates.position.y > itemCoords.top &&
        coordinates.position.x > itemCoords.left &&
        coordinates.position.x < itemCoords.right
      ) { // из всех статичных объектов должен отработать один
        // или debounce или проверять в род.методе заполненность или сравнивать данные в род.методе
        setItemCoordinates(null);
        onTouchMoveHandler({
          id: data.id,
          index: data.index,
        });
      } else if (canDrop && (canDrop.id === data.id)) { //это иммено наш объект-подложка
        onTouchMoveHandler(null)
      }
    }

  }, [coordinates, readyToDAndD]);

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

      onTouchEndHandler();

      endHandler();

      setCoordinates(null);

      scrollController.setScroll(true);
    }
  }

  const onTouchMove = useCallback(event => {
    if (readyToDAndD && itemCoordinates) {

      setNullClickStartTime();

      const touch = event.targetTouches[0]; // 1 finger

      const offsetX = touch.clientX - (coordinates && coordinates.touch && coordinates.touch.left ? coordinates.touch.left : touch.clientX);
      const offsetY = touch.clientY - (coordinates && coordinates.touch && coordinates.touch.top ? coordinates.touch.top : touch.clientY);
      const coords = coordinates ? {
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
      return throttle(() => setCoordinates(coords))();
    }
  }, [readyToDAndD, itemCoordinates]);

  const fuckingTitle = title => {
    if (title.length < 12) {
      return title;
    }
    let newTitle = title;
    newTitle = newTitle.slice(0, 11);
    newTitle = newTitle[newTitle.length - 1] == " " ? newTitle.slice(0, newTitle.length - 1) : newTitle;
    return newTitle = `${newTitle}...`;
  }

  const managementBlockClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setClickedOnManagementBtn(!clickedOnManagementBtn);
  }

  const list = useRef(null);

  const clickHandler = (event) => {
    const targetElement = event.target;
    if (!(list.current && list.current.contains(targetElement))) {
      setClickedOnManagementBtn(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, []);

  return (
    <article
      id={data.id}
      index={data.index}
      className={cn("expense-item-button", { [s["ready-to-drag-and-drop"]]: readyToDAndD })}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={dragDrop}
      // onTouchCancel={props.onTouchCancel}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      style={{
        backgroundColor: data.color,
        position: readyToDAndD && itemCoordinates ? "fixed" : "relative",
        top: readyToDAndD && itemCoordinates ? `${itemCoordinates.top}px` : "",
        left: readyToDAndD && itemCoordinates ? `${itemCoordinates.left}px` : "",
        // zIndex: readyToDAndD ? "149" : "-1",
      }}
      ref={refItem}
    >
      <div className="expense-item-button__expense-item-management">
        <button className="expense-item-management__manage-button" onClick={managementBlockClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg>
        </button>
        {
            clickedOnManagementBtn &&
            <ul className="expense-item-management__list" ref={list}>
              <li className="expense-item-management__list-item">
                <button className="expense-item-management__variable-btn" onClick={returnExpenseItemIdForChanging}>Редактировать</button>
              </li>
              <li className="expense-item-management__list-item">
                <button className="expense-item-management__variable-btn" onClick={returnExpenseItemIdForDeleting}>Удалить</button>
              </li>
              <li className="expense-item-management__list-item">
                <button className="expense-item-management__variable-btn" onClick={returnDataForCreateCost}>Добавить расходы</button>
              </li>
              <li className="expense-item-management__list-item">
                <button className="expense-item-management__variable-btn" onClick={redirectToCost}>Перейти к расходам</button>
              </li>
            </ul>
          }
      </div>
      <h3 className="expense-item-button__title simple-text_other lowercase" style={{pointerEvents: "none"}}>
        {fuckingTitle(data.name)}
      </h3>
      <div className="expense-item-button__price simple-text_number" style={{pointerEvents: "none"}}>
        {data.costsAmount || "0"}
      </div>
    </article>
  );
}