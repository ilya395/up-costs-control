import React from "react";

export const Modal = props => {
  console.log(props)
  return (
    <div className="modal__wrap">
      <div className="modal__content">
        {/* <div className="modal__title">
          <h2>
            Добавить категорию
          </h2>
        </div>
        <div className="modal__field">
          1
        </div>
        <div className="modal__buttons">
          2
        </div> */}
        {
          props.render()
        }
      </div>
    </div>
  );
}