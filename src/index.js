import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import middleWare from "./scene/store/middleWare";
import reducer from "./scene/store/resultsReducer";

import App from "./scene/App.js";

const store = createStore(reducer, middleWare);
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);


module.hot.accept();