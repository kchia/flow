angular.module('flow.write', [])

.controller('WriteController', function ($scope, Entries) {
  $scope.entry = {};
  $scope.wordcount = 0;

  $scope.addEntry = function(){
    Entries.addEntry($scope.entry)
      .then(function(resp){
        console.log(resp);
        $scope.clearAll();
      });

  };

  $scope.clearAll = function(){
    $scope.entry.title = '';
    $scope.entry.text = '';
    $scope.clearWordCount();
  };

  $scope.countWords = function(){
    s = $scope.entry.text;
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    $scope.wordcount = s.split(' ').length;
  }

  $scope.clearWordCount = function(){
    $scope.wordcount = 0;
  };

  setInterval(function(){
    $scope.countWords()}, 
  100);
});
