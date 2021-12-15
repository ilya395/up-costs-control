import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import "./public/manifest.json";

import { store } from "./store";

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

window.addEventListener("load", async () => {
  if (navigator.serviceWorker) {
    try {
      const worker = await navigator.serviceWorker.register("./main.sw.js");
    } catch(e) {
      console.log("ServiceWorker is bad :(")
    }
  }
});