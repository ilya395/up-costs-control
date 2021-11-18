import {
  AWAIT_REQUEST_COSTS,
  ERROR_REQUEST_COSTS,
  SUCCESS_REQUEST_COSTS,
  GET_COSTS,
  DELETE_EXPENSE_ITEM,
  ADD_EXPENSE_ITEM,
  AWAIT_DELETE_EXPENSE_ITEM,
  SUCCESS_DELETE_EXPENSE_ITEM,
  ERROR_DELETE_EXPENSE_ITEM
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
export const awaitDeleteExpenseItemAction = () => ({
  type: AWAIT_DELETE_EXPENSE_ITEM
});
export const successDeleteExpenseItemAction = payload => ({
  type: SUCCESS_DELETE_EXPENSE_ITEM,
  payload
});
export const errorDeleteExpenseItemAction = payload => ({
  type: ERROR_DELETE_EXPENSE_ITEM,
  payload
});

export const changeExpenseItemAction = payload => ({
  type: CHANGE_EXPENSE_ITEM,
  payload,
});