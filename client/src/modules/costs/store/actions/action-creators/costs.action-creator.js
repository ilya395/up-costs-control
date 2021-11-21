import {
  AWAIT_REQUEST_COSTS,
  ERROR_REQUEST_COSTS,
  SUCCESS_REQUEST_COSTS,
  GET_COSTS,
  DELETE_EXPENSE_ITEM,
  ADD_EXPENSE_ITEM,
  AWAIT_DELETE_EXPENSE_ITEM,
  SUCCESS_DELETE_EXPENSE_ITEM,
  ERROR_DELETE_EXPENSE_ITEM,
  CHANGE_EXPENSE_ITEM,
  AWAIT_ADD_EXPENSE_ITEM,
  SUCCESS_ADD_EXPENSE_ITEM,
  ERROR_ADD_EXPENSE_ITEM,
  AWAIT_CHANGE_EXPENSE_ITEM,
  SUCCESS_CHANGE_EXPENSE_ITEM,
  ERROR_CHANGE_EXPENSE_ITEM,
  AWAIT_ADD_COSTS,
  SUCCESS_ADD_COSTS,
  ERROR_ADD_COSTS,
  ADD_COSTS,
} from "../types/costs.type";

export const getCostsAction = payload => ({
  type: GET_COSTS,
  payload,
});
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

export const addCostsAction = payload => ({
  type: ADD_COSTS,
  payload,
});
export const awaitAddCostsAction = () => ({
  type: AWAIT_ADD_COSTS,
});
export const succesAddCostsAction = payload => ({
  type: SUCCESS_ADD_COSTS,
  payload,
});
export const errorAddCostsAction = payload => ({
  type: ERROR_ADD_COSTS,
  payload,
});

export const addExpenseItemAction = payload => ({
  type: ADD_EXPENSE_ITEM,
  payload,
});
export const awaitAddExpenseItemAction = () => ({
  type: AWAIT_ADD_EXPENSE_ITEM,
});
export const successAddExpenseItemAction = payload => ({
  type: SUCCESS_ADD_EXPENSE_ITEM,
  payload,
});
export const errorAddExpenseItemAction = payload => ({
  type: ERROR_ADD_EXPENSE_ITEM,
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
export const awaitChangeExpenseItemAction = () => ({
  type: AWAIT_CHANGE_EXPENSE_ITEM,
});
export const successChangeExpenseItemAction = payload => ({
  type: SUCCESS_CHANGE_EXPENSE_ITEM,
  payload,
});
export const errorChangeExpenseItemAction = payload => ({
  type: ERROR_CHANGE_EXPENSE_ITEM,
  payload,
});