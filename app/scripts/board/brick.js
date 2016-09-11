'use strict';

angular.module('plinko-app')
    .factory('brick-factory', ['PROPERTIES', 'sprite',
        function (PROPERTIES, SPRITE) {

            var Brick = function (x, y) {
                PIXI.Sprite.call(this, PIXI.Texture.fromImage(SPRITE.board.wall));

                this.x = x * PROPERTIES.tileSize;
                this.y = y * PROPERTIES.tileSize;

                this.body = Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, (y + 0.5) * PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize, {isStatic: true});
            };

            Brick.prototype = Object.create(PIXI.Sprite.prototype);

            return {
                create: function(x, y) {
                    return new Brick(x, y);
                }

            }
        }
    ]);