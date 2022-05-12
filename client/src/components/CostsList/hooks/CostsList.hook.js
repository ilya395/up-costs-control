import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { choosedDateSelector, modalEditCostInCollection } from "../../../modules";
import { costsDataFromCostsCollectionSelector, deleteCostInCollection, expenseItemDataFromCostsCollectionSelector, getCostsCollection } from "../../../modules/costsCollection/store";
import { localAuthData } from "../../../utils";

const useCostsList = () => {
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
  const editHandler = useCallback(({id, amount, description, createdAt,}) => () => dispatch(modalEditCostInCollection({
    expenseItemId: Number(expenseItemId),
    userId,
    costCreatedAt: (createdAt && (new Date(createdAt)).getTime()) || date,
    costId: id,
    name: expenseItem.name,
    amount,
    description,
  })), [expenseItemId, userId, date, expenseItem,]);
  const deleteHandler = useCallback((id) => () => dispatch(deleteCostInCollection({
    expenseItemId: Number(expenseItemId),
    userId,
    date: (date).getTime(),
    costId: id,
  })), [expenseItemId, userId, date,]);

  return {
    costs,

    editHandler,
    deleteHandler,
  }
}

export default useCostsList;