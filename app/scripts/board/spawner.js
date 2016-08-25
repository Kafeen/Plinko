'use strict';

angular.module('plinko-app')

.service('spawn-factory', [function () {
  var indecies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var unusedIndicies = indecies.slice();
 
  return {
    clear : function () {
      unusedIndicies = indecies.slice();
    },

    assignRandom : function () {
      var index = Math.floor(Math.random() * unusedIndicies.length);
      if(index >= 0)
      {
        var ret = unusedIndicies[index];
        unusedIndicies.splice(index, 1);
        return ret;
      }
      return -1;
    }    
  };
}]);