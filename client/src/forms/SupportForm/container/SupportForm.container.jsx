import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NOTIFICATION_WARNING } from "../../../constants";
import { notificationMessageAction } from "../../../modules";
import { pushMessageToSupportAction } from "../../../modules/support";
import { cheekiBreekiValidator } from "../../../utils";
import { SupportFormView } from "../view/SupportForm.view";

export const SupportFormContainer = props => {
  // console.log(props)

  const { profile } = props;

  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: null,
    email: null,
    problem: null,
    disableButton: true,
  });

  useEffect(() => {
    setData({
      ...data,
      name: profile && `${profile.shortName} ${profile.surname}`,
      email: profile && profile.email,
    });
  }, [profile]);

  const onChangeProblem = event => {

    const value = event.target.value;

    setData({
      ...data,
      problem: value,
    });

  }

  useEffect(() => {
    data.problem && data.problem.length > 0 ?
      setData({
        ...data,
        disableButton: false,
      }) :
      setData({
        ...data,
        disableButton: true,
      })
  }, [data.problem]);

  const onSubmit = event => {
    event.preventDefault();
    if (!cheekiBreekiValidator.checkText(data.problem)) {
      return dispatch(notificationMessageAction({
        message: "Корректно заполните поле!",
        notificationType: NOTIFICATION_WARNING
      }));
    }
    dispatch(pushMessageToSupportAction({problem: data.problem}));
  }

  return (
    <SupportFormView
      data={data}
      onChangeProblem={onChangeProblem}
      onSubmit={onSubmit}
    />
  );
}