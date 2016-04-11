angular.module('app')
.directive('starRating', starRating);

function starRating() {
    return {
      restrict: 'EA',
      template:
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
      scope: {
        ratingValue: '=ngModel',
        max: '=?', // optional (default is 5)
        onRatingSelect: '&?',
        readonly: '=?',
        movieId: '@'
      },
      link: starLink,
      controller: StarController
    };
  };

StarController.$inject = ['httpFactory'];

function StarController(httpFactory) {
  this.updateRating = function(id, rating) {
      httpFactory.updateRating(id, rating)
      .then(function(response){
        console.log(response);
      });
    }
}

function starLink(scope, element, attributes, controller) {
  if (scope.max == undefined) {
    scope.max = 5;
  }
  function updateStars() {
    scope.stars = [];
    for (var i = 0; i < scope.max; i++) {
      scope.stars.push({
        filled: i < scope.ratingValue
      });
    }
  };
  scope.toggle = function(index) {
    console.log(index, scope.readonly, scope.ratingValue);
    if (scope.readonly == undefined || scope.readonly === false){
      scope.ratingValue = index + 1;
      if (typeof scope.onRatingSelect === 'function') {
      scope.onRatingSelect({
        rating: index + 1
      });
    }
    console.log('movie id',scope.movieId);
      controller.updateRating(scope.movieId, scope.ratingValue)
    }
  };
  scope.$watch('ratingValue', function(newValue, oldValue) {
    console.log('ratingValue', oldValue, newValue);
    if (newValue) {
      updateStars();
    }
  });
}
