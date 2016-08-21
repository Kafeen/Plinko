'use strict';

angular.module('plinko-app')
.controller('', ['$scope', function($scope) {

}])
.factory('game-service', [function() {
  console.log('GAME SERVICE');

  return {};
}])
.directive('game', function ($parse) {
  return {
    controller: function postLink($scope, $element, $attrs) {
        console.log('GAME', $scope, $element, $attrs);
        console.log($scope.bollocks);
    }
  };
});