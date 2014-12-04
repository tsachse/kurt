angular.module('kurt', ['ngResource','ngRoute'])
  .config(function($routeProvider) {

    $routeProvider
      .when('/list', {templateUrl: '/kurt/tpls/list.html'})

      .otherwise({redirectTo: '/list'});
  })
  .factory('Kurt', function ($resource) {
    var Kurt = $resource('/api/kurt/:id', {id : '@id'});

    return Kurt;
  })
  .controller('ListKurtCtrl', function($scope, $routeParams, $location, Kurt){
    $scope.cmd = function(direction) {
      console.log(direction);
      Kurt.get({'id': direction});
    }

  })
  .controller('KurtCtrl', function ($scope) {
  });
