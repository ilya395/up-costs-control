import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ChangePassword, Logout, MyData } from "..";
import { transitionMode } from "../../constants";
import { modalClearAction } from "../../modules";
import { mainMenuChangePasswordAction, mainMenuListAction, mainMenuLogoutAction, mainMenuMyDataAction } from "../../modules/main-menu";
import { MainMenu } from "../MainMenu/MainMenu.component";

export const Profile = props => {

  const { profile } = props.props;

  const dispatch = useDispatch();

  const mainMenu = useSelector(state => state.mainMenu);
  // const open = useSelector(state => state.modal.open);
  // useEffect(() => {
  //   !open && dispatch(mainMenuListAction());
  // }, [open])

  const [mode, setMode] = useState(transitionMode.outIn);
  const [modeState, setModeState] = useState(true);
  useEffect(() => {
    if (!mainMenu.logout && !mainMenu.changePassword && !mainMenu.myData) {
      setModeState(true);
    } else {
      setModeState(false);
    }
  }, [mainMenu.logout, mainMenu.changePassword, mainMenu.myData])

  const onLogout = () => {
    dispatch(mainMenuLogoutAction());
  }

  const onChangePassword = () => {
    dispatch(mainMenuChangePasswordAction());
  }

  const onGetMyData = () => {
    dispatch(mainMenuMyDataAction());
  }

  return (
    <>
      {/* <CSSTransition
        in={mainMenu.logout || mainMenu.changePassword || mainMenu.myData}
        timeout={400}
        classNames={{
          enterActive: "block-show",
          exitActive: "block-hide",
        }}
        mountOnEnter
        unmountOnExit
      >
      </CSSTransition> */}
      <h2>
        {
          (!mainMenu.logout && !mainMenu.changePassword && !mainMenu.myData) ?
          (profile ? `${profile.shortName} ${profile.surname}` : "... ...") :
          (
            (mainMenu.logout && "Выход") ||
            (mainMenu.changePassword && "Смена пароля") ||
            (mainMenu.myData && "Мои данные")
          )
        }
      </h2>
      <div className="support-container">
        {/* <SwitchTransition
          mode={mode}
        >
          <CSSTransition
            key={modeState}
            classNames={{
              enterActive: "block-show",
              exitActive: "block-hide",
            }}
            timeout={400}
            // addEndListener={(node, done) => node.addEventListener("animationend", done, false)}
            unmountOnExit
            mountOnEnter
          >
            <MainMenu
              profile={profile}
              onLogout={onLogout}
              onChangePassword={onChangePassword}
              onGetMyData={onGetMyData}
            />
          </CSSTransition>
        </SwitchTransition> */}
        {
          (!mainMenu.logout && !mainMenu.changePassword && !mainMenu.myData) &&
          <MainMenu
            profile={profile}
            onLogout={onLogout}
            onChangePassword={onChangePassword}
            onGetMyData={onGetMyData}
          />
        }

        <CSSTransition
          in={mainMenu.logout}
          timeout={400}
          classNames={{
            enterActive: "block-show",
            exitActive: "block-hide",
          }}
          mountOnEnter
          unmountOnExit
        >
          <Logout />
        </CSSTransition>

        <CSSTransition
          in={mainMenu.changePassword}
          timeout={400}
          classNames={{
            enterActive: "block-show",
          }}
          mountOnEnter
          unmountOnExit
        >
          <ChangePassword />
        </CSSTransition>
        <CSSTransition
          in={mainMenu.myData}
          timeout={400}
          classNames={{
            enterActive: "block-show",
          }}
          mountOnEnter
          unmountOnExit
        >
          <MyData profile={profile} />
        </CSSTransition>
        {
          // mainMenu.logout && <Logout />
        }
        {
          // mainMenu.changePassword && <ChangePassword />
        }
        {
          // mainMenu.myData && <MyData profile={profile} />
        }
      </div>
    </>
  );
}