import React from "react";
import { useDispatch } from "react-redux";
import { CostFormView } from "..";
import { addCostsAction } from "../../../modules/costs/store/actions/action-creators/costs.action-creator";
import { modalCloseAction } from "../../../modules/modal/store/actions/action-creators/modal.action-creator";

export const CostFormContainer = props => {

  const { allProps } = props

  const dispatch = useDispatch();
  // const state = useSelector(state => state.state);

  const onCancel = () => {
    dispatch(modalCloseAction());
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