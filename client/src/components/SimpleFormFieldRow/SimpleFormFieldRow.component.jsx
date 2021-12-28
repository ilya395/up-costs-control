import React, { useEffect, useRef, useState } from "react";
import { strangeNumber } from "../../utils";
import cn from "classnames";

export const SimpleFormFieldRow = props => {

  const { ident, label, value: val, getValue, type = "text" } = props;

  const [value, setValue] = useState(val ? strangeNumber(type, val) : null);

  const [visibleValue, setVisibleValue] = useState(true);

  const valueRef = useRef(null);

  useEffect(() => {
    if (!visibleValue) {
      valueRef.current.focus();
    }
  }, [visibleValue]);

  const clickOnValue = () => {
    setVisibleValue(false);
  }

  const onChangeValue = event => {
    const data = event.target.value;
    if (type === "tel") {
      setValue(strangeNumber(type, data));
      getValue(strangeNumber(type, data))
    } else {
      setValue(data);
      getValue(data);
    }
  }

  const onBlurValue = () => {
    setVisibleValue(true);
  }

  const phoneMask = value => {
    return `${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5, 8)}-${value.substring(8, 10)}-${value.substring(10, value.length)}`
  }

  return (
    <div className="simple-form__form-field simple-form__form-field_row simple-form__form-field_little-row">
      <label htmlFor={ident} className={cn("simple-text_main")}>
        {label}:
      </label>
      <span
        className={cn("simple-text_main", "form-field__simple-text", {"simple-text_gray": value ? false : true})}
        style={{display: visibleValue ? "block" : "none"}}
        onClick={clickOnValue}
      >
        {value ? (type === "tel" ? phoneMask(value) : value) :  "Данные для ввода"}
      </span>
      <input
        type={type}
        className="simple-form__input simple-text_main"
        id={ident}
        name={ident}
        style={{display: visibleValue ? "none" : "block"}}
        value={
          value ? (type === "tel" ? phoneMask(value) : value) : ""
        }
        ref={valueRef}
        onChange={onChangeValue}
        onBlur={onBlurValue}
        required={true}
      />
    </div>
  );
}