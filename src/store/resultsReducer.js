import { ADD_RESULTS, REMOVE_RESULTS } from "./searchActions";

const initialState = { 
  results: {}
};

function results(state = initialState, action) {
  switch(action.type) {
    case ADD_RESULTS:
      return {
        ...state,
        results: action.results,
      }
    case REMOVE_RESULTS:
      return {
        ...state,
        results: {}
      }
    default:
      return state;
  }
}

export default results;