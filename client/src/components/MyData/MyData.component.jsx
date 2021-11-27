import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SimpleFormFieldRow } from "..";
import { setUserDataAction } from "../../modules";
import { localAuthData, strangeNumber } from "../../utils";

export const MyData = props => {
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
      (profile.surname === newSurname || newSurname === null) &&
      (profile.shortName === newShortName || newShortName === null) &&
      (profile.email === newEmail || newEmail === null) &&
      (profile.phone === newPhone || newPhone === null)
    ) {
      setActiveButton(true);
    }
  }, [newShortName, newSurname, newEmail, newPhone]);



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
      console.log("save")
      data.id = localAuthData.getUserId();
      dispatch(setUserDataAction(data));
    } else {
      console.log("not changes")
    }
  }

  return (
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
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}