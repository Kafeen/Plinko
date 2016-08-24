'use strict';

angular.module('plinko-app')
.constant('properties', {
  tileSize: 32,
  boardWidth: 31,
  boardHeight: 19
})

angular.module('plinko-app')
.constant('sprite', {
  tokens : {
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
  avatars : {
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
  board : {
    wall : 'assets/board/element_grey_square.png',
    point : 'assets/board/element_grey_diamond.png',
    trap : 'assets/board/bridgeA.png',
    pin : 'assets/board/pin.png',
    pin_hit : 'assets/board/pin_hit.png'
  }
})

.service('token-factory', ['sprite', function (sprite) {
  var allTokens = ['elephant', 'giraffe', 'hippo', 'monkey', 'panda', 'parrot', 'penguin', 'pig', 'rabbit', 'snake'];
  var unusedTokens = allTokens.slice();
 
  return {
    clear : function () {
      unusedTokens = allTokens.slice();
    },

    assignRandom : function () {
      var index = Math.floor(Math.random() * unusedTokens.length);
      if(index >= 0)
      {
        var token = unusedTokens[index];
        unusedTokens.splice(index, 1);
        return {id:token, avatar:sprite.avatars[token], token:sprite.tokens[token]};
      }
      return '';
    }    
  };
}])

.service('spawn-factory', [function () {
  var indecies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var unusedIndicies = indecies.slice();
 
  return {
    clear : function () {
      unusedIndicies = indecies.slice();
    },

    assignRandom : function () {
      var index = Math.floor(Math.random() * unusedIndicies.length);
      if(index >= 0)
      {
        var ret = unusedIndicies[index];
        unusedIndicies.splice(index, 1);
        return ret;
      }
      return -1;
    }    
  };
}])

.service('board-service', ['$timeout', 'properties', 'sprite', 'render-service', 'physics-service', 
  function ($timeout, properties, sprite, renderer, physics) {
    var Pin = function() {
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.pin));
      this.pivot.x = 24/2;
      this.pivot.y = 24/2;

      this.body = Matter.Bodies.circle(0, 0, 10, { isStatic: true });
    };

    Pin.prototype = Object.create(PIXI.Sprite.prototype);

    var Brick = function(x, y) { 
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.wall));

      this.x = x * properties.tileSize;
      this.y = y * properties.tileSize;
    };

    Brick.prototype = Object.create(PIXI.Sprite.prototype);

    var Point = function(x, y) { 
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.point));

      this.x = x * properties.tileSize;
      this.y = y * properties.tileSize;
      this.pivot.x = this.pivot.y = 24;
      this.scale.x = this.scale.y = 0.66667;

      this.body = Matter.Bodies.rectangle((x) * properties.tileSize, (y) * properties.tileSize, properties.tileSize * 0.66667, properties.tileSize * 0.66667, { isStatic: true });
      Matter.Body.setAngle(this.body, 3.14/4);
    };

    Point.prototype = Object.create(PIXI.Sprite.prototype);

    var Trapdoor = function(x, y) { 
        PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.wall));

        this.x = x * properties.tileSize;
        this.y = y * properties.tileSize;

        this.body = Matter.Bodies.rectangle((x + 0.5) * properties.tileSize, (y + 0.5) * properties.tileSize, properties.tileSize, properties.tileSize, { isStatic: true });
    };

    Trapdoor.prototype = Object.create(PIXI.Sprite.prototype);

    var trapdoors = [];

  return {
      build : function () {
        var x, y, tile, trapdoor;

        // Create Entry Point
        for(x = 0; x < properties.boardWidth; ++x) {
          if(x%3 == 0) {
            // Create walls between spawn points
            renderer.stage.addChild(new Brick(x, 0));
            renderer.stage.addChild(new Brick(x, 1));

            physics.add(Matter.Bodies.rectangle((x + 0.5) * properties.tileSize, properties.tileSize, properties.tileSize, properties.tileSize*2, { isStatic: true }));
          }

          // Create trapdoors
          trapdoor = new Trapdoor(x, 2);
          renderer.stage.addChild(trapdoor);
          physics.add(trapdoor.body);
          trapdoors.push(trapdoor);
       }

        // Add points to push the tokens away from walls
        physics.add(renderer.stage.addChild(new Point(1,6.5)).body);
        physics.add(renderer.stage.addChild(new Point(1.5,7)).body);
        physics.add(renderer.stage.addChild(new Point(1,7.5)).body); 

        physics.add(renderer.stage.addChild(new Point(1,11.5)).body);
        physics.add(renderer.stage.addChild(new Point(1.5,12)).body);
        physics.add(renderer.stage.addChild(new Point(1,12.5)).body); 

        physics.add(renderer.stage.addChild(new Point(properties.boardWidth - 1,6.5)).body);
        physics.add(renderer.stage.addChild(new Point(properties.boardWidth - 1.5,7)).body);
        physics.add(renderer.stage.addChild(new Point(properties.boardWidth - 1,7.5)).body); 

        physics.add(renderer.stage.addChild(new Point(properties.boardWidth - 1,11.5)).body);
        physics.add(renderer.stage.addChild(new Point(properties.boardWidth - 1.5,12)).body);
        physics.add(renderer.stage.addChild(new Point(properties.boardWidth - 1,12.5)).body); 

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
        for(y = 0; y < properties.boardHeight; y++) {
          renderer.stage.addChild(new Brick(0, y));
          renderer.stage.addChild(new Brick(properties.boardWidth-1, y));
        }

        for(x = 0; x < properties.boardWidth; ++x) {
          renderer.stage.addChild(new Brick(x, properties.boardHeight-1));
        }

        physics.add(Matter.Bodies.rectangle(properties.tileSize*0.5, (properties.boardHeight*properties.tileSize)/2, properties.tileSize, properties.boardHeight*properties.tileSize, { isStatic: true }));
        physics.add(Matter.Bodies.rectangle((properties.boardWidth-0.5)*properties.tileSize, (properties.boardHeight*properties.tileSize)/2, properties.tileSize, properties.boardHeight*properties.tileSize, { isStatic: true }));
        physics.add(Matter.Bodies.rectangle((properties.boardWidth*0.5)*properties.tileSize, (properties.boardHeight - 0.5) * properties.tileSize, properties.boardWidth*properties.tileSize, properties.tileSize, { isStatic: true }));

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

        // Create Goals   
        for(x = 0; x < properties.boardWidth; ++x) {
          if(x%3 == 0) {
            renderer.stage.addChild(new Brick(x, properties.boardHeight-1));
            renderer.stage.addChild(new Brick(x, properties.boardHeight-2));

            physics.add(Matter.Bodies.rectangle((x + 0.5) * properties.tileSize, (properties.boardHeight-1) * properties.tileSize, properties.tileSize, properties.tileSize*2, { isStatic: true }));
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
}])

.service('player-service', ['sprite', 'render-service', 'physics-service', function (sprite, renderer, physics) {
    var PlayerToken = function(player) {
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(player.token.avatar));
      this.pivot.x = 285/2;
      this.pivot.y = 285/2;

      this.body = Matter.Bodies.circle(0, 0, 20);
      this.applyPhysics = function () {
          this.x = this.body.position.x;
          this.y = this.body.position.y;
          this.rotation = this.body.angle;
      };
    };

    PlayerToken.prototype = Object.create(PIXI.Sprite.prototype);

    var tokens = [];

  return {
      spawn : function (player) {
        var token = new PlayerToken(player);
        token.scale.x = token.scale.y = (42/285);

        var x = 64 + 96 * (player.spawn - 1);
        var y = 32;

        Matter.Body.setPosition(token.body, { x: x, y: y })
        token.body.restitution = 0.8;
      
        renderer.stage.addChild(token);
        physics.add(token.body);

        tokens.push(token);
      },

      update : function () {
        tokens.forEach(function(token) {
          token.applyPhysics();
        }, this);
      }
  };
}])


