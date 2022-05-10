import {
  MODAL_EXPENSE_ITEM_ADD,
  MODAL_EXPENSE_ITEM_EDIT,
  MODAL_EXPENSE_ITEM_DELETE,
  MODAL_CLOSE,
  MODAL_COST_ADD,
  MODAL_SUPPORT,
  MODAL_MAIN_MENU,
  MODAL_CLEAR,
  MODAL_EDIT_COST_IN_COLLECTION,
  MODAL_DELETE_COST_IN_COLLECTION
} from "../types/modal.type";

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

export const modalDeleteCostInCollection = payload => ({
  type: MODAL_DELETE_COST_IN_COLLECTION,
  payload,
});

export const modalEditCostInCollection = payload => ({
  type: MODAL_EDIT_COST_IN_COLLECTION,
  payload,
});