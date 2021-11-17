import { MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_ADD_AWAIT, MODAL_EXPENSE_ITEM_ADD_ERROR, MODAL_EXPENSE_ITEM_ADD_SUCCESS } from "../types/expenseItem.type";

export const modalExpenseItemAddAwaitAction = () => ({
  type: MODAL_EXPENSE_ITEM_ADD_AWAIT
});

export const modalExpenseItemAddSuccesAction = () => ({
  type: MODAL_EXPENSE_ITEM_ADD_SUCCESS
});

export const modalExpenseItemAddErrorAction = () => ({
  type: MODAL_EXPENSE_ITEM_ADD_ERROR
});

export const modalExpenseItemAddAction = () => ({
  type: MODAL_EXPENSE_ITEM_ADD
});