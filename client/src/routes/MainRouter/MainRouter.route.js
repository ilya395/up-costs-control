import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { Login, Main } from "../../layouts";
import { localAuthData } from "../../utils/classes/LocalAuthData.class";

export const MainRoter = () => {
  const [tokenInComponent, setTokenInComponent] = useState(localAuthData.getToken());
  const state = useSelector(state => state.auth);
  useEffect(() => {
    setTokenInComponent(localAuthData.getToken());
  }, []);
  return (
    <Switch>
      <Route path="/login">
        {
          tokenInComponent ?
            <Redirect to="/" /> :
            <Login />
        }
      </Route>
      <Route path="/" exact={true}>
        {
          !tokenInComponent ?
            <Redirect to="/login" /> :
            <Main />
        }
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}