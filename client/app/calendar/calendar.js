angular.module('flow.calendar', [])

.controller('CalendarController', function ($scope, Entries) {
  $scope.counts = 0;
  $scope.username = '';
  $scope.wordcount = 0;
  // Grab entries from server
  $scope.countEntries = function(){
    Entries.countEntries()
      .then(function(resp){
        $scope.counts = resp.length;
        $scope.username = resp[resp.length-1].username;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.countWords = function(){
    Entries.countEntries()
      .then(function(resp){
      	for(var i = 0; i < resp.length; i++){
      		$scope.wordcount += resp[i].text.split(" ").length;
      	}
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.countEntries();
  $scope.countWords();
});
