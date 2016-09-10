function Background(texture, width, height) {
    PIXI.TilingSprite.call(this, texture, width, height);
}

Background.constructor = Background;
Background.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);