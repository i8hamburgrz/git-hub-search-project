import { 
  ADD_SUGGESTIONS, 
  REMOVE_SUGGESTIONS,
  TOGGLE_ERROR
} from "./searchActions";

const initialState = { 
  suggestions: {},
  results: {},
  apiError: false
};

function results(state = initialState, action) {
  switch(action.type) {
    case ADD_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
        apiError: false
      }
    case REMOVE_SUGGESTIONS:
      return {
        ...state,
        suggestions: {},
        apiError: false
      }
    case TOGGLE_ERROR: 
      return {
        ...state,
        apiError: true
      }
    default:
      return state;
  }
}

export default results;