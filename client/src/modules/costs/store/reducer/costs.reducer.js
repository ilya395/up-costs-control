import { createSelector } from "reselect";
import {
  AWAIT_REQUEST_COSTS,
  ERROR_REQUEST_COSTS,
  SUCCESS_REQUEST_COSTS,
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

export const costsDataSelector = state => state.costsGet.data;
export const costsAwaitSelector = state => state.costsGet.await;
export const costsErrorSelector = state => state.costsGet.error;

// export const costsDataSortedSelector = state => state.costsGet.data.sort( (a, b) => +a.index - +b.index );
export const expenseItemsSortedSelector = createSelector(
  costsDataSelector,
  items => items.sort( (a, b) => +a.index - +b.index ),
);