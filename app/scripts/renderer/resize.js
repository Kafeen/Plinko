'use strict';

angular.module('plinko-app')

.directive('resize', ['$window', 'PROPERTIES', 'render-service',
  function ($window, PROPERTIES, renderService) {
    return {
      restrict: 'A',
      link : function($scope, $element) {
        var window = angular.element($window);

        window.on('resize', onResize);

        function onResize() {
            var view = $element[0];
            var width = $window.innerWidth;
            var height = $window.innerHeight;
            var ratio = PROPERTIES.canvasWidth/PROPERTIES.canvasHeight;
            var windowRatio = width/height;

            if(ratio>windowRatio) {
                height = width / ratio;
            } else {
                width = height * ratio;
            }

            view.style.width = width+'px';
            view.style.height = height+'px';

            // $scope.$digest();
        }

        $scope.$on('$destroy', () => {
            window.off('resize', onResize);
        });

        onResize();
      }
    };
}]);