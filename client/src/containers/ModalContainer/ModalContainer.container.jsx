import React from "react";
import { AddCost, MainMenu, Modal, Support } from "../../components";
import { ExpenseItemFormContainer } from "../../forms";
import { MODAL_COST_ADD, MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_DELETE, MODAL_EXPENSE_ITEM_EDIT, MODAL_SUPPORT } from "../../modules/modal";

export const ModalContainer = props => {
  // const whatComponentWeNeed = ({ componentName, props }) => {
  //   switch (componentName) {
  //     case MODAL_EXPENSE_ITEM_ADD:
  //       return props => <ExpenseItemFormContainer props={{...props}}
  //   }
  // }
  const { data } = props;
  if (
    props.componentName === MODAL_EXPENSE_ITEM_ADD ||
    props.componentName === MODAL_EXPENSE_ITEM_EDIT ||
    props.componentName === MODAL_EXPENSE_ITEM_DELETE
  ) {
    return (
      <Modal
        render={props => <ExpenseItemFormContainer allProps={{...props, ...data}} />}
      />
    );
  }
  if (props.componentName === MODAL_COST_ADD) {
    return (
      <Modal
        render={props => <AddCost props={{...props}} />}
      />
    );
  }
  if (props.componentName === MODAL_SUPPORT) {
    return (
      <Modal
        render={props => <Support props={{...props}} />}
      />
    );
  }
  return (
    <Modal
      render={props => <MainMenu props={{...props}} />}
    />
  );
}