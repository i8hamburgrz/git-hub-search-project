import request from "./request";

export const searchSuggestions = (query) => {
  query  = query.split(' ').join('+');
  // we only want to return 5 results here, we do not need all results
  const url = `https://api.github.com/search/issues?q=${query}+in:react+user:facebook&per_page=5`;
  return request(url)
}

export const searchIssues = (query) => {
  query  = query.split(' ').join('+');
  const url = `https://api.github.com/search/issues?q=${query}+in:react+user:facebook`;
  return request(url)
}