import React, { useEffect, useState } from "react";
import { SimpleFormFieldColumn } from "../SimpleFormFieldColumn/SimpleFormFieldColumn.component";

export const ChangePassword = () => {

  const [newPasswordValue, setNewPasswordValue] = useState("");
  const getNewPasswordValue = data => {
    setNewPasswordValue(data);
  }

  const [confirmationPassword, setConfirmationPassword] = useState("");
  const getConfirmationValue = data => {
    setConfirmationPassword(data)
  }

  const [activeButton, setActiveButton] = useState(true);
  useEffect(() => {
    if (confirmationPassword === newPasswordValue && newPasswordValue && confirmationPassword) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
  }, [newPasswordValue, confirmationPassword])

  const onSubmit = event => {
    event.preventDefault();
    if (confirmationPassword === newPasswordValue && newPasswordValue && confirmationPassword) {
      console.log("go")
    }
  }

  return (
    <form className="simple-form">
      <SimpleFormFieldColumn
        ident={"newPassword"}
        label={"Введите новый пароль"}
        value={newPasswordValue}
        getValue={getNewPasswordValue}
        type={"password"}
      />
      <SimpleFormFieldColumn
        ident={"confirmationPassword"}
        label={"Повторите новый пароль"}
        value={confirmationPassword}
        getValue={getConfirmationValue}
        type={"password"}
      />
      <div className="simple-form__buttons-block">
        <button
          className="little-button simple-title_other"
          disabled={activeButton}
          onClick={onSubmit}
        >
          Готово
        </button>
      </div>
    </form>
  );
}