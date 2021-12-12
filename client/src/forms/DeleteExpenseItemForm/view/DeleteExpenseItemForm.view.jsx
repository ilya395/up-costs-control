import React from "react";

export const DeleteExpenseItemFormView = props => {

  const { disabled } = props;

  const clickHandler = event => {
    event.preventDefault();
    props.onDelete()
  }

  return (
    <>
      <div className="simple-form__outer-wrapper">
        <h2>
          Удалить категорию
        </h2>
        <form className="simple-form">
          <div className="simple-form__form-field simple-form__form-field_row">
            <div className="simple-text_main">
            Вы уверены, что хотите удалить категорию “{props.name}”? Все расходы категории за все месяцы так же будут удалены
            </div>
          </div>
          <div className="simple-form__buttons-block">
            <button
              className="big-button simple-title_other"
              onClick={clickHandler}
              disabled={disabled}
            >
              Да, удалить
            </button>
          </div>
        </form>
      </div>
    </>
  );
}