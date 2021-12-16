import React, { useState } from "react";

export const SimpleFormFieldColumn = props => {
  const { ident, label, value: val, type = "text", getValue } = props;

  const [value, setValue] = useState(val);

  const onChange = event => {
    setValue(event.target.value);
    getValue(event.target.value);
  }
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
        />
      </div>
    </div>
  );
}