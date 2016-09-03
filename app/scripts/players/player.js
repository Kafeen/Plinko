'use strict';

angular.module('plinko-app')
.factory('player-service', ['PROPERTIES', 'render-service', 'physics-service',
    function (PROPERTIES, renderer, physics) {

    var PlayerToken = function() {
        var self = this;
        self.sprite = null;
        self.withSprite = function(sprite) {
            if(self.sprite !== null) {
                // TODO: Remove and release old sprite
            }

            // Create the new sprite
            self.sprite = new PIXI.Sprite(PIXI.Texture.fromImage(sprite));
            self.sprite.pivot.x = (285>>1);
            self.sprite.pivot.y = (285>>1);
            self.sprite.scale.x = (42/285);
            self.sprite.scale.y = (42/285);

            renderer.stage.addChild(self.sprite);

            return self;
        };

        self.body = null;
        self.withRadius = function(radius) {
            self.body = Matter.Bodies.circle(0, 0, radius, {label: PROPERTIES.LABELS.PLAYER});
            self.body.restitution = 0.8;

            physics.add(self.body);
            physics.on('afterUpdate', function(event) {
                self.sprite.position.x = self.body.position.x;
                self.sprite.position.y = self.body.position.y;
                self.sprite.rotation = self.body.angle;
            });

            return self;
        };

        self.spawnPosition = 0;
        self.atSpawnPosition = function(position) {
            // TODO: Get spawn position from board factory
            var x = 64 + 96 * (position - 1);
            var y = 32;

            Matter.Body.setPosition(self.body, { x: x, y: y })
            self.sprite.position.x = self.body.position.x;
            self.sprite.position.y = self.body.position.y;
            self.sprite.rotation = self.body.angle;

            return self;
        };

        self.health = 20;
        self.withHealth = function(health) {
            self.health = health;

            return self;
        }
        self.reduceHealthBy = function(reduction) {
            self.health = Math.max(0, self.health - reduction);
        }
    };

    var allPlayers = [];

    return {
        create: function() {
            var playerToken = new PlayerToken();

            allPlayers += playerToken;

            return playerToken;
        }
    };
    /*
    var PlayerToken = function(player) {
      this.life = 20;

      this.damage = function () {
        if(--(this.life) <= 0) {
          this.die();
        }
      };

      this.die = function() {
        renderer.stage.removeChild(this);
        physics.remove(this.body);
      };
    };

  return {
      spawn : function (player) {
        var token = new PlayerToken(player);
        var x = 64 + 96 * (player.spawn - 1);
        var y = 32;

        Matter.Body.setPosition(token.body, { x: x, y: y })
        token.body.restitution = 0.8;
      
        physics.add(token.body);

        tokens.push(token);
      },

      update : function () {
        tokens.forEach(function(token) {
          token.applyPhysics();
        }, this);
      },

      get numberOfAliveTokens () {
        var number = 0;
        tokens.forEach(function(token) {
          if(token.life > 0) {
            ++number;
          }
        }, this);
        return number;
      },

      get numberOfAwakeTokens () {
        var number = 0;
        tokens.forEach(function(token) {
          if(token.life > 0 && token.body.isSleeping === false) {
            ++number;
          }
        }, this);
        return number;
      }
  };*/
}]);