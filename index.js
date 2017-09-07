module.exports = (function () {
  const axios = require('axios');
  const querystring = require('querystring');
  const url = 'http://localhost:8000';
  const userEndPoint = '/user';

  var hello = function () {
    console.log('Hello');
  }

  var register = function (email = '', password = '') {
    let data = {
      email: email,
      password: password
    }

    return post(url + userEndPoint, data);
  }

  /**
   *
   */
  var get = function (url = '', data = {}) {
    return axios.get(url + querystring.stringfy(data))
  }

  /**
   *
   */
  var post = function (url = '', data = {}) {
    return axios.post(url, data);
  }

  return {
    hello: hello,
    register: register
  }
})()
