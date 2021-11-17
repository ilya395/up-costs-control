import { MODAL_EXPENSE_ITEM_ADD_AWAIT, MODAL_EXPENSE_ITEM_ADD_ERROR, MODAL_EXPENSE_ITEM_ADD_SUCCESS } from "../actions";

const initialExpenseItemState = {
  await: false,
  error: false,
  data: null,
}

export function expenseItemReducer(state = initialExpenseItemState, action) {
  switch (action.type) {
    case MODAL_EXPENSE_ITEM_ADD_AWAIT:
      return {
        ...state,
        await: true,
        error: false,
      }
    case MODAL_EXPENSE_ITEM_ADD_SUCCESS:
      return {
        ...state,
        await: false,
        error: false,
        data: action.payload
      }
    case MODAL_EXPENSE_ITEM_ADD_ERROR:
      return {
        ...state,
        await: false,
        error: action.payload
      }
    default:
      return state;
  }
}