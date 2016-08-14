describe('plinko-controller', function() {

  beforeEach(module('plinko-app'));

  it('should create a `players` model with 3 players', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('plinko-controller', {$scope: scope});

    expect(scope.platers.length).toBe(3);
  }));

});