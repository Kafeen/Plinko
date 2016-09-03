'use strict';

angular.module('plinko-app')

.service('game-service', ['$interval', 'render-service', 'physics-service', 'board-service', 'player-service', 
function ($interval, renderService, physicsService, boardService, playerService) {
  return {
    startGame : function (players) {

      boardService.start();
      // Spawn players
      players.forEach(function(player) {
        playerService.create()
          .withSprite(player.token.avatar)
          .withRadius(20)
          .atSpawnPosition(player.spawn);
      }, this);
    }
  }
}])

.directive('game', ['$window', 'render-service', 'physics-service', 'board-service', 'player-service', 'endgame', 
  function ($window, renderService, physicsService, board, playerService, endgame) {
  return {
    link: function ($scope, $element) {
      renderService.initialise($element[0], $window.innerWidth, $window.innerHeight);
      physicsService.initialise();
      board.build();

      var updateLoop = function () {
        physicsService.update();
        // TODO: Update players
        //  playerService.update();
        renderService.render();
        endgame.check();
        TWEEN.update();

        requestAnimationFrame(updateLoop);
      };

      requestAnimationFrame(updateLoop);
    }
  };
}]);