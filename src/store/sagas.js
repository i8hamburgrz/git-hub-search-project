import { fork, takeLatest, put, call } from 'redux-saga/effects'
import { 
  GET_SUGGESTIONS, 
  addSuggestions, 
  removeSuggestions, 
  setError 
} from "../store/searchActions";
import { searchSuggestions } from "../store/api";

// Generator
function* fetchSuggestions(action) {
  try {
    const { payload } = action;
    if (payload.length > 0) {
      const response = yield call(searchSuggestions, action.payload);

      response.error
        ? yield put(setError())
        : yield put(addSuggestions(response));
    } else {
      yield put(removeSuggestions());
    }
    
  } catch(e) {
      console.log(e);
  }
}

// watcher
function* watchFetchData() {
  try {
    yield takeLatest(GET_SUGGESTIONS, fetchSuggestions);
  } catch(e){
    console.log(e)
  }
  
}

// root
export default function* rootSaga() {
  yield fork(watchFetchData)
}