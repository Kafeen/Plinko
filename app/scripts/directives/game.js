'use strict';

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
    background_panel : 'assets/board/element_grey_square.png',
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

.service('board-service', ['sprite', 'render-service', 'physics-service', function (sprite, renderer, physics) {
    var Pin = function() {
      PIXI.Sprite.call(this, PIXI.Texture.fromImage(sprite.board.pin));
      this.pivot.x = 24/2;
      this.pivot.y = 24/2;

      this.body = Matter.Bodies.circle(0, 0, 10, { isStatic: true });
    };

    Pin.prototype = Object.create(PIXI.Sprite.prototype);

  return {
      build : function () {

        for(var y = 0; y < 9; y++) {
          for(var x = 0; x < ((y%2)?10:11); x++) {
            var pin = new Pin();
            pin.x = 12 + x * 2 * 32 + ((y%2)?32:0);
            pin.y = 12 + y * 1.732 * 32;
            renderer.stage.addChild(pin);

            Matter.Body.setPosition(pin.body, { x: pin.x, y: pin.y })

            physics.add(pin.body);
          }
        }        
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

        var x = 64 * (player.spawn - 1) + 42;
        var y = 0;

        Matter.Body.setPosition(token.body, { x: x, y: y })
      
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

        // create two boxes and a ground
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // add all of the bodies to the world
        World.add(engine.world, [ground]);
/*
        var render = Matter.Render.create({
            element: document.body,
            engine: engine
        });
        Matter.Render.run(render);*/
    },

    update : function() {
      Matter.Engine.update(engine, 1000 / 60.0);
    },

    add : function(body) {
      Matter.World.add(engine.world, [body]);
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

        /*
        var token = new Token(sprite.board.background_panel);
        stage.addChild(token);

        token = new Token(sprite.board.background_panel);
        token.y = 32;
        stage.addChild(token);

        token = new Token(sprite.board.background_panel);
        token.x = 32;
        stage.addChild(token);

        token = new Token(sprite.board.background_panel);
        token.x = 64;
        stage.addChild(token);
        */
    },

    render : function () {
      renderer.render(stage);
    }
  };
}])

.service('game', ['$interval', 'render-service', 'physics-service', 'player-service', function ($interval, renderService, physicsService, playerService) {
  return {
    startGame : function (players) {
      console.log('Start game => ', players);
      players.forEach(function(player) {
        console.log(player.name, '=>', player.token, player.spawn);
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

      /*requestAnimationFrame(() => {
        physicsService.update();
        renderService.render();
      });*/

      $interval(function () {
        physicsService.update();
        playerService.update();
        renderService.render();
      }, 1000 / 60);
    }
  };
}]);