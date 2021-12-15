import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { PreloaderContainer } from "../../components";
// import { Login, Main } from "../../layouts";
import { localAuthData } from "../../utils/classes/LocalAuthData.class";

const Login = lazy(() => import("../../layouts/Login/Login.layout"));
const Main = lazy(() => import("../../layouts/Main/Main.layout"));
console.log(Login)
console.log(Main)

export const MainRoter = () => {
  console.log("MainRoter")
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
          {
            // tokenInComponent ?
            //   <Redirect to="/" /> :
            //   <Suspense><LoginComponent /></Suspense>
          }
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
          {
            // !tokenInComponent ?
            //   <Redirect to="/login" /> :
            //   <Suspense><MainComponent /></Suspense>
          }
        </Route>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}