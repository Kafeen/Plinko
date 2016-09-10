'use strict';

angular.module('plinko-app')
    .constant('sprite', {
        tokens: {
            elephant: 'assets/tokens/elephant.png',
            giraffe: 'assets/tokens/giraffe.png',
            hippo: 'assets/tokens/hippo.png',
            monkey: 'assets/tokens/monkey.png',
            panda: 'assets/tokens/panda.png',
            parrot: 'assets/tokens/parrot.png',
            penguin: 'assets/tokens/penguin.png',
            pig: 'assets/tokens/pig.png',
            rabbit: 'assets/tokens/rabbit.png',
            snake: 'assets/tokens/snake.png'
        },
        avatars: {
            elephant: 'assets/avatars/elephant.png',
            giraffe: 'assets/avatars/giraffe.png',
            hippo: 'assets/avatars/hippo.png',
            monkey: 'assets/avatars/monkey.png',
            panda: 'assets/avatars/panda.png',
            parrot: 'assets/avatars/parrot.png',
            penguin: 'assets/avatars/penguin.png',
            pig: 'assets/avatars/pig.png',
            rabbit: 'assets/avatars/rabbit.png',
            snake: 'assets/avatars/snake.png'
        },
        board: {
            wall: 'assets/board/element_grey_square.png',
            point: 'assets/board/element_grey_diamond.png',
            trap: 'assets/board/bridgeA.png',
            pin: 'assets/board/pin.png',
            pin_hit: 'assets/board/pin_hit.png',
            lava_high: 'assets/board/lavaTop_high.png',
            lava_low: 'assets/board/lavaTop_low.png'
        }
    });