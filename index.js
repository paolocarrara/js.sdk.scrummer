module.exports = (function () {
  const axios = require('axios');
  const querystring = require('querystring');
  const url = 'http://localhost:8000/api';
  const userEndPoint = '/user';
  const taskEndPoint = '/tasks';
  const tagEndPoint = '/tags';
  const projectEndPoint = '/projects';
  const axiosInstance = axios.create({
    headers: {'Accept': 'application/json, text/plain, */*'}
  });

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
    var create = function (projectId = '', description = '') {
      let data = {
        description: description
      }

      return _post(url + projectEndPoint + '/' + projectId + taskEndPoint, data);
    }

    var list = function (projectId = '') {
      let data = {

      }

      return _post(url + projectEndPoint + '/' + projectId + taskEndPoint + '/search', data);
    }

    var remove = function (projectId = '', taskId = '') {
      let data = {

      }

      return _delete(url + projectEndPoint + '/' + projectId + taskEndPoint + '/' + taskId, data);
    }

    var update = function (projectId = '', taskId = '', description = '', status = 0) {
      let data = {
        description: description,
        status: status
      }

      return _put(url + projectEndPoint + '/' + projectId + taskEndPoint + '/' + taskId, data);
    }

    var start = function (id = '') {
      let data = {

      }

      return _post(url + taskEndPoint + '/' + id + '/plays', data);
    }

    var stop = function (id = '') {
      let data = {

      }

      return _put(url + taskEndPoint + '/' + id + '/plays', data);
    }

    var addTag = function (projectId = '', taskId = '', tagName = '') {
      let data = {
        tagName: tagName
      }

      return _post(url + projectEndPoint + '/' + projectId + taskEndPoint + '/' + taskId + tagEndPoint, data);
    }

    var listTags = function (projectId = '', taskId = '') {
      let data = {

      }

      return _get(url + projectEndPoint + '/' + projectId + taskEndPoint + '/' + taskId + tagEndPoint, data);
    }

    var removeTag = function (projectId = '', taskId = '', tagId = '') {
      let data = {

      }

      return _delete(url + projectEndPoint + '/' + projectId + taskEndPoint + '/' + taskId + tagEndPoint + '/' + tagId, data);
    }

    return {
      create: create,
      list: list,
      remove: remove,
      update: update,
      start: start,
      stop: stop,
      addTag: addTag,
      listTags: listTags,
      removeTag: removeTag
    }
  })()

  var projects = (function () {
    var create = function (name = '', description = '') {
      let data = {
        name: name,
        description: description
      }

      return _post(url + projectEndPoint, data);
    }

    var list = function () {
      let data = {

      }

      return _get(url + projectEndPoint, data);
    }

    var view = function (id = '') {
      let data = {

      }

      return _get(url + projectEndPoint + '/' + id, data);
    }

    var remove = function (id = '') {
      let data = {

      }

      return _delete(url + projectEndPoint + '/' + id, data);
    }

    var update = function (id = '', name = '', description = '') {
      let data = {
        name: name,
        description: description
      }

      return _put(url + projectEndPoint + '/' + id, data);
    }

    return {
      create: create,
      list: list,
      view: view,
      remove: remove,
      update: update
    }
  })()

  axiosInstance.interceptors.request.use(function (config) {
    if (isLogged()) {
      config.headers = {
        'Authorization': 'Bearer ' + getUserToken()
      }
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  /**
   * Returns fi the user is logged.
   *
   * @return bool.
   */
  var isLogged = function () {
    let token = window.localStorage.getItem('scrummer.user-token');

    return token ? true: false;
  }

  /**
   * Returns the logged in user token.
   *
   * @return string.
   */
  var getUserToken = function () {
    let token = window.localStorage.getItem('scrummer.user-token');
    return token ? token.replace(/\"/g, '') : '';
  }

  /**
   * Do a get request to the given url with the given data.
   *
   * @param url Url to send the request.
   * @param data Data to be sent as query string.
   *
   * @return Promise.
   */
  var _get = function (url = '', data = {}) {
    return axiosInstance.get(url + '?' + querystring.stringify(data))
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
    return axiosInstance.post(url, data);
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
    return axiosInstance.delete(url, data);
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
    return axiosInstance.put(url, data);
  }

  return {
    hello: hello,
    register: register,
    login: login,
    tasks: tasks,
    projects: projects,
    getUserToken: getUserToken,
    isLogged: isLogged
  }
})()
