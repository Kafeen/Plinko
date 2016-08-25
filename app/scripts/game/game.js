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

.directive('game', ['$interval', 'render-service', 'physics-service', 'board-service', 'player-service', function ($interval, renderService, physicsService, board, playerService) {
  return {
    link: function ($scope, $element) {
      renderService.initialise($element[0]);
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