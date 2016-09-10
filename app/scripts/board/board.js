'use strict';

angular.module('plinko-app')
.service('board-service', ['$timeout', 'PROPERTIES', 'sprite', 'render-service', 'physics-service', 'brick-factory', 'trapdoor-factory', 'lava-factory', 'point-factory',
  function ($timeout, PROPERTIES, sprite, renderer, physics, brick, trapdoorFactory, lavaFactory, pointFactory) {
    var trapdoors = [];

  return {
      build : function () {
        var x, y, tile, trapdoor;

        // Create Entry Point
        for(x = 0; x < PROPERTIES.boardWidth; ++x) {
          if(x%3 == 0) {
            // Create walls between spawn points
            renderer.stage.addChild(brick.create(x, 0));
            renderer.stage.addChild(brick.create(sprite.board.wall, x, 1));

            physics.add(Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize*2, { isStatic: true }));
          }

          // Create trapdoors
          trapdoor = trapdoorFactory.create(x, 2);
          renderer.stage.addChild(trapdoor);
          physics.add(trapdoor.body);
          trapdoors.push(trapdoor);
       }

        // Create Goals
        for(x = 0; x < PROPERTIES.boardWidth; ++x) {
          if(x%3 == 0) {
            renderer.stage.addChild(brick.create(x, PROPERTIES.boardHeight-1));
            renderer.stage.addChild(brick.create(x, PROPERTIES.boardHeight-2));

            physics.add(Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, (PROPERTIES.boardHeight-1) * PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize*2, { isStatic: true }));
          }
          else if(x%3 == 1 && Math.random() > 0.5) {
            physics.add(renderer.stage.addChild(lavaFactory.create(x, PROPERTIES.boardHeight-3)).body);
          }
        }

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

        physics.add(renderer.stage.addChild(pointFactory.create(3.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(6.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(9.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(12.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(15.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(18.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(21.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(24.5,17)).body);
        physics.add(renderer.stage.addChild(pointFactory.create(27.5,17)).body);

        // Create Walls
        for(y = 0; y < PROPERTIES.boardHeight; y++) {
          renderer.stage.addChild(brick.create(0, y));
          renderer.stage.addChild(brick.create(PROPERTIES.boardWidth-1, y));
        }

        for(x = 0; x < PROPERTIES.boardWidth; ++x) {
          renderer.stage.addChild(brick.create(x, PROPERTIES.boardHeight-1));
        }

        physics.add(Matter.Bodies.rectangle(PROPERTIES.tileSize*0.5, (PROPERTIES.boardHeight*PROPERTIES.tileSize)/2, PROPERTIES.tileSize, PROPERTIES.boardHeight*PROPERTIES.tileSize, { isStatic: true }));
        physics.add(Matter.Bodies.rectangle((PROPERTIES.boardWidth-0.5)*PROPERTIES.tileSize, (PROPERTIES.boardHeight*PROPERTIES.tileSize)/2, PROPERTIES.tileSize, PROPERTIES.boardHeight*PROPERTIES.tileSize, { isStatic: true }));
        physics.add(Matter.Bodies.rectangle((PROPERTIES.boardWidth*0.5)*PROPERTIES.tileSize, (PROPERTIES.boardHeight - 0.5) * PROPERTIES.tileSize, PROPERTIES.boardWidth*PROPERTIES.tileSize, PROPERTIES.tileSize, { isStatic: true }));

        // Create Pins
        for(y = 0; y < 5; y++) {
          for(x = 0; x < ((y%2)?8:9); x++) {
            var pin = new Pin(sprite.board.pin);
            pin.x = 56 + 12 + x * 2 * 48 + ((y%2)?96:48);
            pin.y = 128 + 12 + y * 1.732 * 48;
            renderer.stage.addChild(pin);

            Matter.Body.setPosition(pin.body, { x: pin.x, y: pin.y })
            pin.body.restitution = Math.random();

            physics.add(pin.body);
          }
        }
      },

    start : function () {
      $timeout(() => {
      while(trapdoors.length > 0) {
          renderer.stage.removeChild(trapdoors[0]);
          physics.remove(trapdoors[0].body);
          trapdoors.shift();
      }}, 600);
    }
  };
}]);