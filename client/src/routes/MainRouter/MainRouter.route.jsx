import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { PreloaderContainer } from "../../components";
import { localAuthData } from "../../utils/classes/LocalAuthData.class";

const Login = lazy(() => import("../../layouts/Login/Login.layout"));
const Main = lazy(() => import("../../layouts/Main/Main.layout"));

export const MainRoter = () => {

  const [tokenInComponent, setTokenInComponent] = useState(localAuthData.getToken());

  const state = useSelector(state => state.auth);

  useEffect(() => {
    setTokenInComponent(localAuthData.getToken());
  }, [state]);

  return (
    <Suspense fallback={<PreloaderContainer />}>
      <Switch>
        <Route
          path="/login"
          render={() => {
            return tokenInComponent ?
              <Redirect to="/" /> :
              <Login />
          }}
        >
        </Route>
        <Route
          path="/"
          exact={true}
          render={() => {
            return !tokenInComponent ?
              <Redirect to="/login" /> :
              <Main />
          }}
        >
        </Route>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}