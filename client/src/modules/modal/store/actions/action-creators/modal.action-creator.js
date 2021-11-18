import { MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_EDIT, MODAL_EXPENSE_ITEM_DELETE, MODAL_CLOSE } from "../types/modal.type";

export const modalCloseExpenseItemAction = () => ({
  type: MODAL_CLOSE,
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