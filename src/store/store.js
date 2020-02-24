import { createStore } from "redux";
import { applyMiddleware, compose } from "redux";
import 'regenerator-runtime/runtime';
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers/resultsReducer";
import rootSaga from "./sagas/sagas";

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const middleWare = composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  );
  const store = createStore(reducers, middleWare);

  sagaMiddleware.run(rootSaga);
  return store;
}