import axios from 'axios';

const defaultTimeout = 30000;

export const removeToken = () => {
  delete axios.defaults.headers.common.Authorization;
};

const callApi = (method, url, data = {}) => {
  const config = {
    method,
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data.token ? `Bearer ${data.token}` : null,
    },
    timeout: data.timeout || defaultTimeout,
    data,
  };

  if (data.token) {
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  }

  axios.interceptors.response.use(response => response, error => Promise.reject(error));

  return axios(config).then(response => {
    if (response == null) return null;

    return response.data;
  });
};

export default callApi;
