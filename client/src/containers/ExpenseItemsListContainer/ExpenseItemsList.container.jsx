import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseItemsList } from "../../components";
import { getCostsAction } from "../../modules/costs";
import { localAuthData } from "../../utils"; // не сработал нормально импорт

export const ExpenseItemsListContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.costs);
  useEffect(() => {
    console.log("getCostsAction", localAuthData.getId())
    dispatch(getCostsAction({
      id: localAuthData.getId(),
      date: (new Date()).getTime()
    }));
  }, []);
  useEffect(() => {
    console.log("costs state: ", state)
  }, [state])
  return (
    <ExpenseItemsList />
  );
}