import request from "./request";

// const GNEWS_TOKEN = 'dac4753d4c9b91b189bf0686059a3ae1';
export const ADD_RESULTS = "ADD_RESULTS";

function addResults(news) {
  return {
    type: ADD_RESULTS,
    news
  }
}

export const search = () => {
  return (dispatch) => {
    // const query = 'los+angeles+ca';
    // const url = `https://gnews.io/api/v3/search?q=${query}&token=${GNEWS_TOKEN}`;
  
		return request(url)
      .then((res) =>  {
        dispatch(addResults(res))
      })
      .catch(err => {
        console.log(err);
      });
  };
}
