angular.module('app')
.controller('ShowpageController', ['$scope', 'httpFactory', function($scope, httpFactory){
  $scope.title = 'test';
  function activate() {
    httpFactory.getMovie($scope.newMovie)
    .then(function(response){
      console.log(response);
      $scope.movie = response.data;
    });
  }
  activate();
}]);
