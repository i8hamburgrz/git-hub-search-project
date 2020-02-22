import { request, abortFetching } from "./request";

export const GET_SUGGESTIONS = "GET_SUGGESTIONS";
export const ADD_SUGGESTIONS = "ADD_SUGGESTIONS";
export const REMOVE_SUGGESTIONS = "REMOVE_SUGGESTIONS";

export const getSuggestions = (query) => ({
  type: GET_SUGGESTIONS,
  payload: query
})

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
