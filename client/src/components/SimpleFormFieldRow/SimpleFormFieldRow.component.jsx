import React, { useEffect, useRef, useState } from "react";
import { strangeNumber } from "../../utils";

export const SimpleFormFieldRow = props => {

  const { ident, label, value: val, getValue, type = "text" } = props;

  const [value, setValue] = useState(strangeNumber(type, val));

  const [visibleValue, setVisibleValue] = useState(true);
  const valueRef = useRef(null);
  useEffect(() => {
    if (!visibleValue) {
      valueRef.current.focus();
    }
  }, [visibleValue])
  const clickOnValue = () => {
    setVisibleValue(false);
  }
  const onChangeValue = event => {
    const data = event.target.value;
    setValue(data);
    getValue(data);
  }
  const onBlurValue = () => {
    setVisibleValue(true);
  }

  return (
    <div className="simple-form__form-field simple-form__form-field_row simple-form__form-field_little-row">
      <label htmlFor={ident} className="simple-text_main">
        {label}:
      </label>
      <span
        className="simple-text_main form-field__simple-text"
        style={{display: visibleValue ? "block" : "none"}}
        onClick={clickOnValue}
      >
        {value}
      </span>
      <input
        type={type}
        className="simple-form__input simple-text_main"
        id={ident}
        name={ident}
        style={{display: visibleValue ? "none" : "block"}}
        value={value}
        ref={valueRef}
        onChange={onChangeValue}
        onBlur={onBlurValue}
        required={true}
      />
    </div>
  );
}