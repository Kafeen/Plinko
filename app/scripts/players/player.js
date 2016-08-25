'use strict';

angular.module('plinko-app')
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
}]);