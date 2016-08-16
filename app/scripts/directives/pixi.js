'use strict';

angular.module('plinko-app')
.controller('', ['$scope', function($scope) {

}])
.directive('pixi', function ($parse) {
  return {
    //  template: 'Hello Pixi',
    // template: '<canvas></canvas>',
    controller: function postLink($scope, $element, $attrs) {
        console.log('CONTROLLER', $scope, $element, $attrs);
        var canvas = $element[0];
        var parent = canvas.parentElement;
        canvas.style.width =parent.offsetWidth;
        canvas.style.height=parent.offsetHeight;
        canvas.width  = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        var renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height,{backgroundColor : 0xff00ff, view : canvas});

        var stage = new PIXI.Container();

        renderer.render(stage);
    }
  };
});