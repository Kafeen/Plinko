'use strict';

angular.module('plinko-app')
.service('physics-service', function() {
  var engine;

  return {
    initialise : function() {
      // module aliases
        var Engine = Matter.Engine,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Events = Matter.Events;

        // create an engine
        engine = Engine.create({enableSleeping: true});

        Events.on(engine, 'collisionStart', function(event) {
                var pairs = event.pairs;
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];

                    if(pair.bodyA.onCollisionStart !== undefined) {
                        pair.bodyA.onCollisionStart(pair.bodyB);
                    }

                    if(pair.bodyB.onCollisionStart !== undefined) {
                        pair.bodyB.onCollisionStart(pair.bodyA);
                    }
                }
            });

        Events.on(engine, 'collisionActive', function(event) {
                var pairs = event.pairs;
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];

                    if(pair.bodyA.onCollisionActive !== undefined) {
                        pair.bodyA.onCollisionActive(pair.bodyB);
                    }

                    if(pair.bodyB.onCollisionActive !== undefined) {
                        pair.bodyB.onCollisionActive(pair.bodyA);
                    }
                }
            });

        Events.on(engine, 'collisionEnd', function(event) {
                var pairs = event.pairs;
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];

                    if(pair.bodyA.onCollisionEnd !== undefined) {
                        pair.bodyA.onCollisionEnd(pair.bodyB);
                    }

                    if(pair.bodyB.onCollisionEnd !== undefined) {
                        pair.bodyB.onCollisionEnd(pair.bodyA);
                    }
                }
            });

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
    },

    on : function(event, callback) {
        Matter.Events.on(engine, event, callback);
    }
  };
});