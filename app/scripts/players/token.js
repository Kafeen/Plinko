'use strict';

angular.module('plinko-app')

    .service('token-factory', ['sprite', function (sprite) {
      var allTokens = ['elephant', 'giraffe', 'hippo', 'monkey', 'panda', 'parrot', 'penguin', 'pig', 'rabbit', 'snake'];
      var unusedTokens = allTokens.slice();

      return {
        clear : function () {
          unusedTokens = allTokens.slice();
        },

        assignRandom : function () {
          var index = Math.floor(Math.random() * unusedTokens.length);
          if(index >= 0)
          {
            var token = unusedTokens[index];
            unusedTokens.splice(index, 1);
            return {id:token, avatar:sprite.avatars[token], token:sprite.tokens[token]};
          }
          return '';
        }
      };
    }]);