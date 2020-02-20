import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWare = composeEnhancers(
  applyMiddleware(
    thunk
  )
);

export default middleWare;