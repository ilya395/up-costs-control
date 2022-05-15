import { AWAIT_ADD_EXPENSE_ITEM, ERROR_ADD_EXPENSE_ITEM, SUCCESS_ADD_EXPENSE_ITEM } from "../actions";

export function AddExpenseItemsReducer(
  state = {
    data: null,
    await: false,
    error: false
  },
  action
) {
switch (action.type) {
  case AWAIT_ADD_EXPENSE_ITEM:
    return {
      ...state,
      await: true,
      error: false,
    }
  case SUCCESS_ADD_EXPENSE_ITEM:
    return {
      ...state,
      data: action.payload,
      await: false,
      error: false,
    }
  case ERROR_ADD_EXPENSE_ITEM:
    return {
      ...state,
      await: false,
      error: action.payload,
    }
  default:
    return state;
}
}

export const expenseItemsAddDataSelector = state => state.expenseItemsAdd.data;
export const expenseItemsAddAwaitSelector = state => state.expenseItemsAdd.await;
export const expenseItemsAddErrorSelector = state => state.expenseItemsAdd.error;