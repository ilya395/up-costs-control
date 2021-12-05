import {
  MODAL_EXPENSE_ITEM_ADD,
  MODAL_EXPENSE_ITEM_EDIT,
  MODAL_EXPENSE_ITEM_DELETE,
  MODAL_CLOSE, MODAL_OPEN,
  MODAL_COST_ADD,
  MODAL_SUPPORT,
  MODAL_MAIN_MENU,
  MODAL_CLEAR
} from "../types/modal.type";

// export const modalOpenAction = () => ({
//   type: MODAL_OPEN,
// });

export const modalCloseAction = () => ({
  type: MODAL_CLOSE,
});

export const modalClearAction = () => ({
  type: MODAL_CLEAR
});

export const modalAddCostAction = payload => ({
  type: MODAL_COST_ADD,
  payload,
});

export const modalAddExpenseItemAction = payload => ({
  type: MODAL_EXPENSE_ITEM_ADD,
  payload,
});

export const modalEditExpenseItemAction = payload => ({
  type: MODAL_EXPENSE_ITEM_EDIT,
  payload,
});

export const modalDeleteExpenseItemAction = payload => ({
  type: MODAL_EXPENSE_ITEM_DELETE,
  payload,
});

export const modalSupportAction = () => ({
  type: MODAL_SUPPORT,
});

export const modalMainMenuAction = () => ({
  type: MODAL_MAIN_MENU,
});