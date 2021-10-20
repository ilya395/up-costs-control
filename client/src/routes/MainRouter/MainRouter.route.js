import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Login, Main } from "../../layouts";

export const MainRoter = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/" exact={true}>
        <Main />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}