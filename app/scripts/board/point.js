'use strict';

angular.module('plinko-app')
    .factory('point-factory', ['PROPERTIES', 'sprite',
        function (PROPERTIES, SPRITE) {

            var Point = function (x, y) {
                PIXI.Sprite.call(this, PIXI.Texture.fromImage(SPRITE.board.point));

                this.x = x * PROPERTIES.tileSize;
                this.y = y * PROPERTIES.tileSize;
                this.pivot.x = this.pivot.y = 24;
                this.scale.x = this.scale.y = 0.66667;

                this.body = Matter.Bodies.rectangle((x) * PROPERTIES.tileSize, (y) * PROPERTIES.tileSize, PROPERTIES.tileSize * 0.66667, PROPERTIES.tileSize * 0.66667, {isStatic: true});
                Matter.Body.setAngle(this.body, 3.14 / 4);
            };

            Point.prototype = Object.create(PIXI.Sprite.prototype);

            return {
                create: function(x, y) {
                    return new Point(x, y);
                }

            }
        }
    ]);
