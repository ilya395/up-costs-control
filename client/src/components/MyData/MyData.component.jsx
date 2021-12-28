import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { SimpleFormFieldRow } from "..";
import { NOTIFICATION_WARNING } from "../../constants";
import { notificationMessageAction, setUserDataAction } from "../../modules";
import { cheekiBreekiValidator, localAuthData, strangeNumber } from "../../utils";

const MyData = memo(props => {

  const { profile } = props;

  const dispatch = useDispatch();

  const [newShortName, setNewShortName] = useState(null);
  const getShortName = data => {
    setNewShortName(data);
    activeButton && setActiveButton(false);
  }

  const [newSurname, setNewSurname] = useState(null);
  const getSurname = data => {
    setNewSurname(data);
    activeButton && setActiveButton(false);
  }

  const [newEmail, setNewEmail] = useState(null);
  const getEmail = data => {
    setNewEmail(data);
    activeButton && setActiveButton(false);
  }

  const [newPhone, setNewPhone] = useState(null);
  const getPhone = data => {
    setNewPhone(data);
    activeButton && setActiveButton(false);
  }

  const [activeButton, setActiveButton] = useState(true);

  useEffect(() => {
    if (
      profile &&
      (profile.surname === newSurname || newSurname === null) &&
      (profile.shortName === newShortName || newShortName === null) &&
      (profile.email === newEmail || newEmail === null) &&
      (profile.phone === newPhone || newPhone === null)
    ) {
      setActiveButton(true);
    }
  }, [newShortName, newSurname, newEmail, newPhone]);

  const validateData = data => {
    let result = true;
    if (data.surname && !cheekiBreekiValidator.checkName(data.surname)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните фамилию!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    if (data.shortName && !cheekiBreekiValidator.checkName(data.shortName)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните имя!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    if (data.email && !cheekiBreekiValidator.checkEmail(data.email)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните email!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    if (data.phone && !cheekiBreekiValidator.checkPhone(data.phone)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните телефон!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    return result;
  }

  const onSubmit = event => {
    event.preventDefault();
    const data = {}
    if (profile.surname !== newSurname && newSurname) {
      data.surname = newSurname;
    }
    if (profile.shortName !== newShortName && newShortName) {
      data.shortName = newShortName;
    }
    if (profile.email !== newEmail && newEmail) {
      data.email = newEmail;
    }
    if (strangeNumber(profile.phone) !== newPhone && newPhone) {
      data.phone = newPhone;
    }
    if (Object.entries(data).length > 0) {
      data.id = localAuthData.getUserId();
      // валидация
      if (!validateData(data)) {
        return;
      }
      dispatch(setUserDataAction(data));
    } else {
      dispatch(notificationMessageAction({
        message: "Нет изменений в данных!",
        notificationType: NOTIFICATION_WARNING,
      }));
    }
  }

  return (
    <CSSTransition
      in={props.active}
      timeout={400}
      classNames={{
        enterActive: "block-show",
      }}
      mountOnEnter
      unmountOnExit
    >
      <form className="simple-form">
        <SimpleFormFieldRow
          ident={"shortName"}
          label={"Имя"}
          value={profile && profile.shortName}
          getValue={getShortName}
        />
        <SimpleFormFieldRow
          ident={"surname"}
          label={"Фамилия"}
          value={profile && profile.surname}
          getValue={getSurname}
        />
        <SimpleFormFieldRow
          ident={"email"}
          label={"Email"}
          value={profile && profile.email}
          getValue={getEmail}
          type={"email"}
        />
        <SimpleFormFieldRow
          ident={"phone"}
          label={"Телефон"}
          value={profile && profile.phone}
          getValue={getPhone}
          type={"tel"}
        />
        <div className="simple-form__buttons-block">
          <button
            className="little-button simple-title_other"
            disabled={activeButton}
            onClick={onSubmit}
            aria-label={"Сохранить новые данные"}
          >
            Сохранить
          </button>
        </div>
      </form>
    </CSSTransition>
  );
});

export default MyData;