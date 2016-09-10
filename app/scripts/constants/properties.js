'use strict';

angular.module('plinko-app')
    .constant('PROPERTIES', {
        canvasWidth: 1280,
        canvasHeight: 676,
        tileSize: 32,
        boardWidth: 31,
        boardHeight: 19,

        LABELS: {
            PLAYER: 'PLAYER',
            LAVA: 'LAVA'
        }
    });
