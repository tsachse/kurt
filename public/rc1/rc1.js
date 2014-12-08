angular.module('rc1', ['ngResource'])
  .factory('RC1', function ($resource) {
    var RC1 = $resource('/api/rc1/:id', {id : '@id'});

    return RC1;
  })
  .controller('RC1Ctrl', function($scope, $location, RC1){
    $scope.cmd = function(direction) {
      // console.log(direction);
      RC1.get({'id': direction});
    }

  });
