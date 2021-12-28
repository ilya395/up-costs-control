import { useEffect, useState } from "react";

export const useDesctopDragging = (data) => {
  const { costs, changeExpenseItemIndexCallback = null } = data;

  const [localCosts, setLocalCosts] = useState(costs);

  useEffect(() => {
    costs && setLocalCosts([...costs].sort((a, b) => +a.index - +b.index));
  }, [costs]);

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
    changeExpenseItemIndexCallback && changeExpenseItemIndexCallback({
      id: innerData.from.id,
      index: innerData.to.index,
    });
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
    setCanDrop(false);
  }

  const [coordinates, setCoordinates] = useState(null); // это пертаскиваемый объект

  const [acceptor, setAcceptor] = useState(null);

  const onTouchEndHandler = () => {
    coordinates &&
    acceptor &&
    droppingElement({
      from: {
        id: coordinates && coordinates.id,
        index: coordinates && coordinates.index,
      },
      to: {
        id: acceptor && acceptor.id,
        index: acceptor && acceptor.index,
      }
    });
    setCanDrop(false);
    setCoordinates(null);
    setAcceptor(null)
  }

  return {
    getDroppableElement: (arg) => setDroppableElement(arg),
    dragOver: event => dragOver(event),
    dragEnter: event => dragEnter(event),
    dragLeave: () => dragLeave(),
    dragDrop: () => dragDrop(),
    setLocalCosts,
    localCosts,
    onTouchEndHandler,
    coordinates,
    setCoordinates,
    setAcceptor
  }
}