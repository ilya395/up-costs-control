import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseItemsList } from "../../components";
import { getCostsAction } from "../../modules/costs";
import { modalAddExpenseItemAction, modalEditExpenseItemAction } from "../../modules/modal";
import { localAuthData } from "../../utils"; // не сработал нормально импорт

export const ExpenseItemsListContainer = () => {

  const dispatch = useDispatch();

  const costs = useSelector(state => state.costs.data);
  const choosedDate = useSelector(state => state.date.choosedDate);
  const goDispatchChoosedDate = () => {
    dispatch(getCostsAction({
      id: localAuthData.getUserId(),
      date: (choosedDate).getTime(),
    }));
  }

  const open = useSelector(state => state.modal.open);
  useEffect(() => {
    goDispatchChoosedDate();
  }, [open, choosedDate]);

  const addNewExpenseItem = () => {
    dispatch(modalAddExpenseItemAction());
  }

  const changeExpenseItem = id => {
    const result = costs.find(item => +item.id === +id);
    dispatch(modalEditExpenseItemAction(result));
  }

  return (
    <ExpenseItemsList
      costs={costs}
      addNewExpenseItem={addNewExpenseItem}
      changeExpenseItem={changeExpenseItem}
    />
  );
}