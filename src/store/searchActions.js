import { request, abortFetching } from "./request";

export const GET_RESULTS = "GET_RESULTS";
export const ADD_RESULTS = "ADD_RESULTS";
export const REMOVE_RESULTS = "REMOVE_RESULTS";

export const getResults = (query) => ({
  type: GET_RESULTS,
  payload: query
})

export function addResults(results) {
  return {
    type: ADD_RESULTS,
    results
  }
}

export function removeResults() {
  return {
    type: REMOVE_RESULTS
  }
}
