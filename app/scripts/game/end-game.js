'use strict';

angular.module('plinko-app')

.service('endgame', ['physics-service', 'board-service', 'player-factory', 'render-service',
function (physicsService, boardService, playerFactory, renderService) {
  return {
    check : function () {
        // Is everything dead?
        var numberOfPlayers = playerFactory.allPlayers
            .length;

        var numberOfPlayersAlive = playerFactory.allPlayers
            .filter((player) => {return (player.health > 0)})
            .length;

        var numberOfPlayersAwake = playerFactory.allPlayers
            .filter((player) => {return (player.body.isSleeping === false)})
            .length;

        if(numberOfPlayers === 0 ) {
            return;
        }
        else if(numberOfPlayersAlive === 0) {
            // Everyone dead, Tie round

            // TODO: Respawn players killed this round
            console.log('Respawn players killed this round');
            /*
             playerFactory
                .allPlayers
                .filter((player) => {player.roundKilled === game.currentRound})
                .do((player) => {console.log(player.name)});
            */
        } else if(numberOfPlayersAwake === 0) {
            if(numberOfPlayersAlive === 1) {
                // We have a winner..

                // TODO: Display winner popup
                console.log('Display winner popup');
            } else if(this.scolling === false) {
                //  Next round...

                // TODO: Generate a new level below the existing one
                console.log('Generate a new level below the existing one');

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
