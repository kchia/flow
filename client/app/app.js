angular.module('flow', [
  'flow.services',
  'flow.write',
  'flow.search',
  'flow.calendar',
  'flow.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/write', {
      templateUrl: 'app/write/write.html',
      controller: 'WriteController'
    })
    .when('/search', {
      templateUrl: 'app/search/search.html',
      controller: 'SearchController'
    })
    .when('/calendar', {
      templateUrl: 'app/calendar/calendar.html',
      controller: 'CalendarController'
    })
    .when('/logout', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/signin'
    });

    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.flow');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
