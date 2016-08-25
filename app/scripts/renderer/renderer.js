'use strict';

angular.module('plinko-app')

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
    },

    render : function () {
      renderer.render(stage);
    }
  };
}]);