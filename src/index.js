import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import configureStore from "./store/store";


import App from "./scene/App.js";

const rootElement = document.getElementById('root');
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);


module.hot.accept();