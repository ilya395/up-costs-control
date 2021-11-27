import React, { useEffect, useRef, useState } from "react";

export const ChangePassword = () => {

  const [shortNameValue, setShortNameValue] = useState("1");
  const [visibleShortName, setVisibleShortName] = useState(true);
  const shortNameRef = useRef(null);
  useEffect(() => {
    if (visibleShortName) {
      shortNameRef.current.focus();
    }
  }, [visibleShortName])
  const clickOnShortName = () => {
    setVisibleShortName(false);
  }
  const onChangeShortName = event => {
    setShortNameValue(event.target.value);
  }
  const onBlurShortName = () => {
    setVisibleShortName(true);
  }

  return (
    <form className="simple-form">
      <div className="simple-form__form-field simple-form__form-field_row">
        <label htmlFor="shortName" className="simple-text_main">
          Имя:
        </label>
        <span
          className="simple-text_main form-field__simple-text"
          style={{display: visibleShortName ? "block" : "none"}}
          onClick={clickOnShortName}
        >
          {shortNameValue}
        </span>
        <input
          type="text"
          className="simple-form__input simple-text_main"
          id="shortName"
          name="shortName"
          style={{display: visibleShortName ? "none" : "block"}}
          value={shortNameValue}
          ref={shortNameRef}
          onChange={onChangeShortName}
          onBlur={onBlurShortName}
        />
      </div>
    </form>
  );
}