module.exports = (function () {
  const axios = require('axios');
  const querystring = require('querystring');
  const url = 'http://localhost:8000/api';
  const userEndPoint = '/user';
  const taskEndPoint = '/tasks';

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

    return _post(url + userEndPoint, data);
  }

  var login = function (email = '', password = '') {
    let data = {
      email: email,
      password: password
    };

    return _post(url + userEndPoint + '/login', data);
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

      return _post(url + taskEndPoint, data);
    }

    var list = function () {
      let data = {

      }

      return _get(url + taskEndPoint, data);
    }

    var remove = function (id = '') {
      let data = {

      }

      return _delete(url + taskEndPoint + '/' + id, data);
    }

    var update = function (id = '', description = '') {
      let data = {
        description: description
      }

      return _put(url + taskEndPoint + '/' + id, data);
    }

    var start = function (id = '') {
      let data = {

      }

      return _post(url + taskEndPoint + '/' + id + '/plays', data);
    }

    return {
      create: create,
      list: list,
      remove: remove,
      update: update,
      start: start
    }
  })()

  axios.interceptors.request.use(function (config) {
    config.headers = {
      'Authorization': 'Bearer ' + (window.localStorage.getItem('scrummer.user-token')).replace(/\"/g, '')
    }
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
  var _get = function (url = '', data = {}) {
    return axios.get(url + querystring.stringify(data))
  }

  /**
   * Do a post request to the given url with the given data.
   *
   * @param url Url to send the request.
   * @param data Data to be sent.
   *
   * @return Promise.
   */
  var _post = function (url = '', data = {}) {
    return axios.post(url, data);
  }

  /**
   * Do a delete request to the given url with the given data.
   *
   * @param url Url to send the request.
   * @param data Data to be sent.
   *
   * @return Promise.
   */
  var _delete = function (url = '', data = {}) {
    return axios.delete(url);
  }

  /**
   * Do a put request to the given url with the given data.
   *
   * @param url Url to send the request.
   * @param data Data to be sent.
   *
   * @return Promise.
   */
  var _put = function (url = '', data = {}) {
    return axios.put(url, data);
  }

  return {
    hello: hello,
    register: register,
    login: login,
    tasks: tasks
  }
})()
