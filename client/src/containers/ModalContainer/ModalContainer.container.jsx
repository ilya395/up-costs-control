import React from "react";
import { MainMenu, Modal, Support } from "../../components";
import { ExpenseItemFormContainer, DeleteExpenseItemFormContainer } from "../../forms";
import { CostFormContainer } from "../../forms/CostForm";
import { ProfileLayout } from "../../layouts";
import { MODAL_COST_ADD, MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_DELETE, MODAL_EXPENSE_ITEM_EDIT, MODAL_MAIN_MENU, MODAL_SUPPORT } from "../../modules/modal";

export const ModalContainer = props => {

  const { data } = props;

  if (
    props.componentName === MODAL_EXPENSE_ITEM_ADD ||
    props.componentName === MODAL_EXPENSE_ITEM_EDIT
  ) {
    return (
      <Modal
        render={props => <ExpenseItemFormContainer allProps={{...props, ...data}} />}
      />
    );
  }
  if (props.componentName === MODAL_EXPENSE_ITEM_DELETE) {
    return (
      <Modal
        render={props => <DeleteExpenseItemFormContainer allProps={{...props, ...data}} />}
      />
    );
  }
  if (props.componentName === MODAL_COST_ADD) {
    return (
      <Modal
        render={props => <CostFormContainer allProps={{...props, ...data}} />}
      />
    );
  }
  if (props.componentName === MODAL_SUPPORT) {
    return (
      <Modal
        render={props => <ProfileLayout render={newProps => <Support props={{...newProps, ...props}} />} />}
      />
    );
  }
  if (props.componentName === MODAL_MAIN_MENU) {
    return (
      <Modal
        render={props => <MainMenu props={{...props}} />}
      />
    );
  }
  return (
    <Modal
      render={props => <>тут должны быть кнопки</>}
    />
  );
}