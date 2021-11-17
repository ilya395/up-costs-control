import { MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_EDIT } from "../types/modal.type";

export const modalAddExpenseItemAction = () => ({
  type: MODAL_EXPENSE_ITEM_ADD,
});

export const modalEditExpenseItemAction = payload => ({
  type: MODAL_EXPENSE_ITEM_EDIT,
  payload
});