import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoter } from './routes';
import cn from "classnames";
import s from "./App.scss";
import { Notification, PreloaderContainer } from './components';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MainRoter />
      </BrowserRouter>
      <Notification />
      <PreloaderContainer />
    </>
  );
}

export default App;