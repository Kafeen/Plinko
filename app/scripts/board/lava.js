'use strict';

angular.module('plinko-app')
    .factory('lava-factory', ['PROPERTIES', 'sprite',
        function (PROPERTIES, SPRITE) {

            var Lava = function (x, y) {
                PIXI.Sprite.call(this, PIXI.Texture.fromImage(SPRITE.board.lava_low));

                this.x = x * PROPERTIES.tileSize;
                this.y = y * PROPERTIES.tileSize;
                this.pivot.y = -24;
                this.scale.x = this.scale.y = 0.5;

                this.body = Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, (PROPERTIES.boardHeight - 1) * PROPERTIES.tileSize, PROPERTIES.tileSize * 2, PROPERTIES.tileSize, {
                    isStatic: true,
                    isSensor: true,
                    label: PROPERTIES.LABELS.LAVA
                });
            };

            Lava.prototype = Object.create(PIXI.Sprite.prototype);

            return {
                create: function(x, y) {
                    return new Lava(x, y);
                }

            }
        }
    ]);


