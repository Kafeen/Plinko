// Define the `phonecatApp` module
const plinkoApp = angular.module('plinko-app', ['ngMaterial']);

// Define the `PhoneListController` controller on the `phonecatApp` module
plinkoApp.controller('plinko-controller', ['$scope', 'game-service', 'token-factory', 'spawn-factory',
  ($scope, game, tokenFactory, spawnFactory) => {
      console.log($scope);

      $scope.maxPlayers = 10;
      $scope.players = [];
      $scope.newuser = {name: '', token: tokenFactory.assignRandom(), spawn: spawnFactory.assignRandom()};
      $scope.gameInplay = false;

      $scope.addPlayer = function () {
          $scope.players.push($scope.newuser);
          $scope.newuser = {name: '', token: tokenFactory.assignRandom(), spawn: spawnFactory.assignRandom()};
      };

      $scope.startGame = function () {
          $scope.gameInplay = true;
          game.startGame($scope.players);
      };
  }
]);
