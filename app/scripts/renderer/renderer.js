'use strict';

angular.module('plinko-app')

.service('render-service', ['properties', 'sprite', 
    function(properties, sprite) {
        var renderer;
        var stage;
        
        return {
            get stage () { return stage; },

            initialise : function(canvas, width, height) { 
                renderer = PIXI.autoDetectRenderer(properties.canvasWidth, properties.canvasHeight,{backgroundColor : 0x9EDDE7, view : canvas});
                stage = new PIXI.Container();

                this.resize(width, height);
            },

            render : function () {
                renderer.render(stage);
            },

            resize : function(width, height) {
                var ratio = properties.canvasWidth/properties.canvasHeight;
                var windowRatio = width/height;

                if(ratio>windowRatio) {
                    height = width / ratio;
                } else {
                    width = height * ratio;
                }

                console.log('view', renderer.view);

                renderer.view.style.width = width+'px';
                renderer.view.style.height = height+'px';
            }
        };
    }]);