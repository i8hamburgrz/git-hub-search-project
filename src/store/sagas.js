import { fork, takeLatest, put, call, take, cancel, select } from 'redux-saga/effects'
import { GET_RESULTS, REMOVE_RESULTS, addResults, removeResults } from "../store/searchActions";
import { searchRequest } from "../store/api";

// Generator
function* fetchData(action) {
  try {
    const { payload } = action;

    if (payload.length > 0) {
      const data = yield call(searchRequest, action.payload);
      yield put(addResults(data))
    } else {
      yield put(removeResults());
    }
    
  } catch(e) {
      console.log(e);
  }
}

// watcher
function* watchFetchData() {
  yield takeLatest(GET_RESULTS, fetchData);
}

// root
export default function* rootSaga() {
  yield fork(watchFetchData)
}