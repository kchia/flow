angular.module('flow.search', [])

.controller('SearchController', function ($scope, Entries) {
  $scope.data = {
    entries: []
  };

  // Grab entries from server
  $scope.getEntries = function(){
    Entries.getEntries()
      .then(function(resp){
        // console.log(resp);
        $scope.data.entries = resp;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