.service('physics-service', function() {
  var engine;

  return {
    initialise : function() {
      // module aliases
        var Engine = Matter.Engine,
            World = Matter.World,
            Bodies = Matter.Bodies;

        // create an engine
        engine = Engine.create();

        /**
        var render = Matter.Render.create({
            element: document.body,
            engine: engine
        });
        Matter.Render.run(render);
        /**/
    },

    update : function() {
      Matter.Engine.update(engine, 1000 / 60.0);
    },

    add : function(body) {
      Matter.World.add(engine.world, [body]);
    },

    remove : function(body) {
      Matter.World.remove(engine.world, [body]);
    }
  };
})

.service('render-service', ['sprite', function(sprite) {
  var renderer;
  var stage;

  return {
    get stage () { return stage; },

    initialise : function(canvas) { 
        var parent = canvas.parentElement;
        canvas.style.width =parent.offsetWidth;
        canvas.style.height=parent.offsetHeight;
        canvas.width  = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        
        renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height,{backgroundColor : 0x9EDDE7, view : canvas});
        stage = new PIXI.Container();

        /*
        var textSample = new PIXI.Text("TEST", { font: '35px Roboto', fill: 'white', align: 'left' });
        textSample.x = 100;
        textSample.y = 100;
        stage.addChild(textSample);
        */
    },

    render : function () {
      renderer.render(stage);
    }
  };
}])

.service('game', ['$interval', 'render-service', 'physics-service', 'board-service', 'player-service', 
function ($interval, renderService, physicsService, boardService, playerService) {
  return {
    startGame : function (players) {
      boardService.start();
      players.forEach(function(player) {
        playerService.spawn(player);
      }, this);
    }
  }
}])

.directive('game', ['$interval', 'render-service', 'physics-service', 'board-service', 'player-service', function ($interval, renderService, physicsService, board, playerService) {
  return {
    link: function ($scope, $element) {
      renderService.initialise($element[0]);
      physicsService.initialise();
      board.build();

      var updateLoop = function () {
        physicsService.update();
        playerService.update();
        renderService.render();

        requestAnimationFrame(updateLoop);
      };

      requestAnimationFrame(updateLoop);

      /*
      $interval(function () {
        physicsService.update();
        playerService.update();
        renderService.render();
      }, 1000 / 60);*/
    }
  };
}]);