import { all, takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { 
  GET_SUGGESTIONS,
  GET_RESULTS,
  addSuggestions, 
  removeSuggestions, 
  addResults,
  setError 
} from "../store/searchActions";
import { searchSuggestions, searchIssues } from "../store/api";

// Generators
function* fetchSuggestions(action) {
  try {
    const { payload } = action;
    if (payload.length > 0) {
      const response = yield call(searchSuggestions, payload);

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

function* fetchResults(action) {
  try {
    const { payload } = action;
    const response = yield call(searchIssues, payload);

      response.error
        ? yield put(setError())
        : yield put(addResults(response));
    
  } catch(e) {
      console.log(e);
  }
}

// root
export default function* rootSaga() {
  yield all([
    yield takeEvery(GET_RESULTS, fetchResults),
    yield takeLatest(GET_SUGGESTIONS, fetchSuggestions)
  ])
}