function request(url, headers = {
  method: "GET"
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