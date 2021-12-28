import React, { lazy, Suspense } from "react";
import { Modal, ModalPlug } from "../../components";
import { MODAL_COST_ADD, MODAL_EXPENSE_ITEM_ADD, MODAL_EXPENSE_ITEM_DELETE, MODAL_EXPENSE_ITEM_EDIT, MODAL_MAIN_MENU, MODAL_SUPPORT } from "../../modules/modal";

const ExpenseItemFormContainer = lazy(() => import("../../forms/ExpenseItemForm"));
const DeleteExpenseItemFormContainer = lazy(() => import("../../forms/DeleteExpenseItemForm"));
const CostFormContainer = lazy(() => import("../../forms/CostForm"));
const Support = lazy(() => import("../../components/Support/Support.component"));
const ProfileLayout = lazy(() => import("../../layouts/Profile/Profile.layout"));
const Profile = lazy(() => import("../../components/Profile/Profile.component"));

export const ModalContainer = props => {

  const { data, closeModal } = props;

  if (
    props.componentName === MODAL_EXPENSE_ITEM_ADD ||
    props.componentName === MODAL_EXPENSE_ITEM_EDIT
  ) {
    return (
      <Suspense fallback={<ModalPlug />}>
        <Modal
          closeModal={closeModal}
          render={props => <ExpenseItemFormContainer allProps={{...props, ...data}} />}
        />
      </Suspense>
    );
  }
  if (props.componentName === MODAL_EXPENSE_ITEM_DELETE) {
    return (
      <Suspense fallback={<ModalPlug />}>
        <Modal
          closeModal={closeModal}
          render={props => <DeleteExpenseItemFormContainer allProps={{...props, ...data}} />}
        />
      </Suspense>
    );
  }
  if (props.componentName === MODAL_COST_ADD) {
    return (
      <Suspense fallback={<ModalPlug />}>
        <Modal
          closeModal={closeModal}
          render={props => <CostFormContainer allProps={{...props, ...data}} />}
        />
      </Suspense>
    );
  }
  if (props.componentName === MODAL_SUPPORT) {
    return (
      <Suspense fallback={<ModalPlug />}>
        <Modal
          closeModal={closeModal}
          render={props => <ProfileLayout props={{...props}} render={newProps => <Support {...newProps} />} />}
        />
      </Suspense>
    );
  }
  if (props.componentName === MODAL_MAIN_MENU) {
    return (
      <Suspense fallback={<ModalPlug />}>
        <Modal
          closeModal={closeModal}
          render={props => <ProfileLayout props={{...props}} render={newProps => <Profile {...newProps} />} />}
        />
      </Suspense>
    );
  }
  return (
    <Modal
      closeModal={closeModal}
      render={props => <ModalPlug {...props} text={""} />}
    />
  );
}