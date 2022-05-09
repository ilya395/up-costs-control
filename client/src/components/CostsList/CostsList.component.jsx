import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { choosedDateSelector } from "../../modules";
import { dataCostsCollectionSelector, getCostsCollection } from "../../modules/costsCollection/store";
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
  }, []);
  const costs = useSelector(dataCostsCollectionSelector);
  if (!expenseItemId) {
    return (lol);
  }
  return (`${expenseItemId}`);
};

export default CostsList;