import { ADD_RESULTS } from "../store/searchActions";

function results(state = {}, action) {
  switch(action.type) {
    case ADD_RESULTS:
      return {
        ...state,
        ...action,
      }
    default:
      return state;
  }
}

export default results;