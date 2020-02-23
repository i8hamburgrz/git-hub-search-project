export const GET_SUGGESTIONS = "GET_SUGGESTIONS";
export const ADD_SUGGESTIONS = "ADD_SUGGESTIONS";
export const REMOVE_SUGGESTIONS = "REMOVE_SUGGESTIONS";
export const TOGGLE_ERROR = "TOGGLE_ERROR";

export function getSuggestions(query){
  return {
    type: GET_SUGGESTIONS,
    payload: query
  }
}

export function addSuggestions(suggestions) {
  return {
    type: ADD_SUGGESTIONS,
    suggestions
  }
}

export function setError() {
  return {
    type: TOGGLE_ERROR,
  }
}

export function removeSuggestions() {
  return {
    type: REMOVE_SUGGESTIONS
  }
}
