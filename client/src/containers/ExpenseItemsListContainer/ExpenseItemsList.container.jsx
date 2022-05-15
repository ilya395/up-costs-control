import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseItemsList } from "../../components";
import { getCostsAction } from "../../modules/costs";
import { modalAddCostAction, modalAddExpenseItemAction, modalDeleteExpenseItemAction, modalEditExpenseItemAction } from "../../modules/modal";
import { changeExpenseItemAction, choosedDateSelector, modalOpenSelector, costsDataSelector } from "../../modules";
import { localAuthData } from "../../utils"; // не сработал нормально импорт
import { memo } from "react";

export const ExpenseItemsListContainer = memo(() => {

  const dispatch = useDispatch();

  const expenseItems = useSelector(costsDataSelector);

  const choosedDate = useSelector(choosedDateSelector);

  const goDispatchChoosedDate = () => {
    dispatch(getCostsAction({
      id: localAuthData.getUserId(),
      date: (choosedDate).getTime(),
    }));
  }

  const open = useSelector(modalOpenSelector);

  useEffect(() => {
    goDispatchChoosedDate();
  }, [open, choosedDate]);

  const addNewExpenseItem = () => dispatch(modalAddExpenseItemAction());

  const changeExpenseItem = ({expenseItemId}) => {
    const result = expenseItems.find(item => +item.id === +expenseItemId);
    dispatch(modalEditExpenseItemAction(result));
  }

  const changeExpenseItemIndex = ({id, index}) => {
    dispatch(changeExpenseItemAction({id, index}));
  }

  const addCost = ({expenseItemId}) => {
    const result = expenseItems.find(item => +item.id === +expenseItemId);
    dispatch(modalAddCostAction({expenseItemId, ...result}));
  }

  const deleteExpenseItem = ({expenseItemId}) => {
    const result = expenseItems.find(item => +item.id === +expenseItemId);
    dispatch(modalDeleteExpenseItemAction(result));
  }

  return (
    <ExpenseItemsList
      costs={expenseItems}
      addNewExpenseItem={addNewExpenseItem}
      changeExpenseItem={changeExpenseItem}
      addCost={addCost}
      deleteExpenseItem={deleteExpenseItem}
      changeExpenseItemIndex={changeExpenseItemIndex}
    />
  );
});