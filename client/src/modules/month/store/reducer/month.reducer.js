import { CHOOSED_MONTH } from "../actions";

const initialMonthState = {
  choosedDate: new Date(),
}

export function MonthReducer(state = initialMonthState, action) {
  switch (action.type) {
    case CHOOSED_MONTH:
      return {
        ...state,
        choosedDate: action.payload
      }

    default:
      return state;
  }
}

export const choosedDateSelector = state => state.date. choosedDate;