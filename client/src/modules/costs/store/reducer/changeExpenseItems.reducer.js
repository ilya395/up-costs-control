import { AWAIT_CHANGE_EXPENSE_ITEM, ERROR_CHANGE_EXPENSE_ITEM, SUCCESS_CHANGE_EXPENSE_ITEM } from "../actions";

export function ChangeExpenseItemsReducer(
  state = {
    data: null,
    await: false,
    error: false
  },
  action
) {
switch (action.type) {
  case AWAIT_CHANGE_EXPENSE_ITEM:
    return {
      ...state,
      await: true,
      error: false,
    }
  case SUCCESS_CHANGE_EXPENSE_ITEM:
    return {
      ...state,
      data: action.payload,
      await: false,
      error: false,
    }
  case ERROR_CHANGE_EXPENSE_ITEM:
    return {
      ...state,
      await: false,
      error: action.payload,
    }
  default:
    return state;
}
}

export const expenseItemsChangeDataSelector = state => state.expenseItemsChange.data;
export const expenseItemsChangeAwaitSelector = state => state.expenseItemsChange.await;
export const expenseItemsChangeErrorSelector = state => state.expenseItemsChange.error;