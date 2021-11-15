import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseItemsList } from "../../components";
import { getCostsAction } from "../../modules/costs";
import { localAuthData } from "../../utils"; // не сработал нормально импорт

export const ExpenseItemsListContainer = () => {
  const dispatch = useDispatch();
  const costs = useSelector(state => state.costs.data);
  const choosedDate = useSelector(state => state.date.choosedDate);
  useEffect(() => {
    console.log("getCostsAction", localAuthData.getId())
    dispatch(getCostsAction({
      id: localAuthData.getId(),
      date: (choosedDate).getTime(),
    }));
  }, [choosedDate]);
  useEffect(() => {
    console.log("costs state: ", costs)
  }, [costs])
  return (
    <ExpenseItemsList
      costs={costs}
    />
  );
}