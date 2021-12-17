import React, { useState } from "react";
import cn from "classnames";
import { ModalContext } from "../../context";

export const Modal = props => {

  const [focusing, setFocusing] = useState(false);

  const closeHandler = () => {
    props.closeModal();
  }

  return (
    <ModalContext.Provider
      value={{focusing, setFocusing}}
    >
      <div className={cn("modal__wrap", {"focusing": focusing})}>
        <div className="modal__content">
          <div className="modal__upper-panel">
            <button className="upper-panel__row" onClick={closeHandler}>
              <svg width="44" height="10" viewBox="0 0 44 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 10L43.6506 0.25H0.349365L22 10Z" fill="#DADADA"/>
              </svg>
            </button>
          </div>
          {
            props.render()
          }
        </div>
      </div>
    </ModalContext.Provider>
  );
}