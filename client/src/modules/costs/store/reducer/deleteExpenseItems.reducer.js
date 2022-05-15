import { AWAIT_DELETE_EXPENSE_ITEM, ERROR_DELETE_EXPENSE_ITEM, SUCCESS_DELETE_EXPENSE_ITEM } from "../actions";

export function DeleteExpenseItemsReducer(
  state = {
    data: null,
    await: false,
    error: false
  },
  action
) {
switch (action.type) {
  case AWAIT_DELETE_EXPENSE_ITEM:
    return {
      ...state,
      await: true,
      error: false,
    }
  case SUCCESS_DELETE_EXPENSE_ITEM:
    return {
      ...state,
      data: action.payload,
      await: false,
      error: false,
    }
  case ERROR_DELETE_EXPENSE_ITEM:
    return {
      ...state,
      await: false,
      error: action.payload,
    }
  default:
    return state;
}
}

export const expenseItemsDeleteDataSelector = state => state.expenseItemsDelete.data;
export const expenseItemsDeleteAwaitSelector = state => state.expenseItemsDelete.await;
export const expenseItemsDeleteErrorSelector = state => state.expenseItemsDelete.error;