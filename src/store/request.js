function request(url, headers = {
  method: "GET",
  authorization: "token 500b2b9a69a4450006dcab6c70b9fab90aaffeaf"
}) {
  return fetch(url, headers)
    .then(response => {
      return response.json();
    })
    .catch(err => {
      return err;
    })
};

export default request;