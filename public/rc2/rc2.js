angular.module('rc2', ['ngResource'])
  .factory('RC2', function ($resource) {
     var RC2 = $resource('/api/rc2/:mode/:id', {mode: '@mode', id : '@id'});
     return RC2;
   })
  .controller('RC2Ctrl', function($scope, $location, RC2){
    $scope.cmd = function(mode) {
      RC2.get({'mode': mode, 'id': 0 });
    };
    $scope.slider1 = new Slider('#direction', { 
      formatter: function(value) { 
	RC2.get({'mode': 'direction', 'id': value });
      } 
    });
    $scope.slider4 = new Slider("#speed", {
      	reversed : true,
      formatter: function(value) { 
	RC2.get({'mode': 'speed', 'id': value });
      } 

    });

  });
