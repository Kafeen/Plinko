'use strict';

angular.module('plinko-app')
    .service('board-service', ['$timeout', 'PROPERTIES', 'sprite', 'render-service', 'physics-service', 'brick-factory', 'trapdoor-factory', 'lava-factory', 'point-factory',
        function ($timeout, PROPERTIES, sprite, renderer, physics, brick, trapdoorFactory, lavaFactory, pointFactory) {
            var trapdoors = [[]];
            var currentLevel = 0;

            return {
                build : function () {
                    this.createTraps(currentLevel, [false, false, false, false, false, false, false, false, false, false]);
                    this.createTraps(currentLevel + 1, [false, true, false, true, false, true, false, true, false, true]);
                    this.createLeftWall(currentLevel);
                    this.createRightWall(currentLevel);
                    this.createPins(currentLevel);

                    /*
                     // Add points to push the tokens away from walls
                     physics.add(renderer.stage.addChild(pointFactory.create(1,6.5)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(1.5,7)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(1,7.5)).body);

                     physics.add(renderer.stage.addChild(pointFactory.create(1,11.5)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(1.5,12)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(1,12.5)).body);

                     physics.add(renderer.stage.addChild(pointFactory.create(PROPERTIES.boardWidth - 1,6.5)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(PROPERTIES.boardWidth - 1.5,7)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(PROPERTIES.boardWidth - 1,7.5)).body);

                     physics.add(renderer.stage.addChild(pointFactory.create(PROPERTIES.boardWidth - 1,11.5)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(PROPERTIES.boardWidth - 1.5,12)).body);
                     physics.add(renderer.stage.addChild(pointFactory.create(PROPERTIES.boardWidth - 1,12.5)).body);


                     */
                },

                next : function () {
                    currentLevel++;

                    this.createTraps(currentLevel + 1, [true, false, true, false, true, false, true, false, true, false]);
                    this.createLeftWall(currentLevel);
                    this.createRightWall(currentLevel);
                    this.createPins(currentLevel);
                },

                createPins : function (levelId) {
                    var baseY = levelId * (PROPERTIES.boardHeight - 3) * PROPERTIES.tileSize;
                    for(var y = 0; y < 5; y++) {
                        for(var x = 0; x < ((y%2)?8:9); x++) {
                            var pin = new Pin(sprite.board.pin);
                            pin.x = 56 + 12 + x * 2 * 48 + ((y%2)?96:48);
                            pin.y = baseY + 128 + 12 + y * 1.732 * 48;
                            renderer.stage.addChild(pin);

                            Matter.Body.setPosition(pin.body, { x: pin.x, y: pin.y });
                            pin.body.restitution = Math.random();

                            physics.add(pin.body);
                        }
                    }
                },

                createLeftWall : function (levelId) {
                    var leftWall = new PIXI.Container();
                    var baseY = levelId * (PROPERTIES.boardHeight - 3);
                    for(var y = 0; y < PROPERTIES.boardHeight; y++) {
                        physics.add(leftWall.addChild(brick.create(0, baseY + y)).body);
                    }
                    renderer.stage.addChild(leftWall);
                    return leftWall;
                },

                createRightWall : function (levelId) {
                    var rightWall = new PIXI.Container();
                    var baseY = levelId * (PROPERTIES.boardHeight - 3);
                    for(var y = 0; y < PROPERTIES.boardHeight; y++) {
                        physics.add(rightWall.addChild(brick.create(PROPERTIES.boardWidth-1, baseY + y)).body);
                    }
                    renderer.stage.addChild(rightWall);
                    return rightWall;
                },

                createTraps : function (levelId, hasDeathZone) {
                    for(var i = 0; i < hasDeathZone.length; ++i) {
                        var baseY = levelId * (PROPERTIES.boardHeight - 3);

                        if (i > 0) {
                            physics.add(renderer.stage.addChild(pointFactory.create(i * 3 + 0.5, baseY + 1)).body);
                            renderer.stage.addChild(brick.create(i * 3, baseY + 1));
                            renderer.stage.addChild(brick.create(i * 3, baseY + 2));
                        }

                        if(hasDeathZone[i]) {
                            physics.add(renderer.stage.addChild(lavaFactory.create(i * 3 + 1, baseY + 0)).body);

                            var floor = brick.create(i * 3 + 1,baseY + 2);
                            renderer.stage.addChild(floor);
                            physics.add(floor.body);

                            floor = brick.create(i * 3 + 2, baseY + 2);
                            renderer.stage.addChild(floor);
                            physics.add(floor.body);
                        } else {
                            var trapdoor = trapdoorFactory.create(i * 3 + 1, baseY + 2);
                            renderer.stage.addChild(trapdoor);
                            physics.add(trapdoor.body);
                            trapdoors[levelId] = trapdoors[levelId] || [];
                            trapdoors[levelId].push(trapdoor);

                            trapdoor = trapdoorFactory.create(i * 3 + 2, baseY + 2);
                            renderer.stage.addChild(trapdoor);
                            physics.add(trapdoor.body);
                            trapdoors[levelId].push(trapdoor);
                        }
                    }
                },

                start : function () {
                    $timeout(() => {
                        while(trapdoors[currentLevel].length > 0) {
                        renderer.stage.removeChild(trapdoors[currentLevel][0]);
                        physics.remove(trapdoors[currentLevel][0].body);
                        trapdoors[currentLevel].shift();
                    }}, 600);
                }
            };
        }]);