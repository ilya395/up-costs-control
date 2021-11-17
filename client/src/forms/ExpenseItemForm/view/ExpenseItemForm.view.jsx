import React, { useRef, useState, useEffect } from "react";
import { buttonColors } from "../../../constants";

export const ExpenseItemFormView = props => {
  console.log("ExpenseItemFormView: ", props)
  const [editMode, setEditMode] = useState(props.data ? true : false);
  const [visibleNameField, setVisibleNameField] = useState(props.data && props.data.name ? true : false);
  const [nameValue, setNameValue] = useState(props.data && props.data.name ? props.data.name : "");
  const nameInput = useRef(null);
  useEffect(() => {
    if (!visibleNameField) {
      nameInput.current.focus();
    }
  }, [visibleNameField])
  const onChangeNameField = (event) => {
    setNameValue(event.target.value);
  }
  const clickOnField = () => {
    console.log("click")
    setVisibleNameField(false);
  }
  // console.log(props)
  const getButtons = () => {
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
          />
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
          <span
            className="simple-text_main form-field__simple-text"
            onClick={clickOnField}
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
            onBlur={() => setVisibleNameField(true)}
            value={nameValue}
            ref={nameInput}
          />
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