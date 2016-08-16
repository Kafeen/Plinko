'use strict';

angular.module('plinko-app')
.controller('', ['$scope', function($scope) {

}])
.directive('pixi', function ($parse) {
  return {
    controller: function postLink($scope, $element, $attrs) {
        console.log('CONTROLLER', $scope, $element, $attrs);
        var canvas = $element[0];
        var parent = canvas.parentElement;
        canvas.style.width =parent.offsetWidth;
        canvas.style.height=parent.offsetHeight;
        canvas.width  = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        var renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height,{backgroundColor : 0x9EDDE7, view : canvas});
        var stage = new PIXI.Container();

        var farTexture = PIXI.Texture.fromImage("assets/background/cloud1.png");
        var far = new PIXI.Sprite(farTexture);
        stage.addChild(far);

        console.log(farTexture);

        var update = function update() {
          renderer.render(stage);

          requestAnimationFrame(update);
        }

        requestAnimationFrame(update);                
    }
  };
});