import React, { useRef, useState, useEffect } from "react";
import { buttonColors } from "../../../constants";

export const ExpenseItemFormView = props => {

  const { disabled } = props;

  const [editMode, setEditMode] = useState(props.data && props.data.id ? true : false);

  const [visibleNameField, setVisibleNameField] = useState(props.data && props.data.name ? true : false);

  const [nameValue, setNameValue] = useState(props.data && props.data.name ? props.data.name : "");
  const nameInput = useRef(null);

  const [colorValue, setColorValue] = useState(props.data && props.data.color ? props.data.color : buttonColors.values().next().value);

  useEffect(() => {
    if (!visibleNameField) {
      nameInput.current.focus();
    }
  }, [visibleNameField]);
  const onChangeNameField = event => {
    setNameValue(event.target.value);
  }
  const onChangeColorField = event => {
    setColorValue(event.target.value);
  }
  const clickOnTextField = () => {
    setVisibleNameField(false);
  }
  const clickOnInputField = () => {
    if (editMode) {
      setVisibleNameField(true);
    }
  }

  const getColorButtons = () => {
    const array = [];
    buttonColors.forEach(item => {
      const arg = (
        <div className="form-field__list-item" key={item}>
          <input
            type="radio"
            id={item}
            name="color"
            value={item}
            className="form-field__radio-input"
            checked={item === colorValue}
            onChange={onChangeColorField}
          />
          <label htmlFor={item} className="form-field__radio-label" style={{backgroundColor: item}}></label>
        </div>
      );
      array.push(arg);
    });
    return array;
  }

  const onCancel = () => {
    props.onCancel();
  }

  const onChange = event => {
    event.preventDefault();
    if (editMode) {
      props.onChange({
        ...props.data,
        name: nameValue,
        color: colorValue,
      });
    } else {
      props.onAdd({
        name: nameValue,
        color: colorValue,
      });
    }
  }

  return (
    <div className="simple-form__outer-wrapper">
      {
        editMode ?
          <h2>
            Изменить категорию<br />
            "{props.data.name}"
          </h2> :
          <h2>
            Добавить категорию
          </h2>
      }
      <form className="simple-form">
        <div className="simple-form__form-field simple-form__form-field_row">
          <label className="simple-text_main" htmlFor="name">Название:</label>
            <span
              className="simple-text_main form-field__simple-text"
              onClick={clickOnTextField}
              style={{display: visibleNameField ? "block" : "none"}}
            >
              {props.data && props.data.name ? props.data.name : "?"}
            </span>
            <input
              type="text"
              className="simple-form__input simple-text_main"
              style={{display: visibleNameField ? "none" : "block"}}
              id="name"
              name="name"
              placeholder={"Название статьи расходов"}
              onChange={onChangeNameField}
              onBlur={clickOnInputField}
              value={nameValue}
              ref={nameInput}
            />
        </div>
        <div className="simple-form__form-field simple-form__form-field_column">
          <div className="simple-text_main">Цвет:</div>
          <div className="form-field__list-wrapper">
            <div className="form-field__list">
              {
                getColorButtons()
              }
            </div>
          </div>
        </div>
        <div className="simple-form__buttons-block">
          <button
            className="little-button_opacity simple-title_other"
            onClick={onCancel}
          >
            Отмена
          </button>
          <button
            className="little-button simple-title_other"
            onClick={onChange}
            disabled={disabled}
          >
            Готово
          </button>
        </div>
      </form>
    </div>
    );
}