import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoter } from './routes';
import cn from "classnames";
import s from "./App.scss";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <MainRoter />
      </BrowserRouter>
    </>
  );
}

export default App;