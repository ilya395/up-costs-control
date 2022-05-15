import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MonthPicker, NavBar } from "../../components";
import { ExpenseItemsListContainer } from "../../containers";
import { ModalContainer } from "../../containers/ModalContainer/ModalContainer.container";
import s from "./Main.module.scss";
import { Transition } from 'react-transition-group';
import { modalClearAction, modalCloseAction, modalComponentSelector, modalDataSelector, modalOpenSelector } from "../../modules";
import { mainMenuListAction } from "../../modules/main-menu";
import { ScrollControllerContext } from "../../context";
import CostsList from "../../components/CostsList/CostsList.component";
import { useHistory } from "react-router-dom";

const Main = (props) => {

  const { mainPage = true, } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const openModal = useSelector(modalOpenSelector);
  const componentNameModel = useSelector(modalComponentSelector);
  const dataModal = useSelector(modalDataSelector);

  const scrollController = useContext(ScrollControllerContext);

  const closeModal = () => {
    dispatch(modalCloseAction());
  }

  return (
    <div className="container" style={{touchAction: scrollController.scroll ? "auto" : "none"}}>
      <main className={s["main-content-section"]}>
        <div className={s["main-content-section__title"]}>
          <h1>
            Мои расходы
          </h1>
        </div>
        {
          !mainPage &&
          <div className={s["main-content-section__monthspicker"]}>
            <button onClick={() => history.push("/")}>назад</button>
          </div>
        }
        <div className={s["main-content-section__monthspicker"]}>
          <MonthPicker />
        </div>
        <div className={s["main-content-section__expense-items-list"]}>
          {
            mainPage ?
              <ExpenseItemsListContainer /> :
              <CostsList />
          }
        </div>
        <div className={s["main-content-section__nav-bar"]}>
          <NavBar />
        </div>
      </main>
      <Transition
        in={openModal}
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
                            componentName={componentNameModel}
                            data={dataModal}
                            closeModal={closeModal}
                          />
                        </div>
        }
      </Transition>
    </div>
  );
}

export default Main;