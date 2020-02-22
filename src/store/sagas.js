import { fork, takeLatest, put, call } from 'redux-saga/effects'
import { GET_SUGGESTIONS, addSuggestions, removeSuggestions } from "../store/searchActions";
import { searchSuggestions } from "../store/api";

// Generator
function* fetchSuggestions(action) {
  try {
    const { payload } = action;
    if (payload.length > 0) {
      const data = yield call(searchSuggestions, action.payload);
      yield put(addSuggestions(data))
    } else {
      yield put(removeSuggestions());
    }
    
  } catch(e) {
      console.log(e);
  }
}

// watcher
function* watchFetchData() {
  yield takeLatest(GET_SUGGESTIONS, fetchSuggestions);
}

// root
export default function* rootSaga() {
  yield fork(watchFetchData)
}