// Define the `phonecatApp` module
const plinkoApp = angular.module('plinko-app', ['ngMaterial']);

// Define the `PhoneListController` controller on the `phonecatApp` module
plinkoApp.controller('plinko-controller', $scope => {
  $scope.players = [];
  $scope.newuser = {name:''};

  $scope.addPlayer = function () {
    $scope.players.push($scope.newuser);
    $scope.newuser = {name:''};  
  };
});
