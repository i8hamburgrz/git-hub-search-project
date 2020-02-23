function request(url, headers = {
  method: "GET",
  Accept: "application/vnd.github.v3.text-match+json"
  // authorization: "token 500b2b9a69a4450006dcab6c70b9fab90aaffeaf"
}) {
  return fetch(url, headers)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response);
      } 
    })
    .catch(error => ({ error }))
};

export default request;