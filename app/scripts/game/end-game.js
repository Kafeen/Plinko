'use strict';

angular.module('plinko-app')

.service('endgame', ['physics-service', 'board-service', 'player-service', 'render-service',
function (physicsService, boardService, playerService, renderService) {
  return {
    check : function () {
        // Is everything dead?
        if(playerService.numberOfAliveTokens === 0) {
            // Everyone dead, Tie round

            // TODO: Respawn players killed this round
            /*
            playerService
                .allPlayers
                .filter((player) => {player.roundKilled === game.currentRound})
                .do((player) => {console.log(player.name)});
            */
        } else if(playerService.numberOfAwakeTokens === 0) {
            if(playerService.numberOfAliveTokens === 1) {
                // We have a winner..

                // TODO: Display winner popup
            } else if(this.scolling === false) {
                //  Next round...

                // TODO: Generate a new level below the existing one

                // Scroll to the next level
                new TWEEN.Tween(renderService.stage.position)
                    .to({y: renderService.stage.position.y - 512}, 3000)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .start();

                this.scolling = true;

                return;
            }

            this.scolling = false;
        }
    }
  }
}]);
