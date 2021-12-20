import React, { useContext, useState } from "react";
import { ModalContext } from "../../context";

export const SimpleFormFieldColumn = props => {
  const { ident, label, value: val, type = "text", getValue } = props;

  const [value, setValue] = useState(val);

  const onChange = event => {
    setValue(event.target.value);
    getValue(event.target.value);
  }

  const modalContext = useContext(ModalContext);

  const onFocus = () => modalContext.setUiFocusing(true);

  const onBlur = () => modalContext.setUiFocusing(false);

  return (
    <div className="simple-form__form-field simple-form__form-field_column">
      <label htmlFor={ident} className="simple-text_main">
        {label}:
      </label>
      <div className="form-field__list-wrapper">
        <input
          type={type}
          className="simple-form__input simple-form__input_all-width simple-text_main"
          id={ident}
          name={ident}
          value={value}
          onChange={onChange}
          required={true}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}