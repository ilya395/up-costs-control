import React, { useEffect, useState } from "react";
import cn from "classnames";
import s from "./ExpenseItemsList.module.scss";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem.component";
import { AddExpenseItem } from "../AddExpenseItem/AddExpenseItem.component";

export const ExpenseItemsList = props => {

  const { costs } = props;

  const [localCosts, setLocalCosts] = useState(costs);

  // <!-- потенциальный кастомный хук -->

  const [droppableElement, setDroppableElement] = useState(null);

  const [canDrop, setCanDrop] = useState(false);

  const droppingElement = (innerData) => { // меняем данные
    const data = JSON.parse(JSON.stringify(localCosts));

    let result = null;

    if (+innerData.from.index - +innerData.to.index > 0) { // вперед // от большего к меньшему
      result = data.map(item => {
        if (+item.id == +innerData.to.id) {
          item.index += 1;
          return item;
        }
        if (+item.id == +innerData.from.id) {
          item.index = +innerData.to.index;
          return item;
        }
        if (+item.index > +innerData.to.index && +item.index < +innerData.from.index) {
          item.index += 1;
          return item;
        }
        return item;
      });
    } else { // назад
      result = data.map(item => {
        if (+item.id == +innerData.from.id) {
          item.index = +innerData.to.index;
          return item;
        }
        if (+item.index < +innerData.to.index && +item.index > +innerData.from.index) {
          item.index -= 1;
          return item;
        }
        if (+item.id == +innerData.to.id) {
          item.index -= 1;
          return item;
        }

        return item;
      });
    }

    setLocalCosts(result.sort((a, b) => +a.index - +b.index));

    props.changeExpenseItemIndex({
      id: innerData.from.id,
      index: innerData.to.index,
    });

    setCanDrop(false);
  }

  const dragOver = (event) => { // объект непосредственно над элементом, в котором можно дропнуть
    event.preventDefault();
  }

  const dragEnter = (event) => { // объект попал в пределы элемента, в котором можно дропнуть
    const target = event.target; // id елемента, в который можно дропнуть
    setCanDrop({
      id: target.id,
      index: target.getAttribute("index"),
    });
  }

  const dragLeave = () => { // объект покунул пределы элемента, в котором можно дропнуть
    setCanDrop(false);
  }

  const dragDrop = () => {
    droppingElement({
      from: {
        id: droppableElement && droppableElement.id,
        index: droppableElement && droppableElement.index,
      },
      to: {
        id: canDrop && canDrop.id,
        index: canDrop && canDrop.index,
      }
    });
  }

  // <!-- /потенциальный кастомный хук -->

  const [coordinates, setCoordinates] = useState(null); // это пертаскиваемый объект

  const onTouchEndHandler = () => {
    coordinates &&
    canDrop &&
    droppingElement({
      from: {
        id: coordinates && coordinates.id,
        index: coordinates && coordinates.index,
      },
      to: {
        id: canDrop && canDrop.id,
        index: canDrop && canDrop.index,
      }
    });

    setCoordinates(null);
  }

  const onTouchMoveHandler = arg => {
    arg ? (!canDrop && setCanDrop(arg)) : setCanDrop(arg);
    // !canDrop && setCanDrop(arg)
  }

  useEffect(() => {
    costs && setLocalCosts( JSON.parse( JSON.stringify(costs) ).sort( (a, b) => +a.index - +b.index ) );
  }, [costs]);

  return (
    <div className={s["expense-items-list"]}>
      {
        localCosts &&
        localCosts.map((item, index) => (
          <div
            className={cn(s["expense-items-list__element"], { [s["can-drop"]]: canDrop && (canDrop.id == item.id) })}
            key={item.id}
            style={{animationDelay: `${index * 200}ms`}}
          >
            <ExpenseItem
              data={item}
              changeExpenseItem={props.changeExpenseItem}
              addCost={props.addCost}
              deleteExpenseItem={props.deleteExpenseItem}
              getDroppableElement={setDroppableElement}
              dragOver={dragOver}
              dragEnter={dragEnter}
              dragLeave={dragLeave}
              dragDrop={dragDrop}
              onTouchEndHandler={onTouchEndHandler}
              onTouchMoveHandler={onTouchMoveHandler}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              canDrop={canDrop}
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