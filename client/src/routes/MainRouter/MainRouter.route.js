import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { Login, Main } from "../../layouts";
import { localToken } from "../../utils/classes/LocalToken.class";

export const MainRoter = () => {
  const [tokenInComponent, setTokenInComponent] = useState(localToken.getToken());
  const state = useSelector(state => state.auth);
  useEffect(() => {
    setTokenInComponent(localToken.getToken());
  }, [state]);
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