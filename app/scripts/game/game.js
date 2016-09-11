'use strict';

angular.module('plinko-app')

    .service('game-service', ['$interval', 'render-service', 'physics-service', 'board-service', 'player-factory',
      function ($interval, renderService, physicsService, boardService, playerFactory) {
        return {
          startGame : function (players) {

            boardService.start();
            // Spawn players
            players.forEach(function(player) {
              playerFactory
                  .withSprite(player.token.avatar)
                  .withParent(renderService.stage)
                  .withSpawnPosition(player.spawn)
                  .build();
            }, this);
          }
        }
      }])

    .directive('game', ['$window', 'render-service', 'physics-service', 'board-service', 'endgame',
      function ($window, renderService, physicsService, board, endgame) {
        return {
          link: function ($scope, $element) {
            renderService.initialise($element[0], $window.innerWidth, $window.innerHeight);
            physicsService.initialise();
            board.build();

            var updateLoop = function () {
              physicsService.update();
              renderService.render();
              endgame.check();
              TWEEN.update();

              requestAnimationFrame(updateLoop);
            };

            requestAnimationFrame(updateLoop);
          }
        };
      }]);