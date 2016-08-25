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
});