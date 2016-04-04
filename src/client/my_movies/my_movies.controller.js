angular.module('app')
.controller('MyMoviesController', ['$scope', 'httpFactory', function($scope, httpFactory){
  $scope.title = 'My Movies';

}]);
