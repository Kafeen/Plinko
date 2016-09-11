var PlayerToken = function(texture) {
    var self = this;
    PIXI.Sprite.call(self, PIXI.Texture.fromImage(texture));

    self.body = null;
    self.spawnPosition = 0;

    // Events
    self.onAfterUpdate = function(event) {
        self.position.x = self.body.position.x;
        self.position.y = self.body.position.y;
        self.rotation = self.body.angle;
    };

    self.onCollisionActive = function(event) {
        // Check for collision with lava
        event.pairs
            .filter((element, index, array) => {return (element.bodyA.label === "LAVA" && element.bodyB === self.body)})
        .forEach((element, index, array) => {self.reduceHealthBy(1);});
    };

    // Health
    self.health = 20;
    self.reduceHealthBy = function(reduction) {
        self.health = Math.max(0, self.health - reduction);
    }
};

PlayerToken.prototype = Object.create(PIXI.Sprite.prototype);