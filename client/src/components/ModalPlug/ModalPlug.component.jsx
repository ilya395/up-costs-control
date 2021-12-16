import React from "react";

export const ModalPlug = ({ text = "Данные загружаются..." }) => {
  return (
    <div className="simple-form__outer-wrapper">
      <h2>
        {text}
      </h2>
    </div>
  );
}