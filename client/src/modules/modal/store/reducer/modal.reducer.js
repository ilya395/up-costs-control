import { MODAL_CLOSE, MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_DELETE, MODAL_EXPENSE_ITEM_EDIT, MODAL_OPEN } from "../actions";

const initialModalState = {
  open: false,
  componentName: null,
  data: null,
};

export const ModalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case MODAL_EXPENSE_ITEM_ADD:
      return {
        ...state,
        open: true,
        componentName: MODAL_EXPENSE_ITEM_ADD,
        data: null,
      }
    case MODAL_EXPENSE_ITEM_EDIT:
      return {
        ...state,
        open: true,
        componentName: MODAL_EXPENSE_ITEM_EDIT,
        data: action.payload,
      }
    case MODAL_EXPENSE_ITEM_DELETE:
      return {
        ...state,
        open: true,
        componentName: MODAL_EXPENSE_ITEM_DELETE,
        data: action.payload,
      }
    case MODAL_OPEN:
      return {
        ...state,
        open: true,
        componentName: null,
        data: null,
      }
    case MODAL_CLOSE:
      return {
        ...state,
        ...initialModalState
      }
    default:
      return state;
  }
}