import React from "react";
import { buttonColors } from "../../../constants";

export const ExpenseItemFormView = () => {
  const getButtons = () => {
    const array = [];
    buttonColors.forEach(item => {
      const arg = (
        <div className="form-field__list-item" key={item}>
          <input type="radio" id={item} name="color" value={item} className="form-field__radio-input" />
          <label htmlFor={item} className="form-field__radio-label" style={{backgroundColor: item}}></label>
        </div>
      );
      array.push(arg);
    });
    return array;
  }
  return (
    <form className="simple-form">
      <div className="simple-form__form-field simple-form__form-field_row">
        <label className="simple-text_main" htmlFor="name">Название:</label>
        <input type="text" className="simple-form__input simple-text_main" id="name" name="name" />
        {/* <span className="simple-text_main form-field__simple-text">Образование. На себя. Образование. На себя.</span> */}
      </div>
      <div className="simple-form__form-field simple-form__form-field_column">
        <div className="simple-text_main">Цвет:</div>
        <div className="form-field__list-wrapper">
          <div className="form-field__list">
            {
              getButtons()
            }
          </div>
        </div>
      </div>
    </form>
    );
}