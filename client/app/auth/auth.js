// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('flow.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.flow', token);
        $location.path('/write');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.flow', token);
        $location.path('/signin');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.logout = function () {
    $location.path('/signin');
    $window.localStorage.setItem('com.flow', '');
  };

  // $scope.countUsers();
});
