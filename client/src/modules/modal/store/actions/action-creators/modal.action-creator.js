import { MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_EDIT, MODAL_EXPENSE_ITEM_DELETE, MODAL_CLOSE, MODAL_OPEN, MODAL_COST_ADD } from "../types/modal.type";

export const modalOpenAction = () => ({
  type: MODAL_OPEN,
});

export const modalCloseAction = () => ({
  type: MODAL_CLOSE,
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