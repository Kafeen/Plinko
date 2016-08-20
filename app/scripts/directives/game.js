'use strict';

angular.module('plinko-app')
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
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // add all of the bodies to the world
        World.add(engine.world, [boxA, boxB, ground]);
    },

    update : function() {
      Matter.Engine.update(engine, 1000 / 60.0);
    }
  };
})
.service('render-service', function() {
  var renderer;
  var stage;

  return {
    initialise : function(canvas) { 
        var parent = canvas.parentElement;
        canvas.style.width =parent.offsetWidth;
        canvas.style.height=parent.offsetHeight;
        canvas.width  = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        
        renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height,{backgroundColor : 0x9EDDE7, view : canvas});
        stage = new PIXI.Container();

        var textSample = new PIXI.Text("TEST", { font: '35px Roboto', fill: 'white', align: 'left' });
        textSample.x = 100;
        textSample.y = 100;
        stage.addChild(textSample);
    },

    render : function () {
      renderer.render(stage);
    }
  };
})

.directive('game', ['$interval', 'render-service', 'physics-service', function ($interval, renderService, physicsService) {
  return {
    link: function ($scope, $element) {
      renderService.initialise($element[0]);
      physicsService.initialise();

      /*requestAnimationFrame(() => {
        physicsService.update();
        renderService.render();
      });*/

      $interval(function () {
        physicsService.update();
        renderService.render();
      }, 1000 / 60);
    }
  };
}]);