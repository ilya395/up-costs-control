import {
  AWAIT_REQUEST_COSTS,
  ERROR_REQUEST_COSTS,
  SUCCESS_REQUEST_COSTS,
  GET_COSTS,
} from "../types/costs.type";

export const costsAwaitAction = () => ({
  type: AWAIT_REQUEST_COSTS,
});

export const costsErrorAction = error => ({
  type: ERROR_REQUEST_COSTS,
  error,
});

export const costsSuccessAction = payload => ({
  type: SUCCESS_REQUEST_COSTS,
  payload,
});

export const getCostsAction = payload => ({
  type: GET_COSTS,
  payload,
});

export const addCostsAction = payload => ({
  type: ADD_COSTS,
  payload,
});

export const addExpenseItemAction = payload => ({
  type: ADD_EXPENSE_ITEM,
  payload,
});

export const deleteExpenseItemAction = payload => ({
  type: DELETE_EXPENSE_ITEM,
  payload,
});

export const changeExpenseItemAction = payload => ({
  type: CHANGE_EXPENSE_ITEM,
  payload,
});