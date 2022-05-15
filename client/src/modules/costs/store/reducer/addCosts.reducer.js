import { AWAIT_ADD_COSTS, ERROR_ADD_COSTS, SUCCESS_ADD_COSTS } from "../actions";

export function AddCostsReducer(
  state = {
    data: null,
    await: false,
    error: false
  },
  action
) {
switch (action.type) {
  case AWAIT_ADD_COSTS:
    return {
      ...state,
      await: true,
      error: false,
    }
  case SUCCESS_ADD_COSTS:
    return {
      ...state,
      data: action.payload,
      await: false,
      error: false,
    }
  case ERROR_ADD_COSTS:
    return {
      ...state,
      await: false,
      error: action.payload,
    }
  default:
    return state;
}
}

export const addCostsDataSelector = state => state.costsAdd.data;
export const addCostsAwaitSelector = state => state.costsAdd.await;
export const addCostsErrorSelector = state => state.costsAdd.error;