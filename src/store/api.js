import request from "./request";

export const searchRequest = (query) => {
  const url = `https://api.github.com/search/issues?q=${query}+in:react+user:facebook&per_page=5`;
  return request(url)
}