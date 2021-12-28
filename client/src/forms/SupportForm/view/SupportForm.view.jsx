import React from "react";

export const SupportFormView = props => {
  return (
    <form className="simple-form">
      <div className={"simple-form__form-field simple-form__form-field_row simple-form__form-field_little-row"}>
        <label className={"simple-text_main"}>
          Имя:
        </label>
        <span
          className={"simple-text_main form-field__simple-text"}
        >
          {props.data && props.data.name}
        </span>
      </div>
      <div className={"simple-form__form-field simple-form__form-field_row simple-form__form-field_little-row"}>
        <label className={"simple-text_main"}>
          Email:
        </label>
        <span
          className={"simple-text_main form-field__simple-text"}
        >
          {props.data && props.data.email}
        </span>
      </div>
      <div className="simple-form__form-field simple-form__form-field_row">
        <label htmlFor="description" className="simple-text_main">
          Описание:
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          className="simple-form__input simple-text_main"
          value={props.data.propblem}
          onChange={props.onChangeProblem}
        ></textarea>
      </div>
      <div className="simple-form__buttons-block">
        <button
          className="little-button simple-title_other"
          disabled={props.data.disableButton}
          onClick={props.onSubmit}
          aria-label={"Отправить сообщение в поддержку"}
        >
          Готово
        </button>
      </div>
    </form>
  );
}