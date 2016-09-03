'use strict';

angular.module('plinko-app')
.service('board-service', ['$timeout', 'PROPERTIES', 'sprite', 'render-service', 'physics-service', 
  function ($timeout, PROPERTIES, sprite, renderer, physics) {
    var Pin = function() {
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.pin));
      this.pivot.x = 24/2;
      this.pivot.y = 24/2;

      this.body = Matter.Bodies.circle(0, 0, 10, { isStatic: true });
    };

    Pin.prototype = Object.create(PIXI.Sprite.prototype);

    var Brick = function(x, y) { 
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.wall));

      this.x = x * PROPERTIES.tileSize;
      this.y = y * PROPERTIES.tileSize;
    };

    Brick.prototype = Object.create(PIXI.Sprite.prototype);

    var Point = function(x, y) { 
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.point));

      this.x = x * PROPERTIES.tileSize;
      this.y = y * PROPERTIES.tileSize;
      this.pivot.x = this.pivot.y = 24;
      this.scale.x = this.scale.y = 0.66667;

      this.body = Matter.Bodies.rectangle((x) * PROPERTIES.tileSize, (y) * PROPERTIES.tileSize, PROPERTIES.tileSize * 0.66667, PROPERTIES.tileSize * 0.66667, { isStatic: true });
      Matter.Body.setAngle(this.body, 3.14/4);
    };

    Point.prototype = Object.create(PIXI.Sprite.prototype);

    var Trapdoor = function(x, y) { 
        PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.wall));

        this.x = x * PROPERTIES.tileSize;
        this.y = y * PROPERTIES.tileSize;

        this.body = Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, (y + 0.5) * PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize, { isStatic: true });
    };

    Trapdoor.prototype = Object.create(PIXI.Sprite.prototype);

    var trapdoors = [];

    var Lava = function(x, y) {
        PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.lava_low));

        this.x = x * PROPERTIES.tileSize;
        this.y = y * PROPERTIES.tileSize;
        this.pivot.y = -24;
        this.scale.x = this.scale.y = 0.5;

        this.body = Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, (PROPERTIES.boardHeight-1) * PROPERTIES.tileSize, PROPERTIES.tileSize * 2, PROPERTIES.tileSize, { isStatic: true, isSensor: true, label: PROPERTIES.LABELS.LAVA });
        /*this.body.onCollisionActive = (other) => {
            if(other.label === PROPERTIES.LABELS.PLAYER) {
                other.sprite.reduceHealthBy(1);
            }
        };*/
    };

    Lava.prototype = Object.create(PIXI.Sprite.prototype);

    var lava = [];


  return {
      build : function () {
        var x, y, tile, trapdoor;

        // Create Entry Point
        for(x = 0; x < PROPERTIES.boardWidth; ++x) {
          if(x%3 == 0) {
            // Create walls between spawn points
            renderer.stage.addChild(new Brick(x, 0));
            renderer.stage.addChild(new Brick(x, 1));

            physics.add(Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize*2, { isStatic: true }));
          }

          // Create trapdoors
          trapdoor = new Trapdoor(x, 2);
          renderer.stage.addChild(trapdoor);
          physics.add(trapdoor.body);
          trapdoors.push(trapdoor);
       }

        // Create Goals   
        for(x = 0; x < PROPERTIES.boardWidth; ++x) {
          if(x%3 == 0) {
            renderer.stage.addChild(new Brick(x, PROPERTIES.boardHeight-1));
            renderer.stage.addChild(new Brick(x, PROPERTIES.boardHeight-2));

            physics.add(Matter.Bodies.rectangle((x + 0.5) * PROPERTIES.tileSize, (PROPERTIES.boardHeight-1) * PROPERTIES.tileSize, PROPERTIES.tileSize, PROPERTIES.tileSize*2, { isStatic: true }));
          }
          else if(x%3 == 1 && Math.random() > 0.5) {
            physics.add(renderer.stage.addChild(new Lava(x, PROPERTIES.boardHeight-3)).body);
          }
        } 

        // Add points to push the tokens away from walls
        physics.add(renderer.stage.addChild(new Point(1,6.5)).body);
        physics.add(renderer.stage.addChild(new Point(1.5,7)).body);
        physics.add(renderer.stage.addChild(new Point(1,7.5)).body); 

        physics.add(renderer.stage.addChild(new Point(1,11.5)).body);
        physics.add(renderer.stage.addChild(new Point(1.5,12)).body);
        physics.add(renderer.stage.addChild(new Point(1,12.5)).body); 

        physics.add(renderer.stage.addChild(new Point(PROPERTIES.boardWidth - 1,6.5)).body);
        physics.add(renderer.stage.addChild(new Point(PROPERTIES.boardWidth - 1.5,7)).body);
        physics.add(renderer.stage.addChild(new Point(PROPERTIES.boardWidth - 1,7.5)).body); 

        physics.add(renderer.stage.addChild(new Point(PROPERTIES.boardWidth - 1,11.5)).body);
        physics.add(renderer.stage.addChild(new Point(PROPERTIES.boardWidth - 1.5,12)).body);
        physics.add(renderer.stage.addChild(new Point(PROPERTIES.boardWidth - 1,12.5)).body); 

        physics.add(renderer.stage.addChild(new Point(3.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(6.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(9.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(12.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(15.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(18.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(21.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(24.5,17)).body);
        physics.add(renderer.stage.addChild(new Point(27.5,17)).body);

        // Create Walls
        for(y = 0; y < PROPERTIES.boardHeight; y++) {
          renderer.stage.addChild(new Brick(0, y));
          renderer.stage.addChild(new Brick(PROPERTIES.boardWidth-1, y));
        }

        for(x = 0; x < PROPERTIES.boardWidth; ++x) {
          renderer.stage.addChild(new Brick(x, PROPERTIES.boardHeight-1));
        }

        physics.add(Matter.Bodies.rectangle(PROPERTIES.tileSize*0.5, (PROPERTIES.boardHeight*PROPERTIES.tileSize)/2, PROPERTIES.tileSize, PROPERTIES.boardHeight*PROPERTIES.tileSize, { isStatic: true }));
        physics.add(Matter.Bodies.rectangle((PROPERTIES.boardWidth-0.5)*PROPERTIES.tileSize, (PROPERTIES.boardHeight*PROPERTIES.tileSize)/2, PROPERTIES.tileSize, PROPERTIES.boardHeight*PROPERTIES.tileSize, { isStatic: true }));
        physics.add(Matter.Bodies.rectangle((PROPERTIES.boardWidth*0.5)*PROPERTIES.tileSize, (PROPERTIES.boardHeight - 0.5) * PROPERTIES.tileSize, PROPERTIES.boardWidth*PROPERTIES.tileSize, PROPERTIES.tileSize, { isStatic: true }));

        // Create Pins
        for(y = 0; y < 5; y++) {
          for(x = 0; x < ((y%2)?8:9); x++) {
            var pin = new Pin();
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