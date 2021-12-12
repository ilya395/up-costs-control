import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoter } from './routes';
import cn from "classnames";
import s from "./App.scss";
import { Notification } from './components';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <MainRoter />
      </BrowserRouter>
      <Notification />
    </>
  );
}

export default App;