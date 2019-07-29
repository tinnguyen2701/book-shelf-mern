import axios from 'axios';

const defaultTimeout = 30000;

const callApi = (method, url, data = {}) => {
  const config = {
    method,
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: data.timeout || defaultTimeout,
    data,
  };

  axios.interceptors.response.use(response => response, error => Promise.reject(error));

  return axios(config).then(response => {
    if (response == null) return null;

    return response.data;
  });
};

export default callApi;
