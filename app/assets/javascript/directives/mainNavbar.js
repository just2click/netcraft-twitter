angular.module("NetCraftTwitter").directive('mainNavBar', function(){
  return {
    replace: true,
    restrict: "E",
    templateUrl: "assets/templates/directives/navbar.html",
    controller: function($scope, $location){
      $scope.isPage = function(name){
        return new RegExp("/" + name + "($|/)").test($location.path());
      };
    }
  };
});
