'use strict';

angular.module('plinko-app')

.service('game-service', ['$interval', 'render-service', 'physics-service', 'board-service', 'player-service', 
function ($interval, renderService, physicsService, boardService, playerService) {
  return {
    startGame : function (players) {
      boardService.start();
      players.forEach(function(player) {
        playerService.spawn(player);
      }, this);
    }
  }
}])

.directive('game', ['$window', 'render-service', 'physics-service', 'board-service', 'player-service', 
  function ($window, renderService, physicsService, board, playerService) {
  return {
    link: function ($scope, $element) {
      renderService.initialise($element[0], $window.innerWidth, $window.innerHeight);
      physicsService.initialise();
      board.build();

      var updateLoop = function () {
        physicsService.update();
        playerService.update();
        renderService.render();

        requestAnimationFrame(updateLoop);
      };

      requestAnimationFrame(updateLoop);
    }
  };
}]);