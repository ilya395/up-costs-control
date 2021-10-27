import React from "react";

export const ExpenseItemFormView = () => {
  return (
    <form className="simple-form">
      <div className="simple-form__form-field simple-form__form-field_row">
        <label className="simple-text_main" htmlFor="name">Название:</label>
        {/* <input type="text" className="simple-form__input simple-text_main" id="name" name="name" /> */}
        <span className="simple-text_main form-field__simple-text">Образование. На себя. Образование. На себя.</span>
      </div>
      <div className="simple-form__form-field simple-form__form-field_row">
        <label className="simple-text_main" htmlFor="name">Название:</label>
        <div className="form-field__list">

        </div>
      </div>
    </form>
    );
}