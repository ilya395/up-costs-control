import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MonthPicker, NavBar } from "../../components";
import { ExpenseItemsListContainer } from "../../containers";
import { ModalContainer } from "../../containers/ModalContainer/ModalContainer.container";
import s from "./Main.module.scss";
import { Transition } from 'react-transition-group';
import { modalClearAction, modalCloseAction } from "../../modules";
import { mainMenuListAction } from "../../modules/main-menu";

const Main = () => {

  const dispatch = useDispatch();

  const modal = useSelector(state => state.modal);

  const closeModal = () => {
    dispatch(modalCloseAction());
  }

  return (
    <div className="container">
      <main className={s["main-content-section"]}>
        <div className={s["main-content-section__title"]}>
          <h1>
            Мои расходы
          </h1>
        </div>
        <div className={s["main-content-section__monthspicker"]}>
          <MonthPicker />
        </div>
        <div className={s["main-content-section__expense-items-list"]}>
          <ExpenseItemsListContainer />
        </div>
        <div className={s["main-content-section__nav-bar"]}>
          <NavBar />
        </div>
      </main>
      <Transition
        in={modal && modal.open}
        timeout={600}
        mountOnEnter
        unmountOnExit
        onExited={() => {
          dispatch(modalClearAction());
          dispatch(mainMenuListAction());
        }}
      >
        {
          classState => <div className={`modal__outer-wrap ${classState}`}>
                          <ModalContainer
                            componentName={modal.componentName}
                            data={modal.data}
                            closeModal={closeModal}
                          />
                        </div>
        }
      </Transition>
    </div>
  );
}

export default Main;