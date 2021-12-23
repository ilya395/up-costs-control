import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoter } from './routes';
import cn from "classnames";
import s from "./App.scss";
import { Notification, PreloaderContainer } from './components';
import { ScrollControllerContext } from './context';
import { useScrollController } from './hooks';

const App = () => {

  const { scroll, setScroll } = useScrollController();

  return (
    <>
      <ScrollControllerContext.Provider
        value={{scroll, setScroll}}
      >
        <BrowserRouter>
          <MainRoter />
        </BrowserRouter>
        <Notification />
        <PreloaderContainer />
      </ScrollControllerContext.Provider>
    </>
  );
}

export default App;