import {
  AWAIT_REQUEST_COSTS,
  ERROR_REQUEST_COSTS,
  SUCCESS_REQUEST_COSTS,
  AWAIT_DELETE_EXPENSE_ITEM,
  SUCCESS_DELETE_EXPENSE_ITEM,
  ERROR_DELETE_EXPENSE_ITEM
} from "../actions";

export const initialCostsState = {
  data: null,
  await: false,
  error: false
};

export function CostsReducer(state = initialCostsState, action) {
  switch (action.type) {

    case AWAIT_REQUEST_COSTS:
      return {
        ...state,
        await: true,
        error: false,
      }

    case ERROR_REQUEST_COSTS:
      return {
        ...state,
        await: false,
        error: action.payload
      }

    case SUCCESS_REQUEST_COSTS:
      return {
        ...state,
        await: false,
        error: false,
        data: action.payload,
      }

    default:
      return {
        ...state
      }
  }
}

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
        data: payload,
        await: false,
        error: false,
      }
    case ERROR_DELETE_EXPENSE_ITEM:
      return {
        ...state,
        await: false,
        error: true,
      }
    default:
      return state;
  }
}