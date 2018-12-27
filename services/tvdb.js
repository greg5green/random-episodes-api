const axios = require('axios');
const secrets = require('../config/secrets');

const BASE_URL = 'https://api.thetvdb.com';

class TVDB {
  constructor() {
    this._axios = axios.create({
      baseURL: BASE_URL
    });
    this._insertHeaders = this._insertHeaders.bind(this);

    this._getToken();
    this._attachInterceptors();
  }

  delete(...args) {
    return this._axios.delete(...args).then(({ data }) => data);
  }

  get(...args) {
    return this._axios.get(...args).then(({ data }) => data);
  }

  head(...args) {
    return this._axios.head(...args).then(({ data }) => data);
  }

  options(...args) {
    return this._axios.options(...args).then(({ data }) => data);
  }

  patch(...args) {
    return this._axios.patch(...args).then(({ data }) => data);
  }

  post(...args) {
    return this._axios.post(...args).then(({ data }) => data);
  }

  put(...args) {
    return this._axios.put(...args).then(({ data }) => data);
  }

  request(...args) {
    return this._axios.request(...args).then(({ data }) => data);
  }

  _attachInterceptors() {
    this._axios.interceptors.request.use(this._insertHeaders);
  }

  _getToken() {
    return axios
      .post(`${BASE_URL}/login`, { apikey: secrets.tvdb.apiKey })
      .then(({ data }) => {
        this._jwt = data.token;
      });
  }

  _insertHeaders(config) {
    config.headers.common.Authorization = `Bearer ${this._jwt}`;

    return config;
  }
}

module.exports = new TVDB();
