'use strict';

angular.module('plinko-app')
    .factory('player-factory', ['PROPERTIES', 'render-service', 'physics-service',
        function (PROPERTIES, renderer, physics) {
            const DEFAULT_PROPERTIES = {
                name: 'PLAYER',
                sprite: {
                    texture: 'assets/avatars/elephant.png',
                    pivot: {x:(285>>1),y:(285>>1)},
                    scale: {x:(42/285),y:(42/285)}
                },
                body: {
                    radius: 20,
                    restitution: 0.8
                },
                parent: null,
                spawnPoint: 0,
                health: 100
            };

            var properties = JSON.parse(JSON.stringify(DEFAULT_PROPERTIES));

            return {
                allPlayers : [],

                withSprite: function(texture) {
                    properties.sprite.texture = texture;

                    return this;
                },

                withParent: function(parent) {
                    properties.parent = parent;

                    return this;
                },

                withSpawnPosition: function(spawnPoint) {
                    properties.spawnPoint = spawnPoint;

                    return this;
                },

                build: function () {
                    var result = new PlayerToken();

                    // Create the sprite
                    result.sprite = new PIXI.Sprite(PIXI.Texture.fromImage(properties.sprite.texture));
                    result.sprite.pivot.x = properties.sprite.pivot.x;
                    result.sprite.pivot.y = properties.sprite.pivot.y;
                    result.sprite.scale.x = properties.sprite.scale.x;
                    result.sprite.scale.y = properties.sprite.scale.y;
                    if(properties.parent !== undefined ) {
                        properties.parent.addChild(result.sprite);
                    }

                    // Create the body
                    result.body = Matter.Bodies.circle(0, 0, properties.body.radius, {label: PROPERTIES.LABELS.PLAYER});
                    result.body.restitution = properties.body.restitution;

                    // Add Physics events
                    physics.add(result.body);
                    physics.on('afterUpdate', result.onAfterUpdate);
                    physics.on('collisionActive', result.onCollisionActive);

                    // Set spawn point
                    // TODO: Get spawn points from board-factory
                    Matter.Body.setPosition(result.body, { x: (64 + 96 * (properties.spawnPoint - 1)), y: 32 })

                    // Store the new player
                    this.allPlayers.push(result);

                    return result;
                }
            };
        }]);