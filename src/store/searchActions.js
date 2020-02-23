export const GET_SUGGESTIONS = "GET_SUGGESTIONS";
export const ADD_SUGGESTIONS = "ADD_SUGGESTIONS";
export const REMOVE_SUGGESTIONS = "REMOVE_SUGGESTIONS";
export const GET_RESULTS = "GET_RESULTS";
export const ADD_RESULTS = "ADD_RESULTS";
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

export function removeSuggestions() {
  return {
    type: REMOVE_SUGGESTIONS
  }
}

export function getResults(query){
  return {
    type: GET_RESULTS,
    payload: query
  }
}

export function addResults(results) {
  return {
    type: ADD_RESULTS,
    results
  }
}

export function setError() {
  return {
    type: TOGGLE_ERROR,
  }
}
