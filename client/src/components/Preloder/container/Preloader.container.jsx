import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LOADING_APP, LOADING_DATA } from "../../../constants";
import { addCostsAwaitSelector, authAwaitSelector, costsAwaitSelector, expenseItemsAddAwaitSelector, expenseItemsChangeAwaitSelector, expenseItemsDeleteAwaitSelector } from "../../../modules";
import { PreloaderView } from "../view/Preloader.view";

export const PreloaderContainer = () => {

  const [status, setStatus] = useState({
    active: true,
    mode: LOADING_APP,
  });

  useEffect(() => {
    setStatus({
      ...status,
      active: false,
      mode: LOADING_APP,
    });
  }, []);

  const authAwait = useSelector(authAwaitSelector);
  const getCostsAwait = useSelector(costsAwaitSelector);
  const expenseItemsDeleteAwait = useSelector(expenseItemsDeleteAwaitSelector);
  const expenseItemsAddAwait = useSelector(expenseItemsAddAwaitSelector);
  const expenseItemsChangeAwait = useSelector(expenseItemsChangeAwaitSelector);
  const addCostsAwait = useSelector(addCostsAwaitSelector);

  const awaitOrNot = () => {
    if (
      authAwait || getCostsAwait || expenseItemsDeleteAwait ||
      expenseItemsAddAwait || expenseItemsChangeAwait || addCostsAwait
    ) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    setStatus({
      active: awaitOrNot() ? true : false,
      mode: LOADING_DATA,
    });
  }, [authAwait, getCostsAwait, expenseItemsDeleteAwait, expenseItemsAddAwait, expenseItemsChangeAwait, addCostsAwait]);

  return (
    <PreloaderView
      status={status}
    />
  );
}