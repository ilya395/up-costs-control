import React from "react";
import { Modal } from "../../components";
import { ExpenseItemFormModel } from "../../forms";

export const ModalContainer = () => {
  return (
    <Modal
      render={props => <ExpenseItemFormModel props={{...props}} />}
    />
  );
}