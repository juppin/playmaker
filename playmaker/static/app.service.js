angular.module('playmaker').service('global', ['$http', function($http) {

  function AuthManager() {

    this.loggedIn = false;

    this.isLoggedIn = function () {
      return this.loggedIn;
    }

    this.login = function () {
      this.loggedIn = !this.loggedIn;
    }
  }

  this.addAlert = {};

  this.desktop = false;
  this.mobile = false;

  this.auth = new AuthManager();

  var screenWidth = window.innerWidth;
  if (screenWidth < 700) {
    this.mobile = true;
  } else {
    this.desktop = true;
  }

}]);


angular.module('playmaker').service('api', ['$http', function($http) {

  this.getApps = function(callback) {
    $http({
      method: 'GET',
      url: '/api/apps'
    }).then(function success(response) {
      callback(response.data);
    }, function error(response) {
      callback('err');
    });
  };

  this.search = function(app, callback) {
    $http({
      method: 'GET',
      url: '/api/search?search=' + app
    }).then(function success(response) {
      callback(response.data.result);
    }, function error(response) {
      callback('err');
    });
  };

  this.check = function(callback) {
    $http.post('/api/check')
      .then(function success(response) {
        callback(response.data.result);
      }, function error(response) {
        callback('err');
      });
  };

  this.download = function(app, callback) {
    var requestData = {
      download: [app]
    };
    $http({
      method: 'POST',
      url: '/api/download',
      data: JSON.stringify(requestData)
    }).then(function success(response) {
        callback(response.data);
      }, function error(response) {
        callback('err');
      });
  };

  this.remove = function(app, callback) {
    var requestData = {
      delete: app
    };
    $http({
      method: 'DELETE',
      url: '/api/delete',
      data: JSON.stringify(requestData)
    }).then(function success(response) {
        callback(response.data);
      }, function error(response) {
        callback('err');
      });
  };

  this.fdroid = function(callback) {
    $http({
      method: 'POST',
      url: '/api/fdroid'
    }).then(function success(response) {
      callback(response.data);
    }, function error(response) {
      callback('err');
    });
  };

  this.login = function(cyphertext, password, callback) {
    $http({
      method: 'POST',
      url: '/api/login',
      data: JSON.stringify({
        cyphertext: cyphertext,
        password: password
      })
    }).then(function success(response) {
      callback(response.data);
    }, function error(response) {
      callback('err');
    });
  };

}]);


