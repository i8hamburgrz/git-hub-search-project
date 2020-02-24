import { 
  ADD_SUGGESTIONS, 
  REMOVE_SUGGESTIONS,
  ADD_RESULTS,
  TOGGLE_ERROR,
  GET_RESULTS
} from "../actions/searchActions";

const initialState = { 
  suggestions: {},
  results: {},
  apiError: false,
  loadingResults: false
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
        suggestions: {}
      }
    case GET_RESULTS: {
      return {
        ...state,
        loadingResults: true
      }
    }
    case ADD_RESULTS: 
      return {
        ...state,
        results: action.results,
        apiError: false
      }
    case TOGGLE_ERROR: 
      return {
        ...state,
        apiError: true,
        loadingResults: false
      }
    default:
      return state;
  }
}

export default results;