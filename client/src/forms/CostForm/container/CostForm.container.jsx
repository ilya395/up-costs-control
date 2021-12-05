import React from "react";
import { useDispatch } from "react-redux";
import { CostFormView } from "..";
import { addCostsAction, modalClearAction, modalCloseAction } from "../../../modules";


export const CostFormContainer = props => {

  const { allProps } = props

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(modalCloseAction());
    dispatch(modalClearAction());
  }

  const onSave = data => {
    dispatch(addCostsAction(data));
  }

  return (
    <CostFormView
      props={{...allProps}}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
}