import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { choosedDateSelector, modalEditCostInCollection } from "../../modules";
import { costsDataFromCostsCollectionSelector, deleteCostInCollection, expenseItemDataFromCostsCollectionSelector, getCostsCollection } from "../../modules/costsCollection/store";
import { localAuthData } from "../../utils";

const CostsList = () => {
  const { id: expenseItemId } = useParams();
  const dispatch = useDispatch();
  const userId = localAuthData.getUserId()
  const date = useSelector(choosedDateSelector);
  useEffect(() => {
    dispatch(getCostsCollection({
      expenseItemId: Number(expenseItemId),
      userId,
      date: (date).getTime(),
    }));
  }, [expenseItemId, userId, date,]);
  const costs = useSelector(costsDataFromCostsCollectionSelector);
  const expenseItem = useSelector(expenseItemDataFromCostsCollectionSelector);
  const setDate = (arg) => {
    const date = new Date(arg);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
  const editHandler = ({id, amount, description, createdAt,}) => () => dispatch(modalEditCostInCollection({
    expenseItemId: Number(expenseItemId),
    userId,
    costCreatedAt: (createdAt && (new Date(createdAt)).getTime()) || date,
    costId: id,
    name: expenseItem.name,
    amount,
    description,
  }));
  const deleteHandler = (id) => () => dispatch(deleteCostInCollection({
    expenseItemId: Number(expenseItemId),
    userId,
    date: (date).getTime(),
    costId: id,
  }));
  if (!costs || costs.length === 0) {
    return ("Нет расходов за данный период");
  }
  return (
    costs && costs.map(item => (
      <div className="costs-list-item" key={item.id}>
        <div className="costs-list-item__row">
          <div className="row-item costs-list-item__amount">
            {`${item.amount} руб.`}
          </div>
          <div className="row-item costs-list-item__description">
            {item.description}
          </div>
          <div className="row-item costs-list-item__management">
            <div className="costs-list-item__btn">
              <button
                onClick={editHandler({
                  id: item.id,
                  amount: item.amount,
                  description: item.description,
                  costCreatedAt: item.createdAt,
                })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
            </div>
            <div className="costs-list-item__btn">
              <button onClick={deleteHandler(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default CostsList;