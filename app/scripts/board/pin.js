var Pin = function (texture) {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(texture));
    this.pivot.x = 24 / 2;
    this.pivot.y = 24 / 2;

    this.body = Matter.Bodies.circle(0, 0, 10, {isStatic: true});
};

Pin.prototype = Object.create(PIXI.Sprite.prototype);
