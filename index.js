module.exports = (function () {
  const axios = require('axios');
  const querystring = require('querystring');
  const url = 'http://localhost:8000/api';
  const userEndPoint = '/user';
  const taskEndPoint = '/task';

  var hello = function () {
    console.log('Hello');
  }

  var register = function (firstname = '', surname = '', email = '', password = '') {
    let data = {
      firstname: firstname,
      surname: surname,
      email: email,
      password: password
    };

    return post(url + userEndPoint, data);
  }

  var login = function (email = '', password = '') {
    let data = {
      email: email,
      password: password
    };

    return post(url + userEndPoint + '/login', data);
  }

  var tasks = (function (outerThis) {
    /**
     * Creates a task.
     * @param description Task's description.
     *
     * @return Promise.
     */
    var create = function (description = '') {
      let data = {
        description: description
      }

      return post(url + taskEndPoint, data);
    }

    return {
      create: create
    }
  })()

  axios.interceptors.request.use(function (config) {
    config.headers = { Authorization: 'Bearer ' + window.localStorage.getItem('scrummer.user-token') };
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  /**
   * Do a get request to the given url with the given data.
   *
   * @param url Url to send the request.
   * @param data Data to be sent as query string.
   *
   * @return Promise.
   */
  var get = function (url = '', data = {}) {
    return axios.get(url + querystring.stringfy(data))
  }

  /**
   * Do a post request to the given url with the given data.
   *
   * @param url Url to send the request.
   * @param data Data to be sent.
   *
   * @return Promise.
   */
  var post = function (url = '', data = {}) {
    return axios.post(url, data);
  }

  return {
    hello: hello,
    register: register,
    login: login,
    tasks: tasks
  }
})()
