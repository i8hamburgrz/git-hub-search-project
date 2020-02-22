import { fork, takeLatest, put, call, take, cancel, select } from 'redux-saga/effects'
import { GET_RESULTS, REMOVE_RESULTS, addResults } from "../store/searchActions";
import { searchRequest } from "../store/api";

// Generator
function* fetchData(action) {
  try {
    const data = yield call(searchRequest, action.payload);
    yield put(addResults(data))
  } catch(e) {
      console.log(e);
  }
}

// watcher
function* watchFetchData() {
  const fetchDataWorker = yield takeLatest(GET_RESULTS, fetchData);

  const action = yield take(['REMOVE_RESULTS'])
  console.log(action)
    if (action === REMOVE_RESULTS) {
      console.log('cancel')
      yield cancel(fetchDataWorker)
    }
     
}

// root
export default function* rootSaga() {
  yield fork(watchFetchData)
}