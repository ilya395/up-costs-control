import React, { useEffect, useState } from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { NOTIFICATION_WARNING } from "../../constants";
import { notificationMessageAction, setUserDataAction } from "../../modules";
import { cheekiBreekiValidator, localAuthData } from "../../utils";
import { SimpleFormFieldColumn } from "../SimpleFormFieldColumn/SimpleFormFieldColumn.component";

export const ChangePassword = memo(() => {

  const dispatch = useDispatch();

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
  }, [newPasswordValue, confirmationPassword]);

  const validateData = data => {
    let result = true;
    if (!cheekiBreekiValidator.checkPassword(data.new) && !cheekiBreekiValidator.checkPassword(data.confirmation)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните пароли!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    return result;
  }

  const onSubmit = event => {
    event.preventDefault();
    if (confirmationPassword === newPasswordValue && newPasswordValue && confirmationPassword) {
      if (
        !validateData({
          new: newPasswordValue,
          confirmation: confirmationPassword,
        })
      ) {
        return;
      }
      dispatch(setUserDataAction({
        id: localAuthData.getUserId(),
        password: confirmationPassword,
      }));
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
});