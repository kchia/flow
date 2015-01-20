angular.module('flow.services', [])

.factory('Entries', function ($http) {
  var getEntries = function(query){
    return $http({
      method: 'GET',
      url: '/api/entries',
      data: {
        text: { $regex: /query/}
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addEntry = function (entry) {
    return $http({
      method: 'POST',
      url: '/api/entries',
      data: entry
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getEntries: getEntries,
    addEntry: addEntry
  };

})
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.flow');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.flow');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
