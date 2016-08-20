// Define the `phonecatApp` module
const plinkoApp = angular.module('plinko-app', ['ngMaterial']);

// Define the `PhoneListController` controller on the `phonecatApp` module
plinkoApp.controller('plinko-controller', ['$scope', ($scope) => {
  console.log($scope);

  $scope.players = [];
  $scope.newuser = {name:''};
  $scope.gameInplay = false;

  $scope.addPlayer = function () {
    $scope.players.push($scope.newuser);
    $scope.newuser = {name:''};  
  };

  $scope.startGame = function () {
    $scope.gameInplay = true;    
  };
}]);
