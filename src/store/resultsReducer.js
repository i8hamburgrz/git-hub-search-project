import { ADD_SUGGESTIONS, REMOVE_SUGGESTIONS } from "./searchActions";

const initialState = { 
  suggestions: {},
  results: {}
};

function results(state = initialState, action) {
  switch(action.type) {
    case ADD_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
      }
    case REMOVE_SUGGESTIONS:
      return {
        ...state,
        suggestions: {}
      }
    default:
      return state;
  }
}

export default results;