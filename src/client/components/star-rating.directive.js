angular.module('app')
.directive('starRating', starRating);
// .controller('StarController', ['httpFactory', function(httpFactory){
// function Controller( $scope, httpFactory ) {
//   $scope.rateFunction = function() {
//     var movie = this.movie;
//     console.log(this);
//     httpFactory.updateRating(movie.id, movie.rating)
//     .then(function(response){
//       console.log(response);
//     });
//   }
// };

// (function() {
//   'use strict';
//
//   angular
//     .module('app', [])
//     .controller('RatingController', RatingController)
//     .directive('starRating', starRating);
//
//   function RatingController() {
//     this.rating1 = 5;
//     this.rating2 = 2;
//     this.isReadonly = true;
//     this.rateFunction = function(rating) {
//       console.log('Rating selected: ' + rating);
//     };
//   }

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
          readonly: '=?'
        },
        link: function(scope, element, attributes) {
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
              scope.onRatingSelect({
                rating: index + 1
              });
            } 
          };
          scope.$watch('ratingValue', function(newValue, oldValue) {
            console.log('ratingValue', oldValue, newValue);
            if (newValue) {
              updateStars();
            }
          });
        }
      };
    };
