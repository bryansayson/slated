angular.module('slated-search', [])
  .controller('searchController', ['$scope', '$http', function($scope, $http) {
    $scope.search = function() {
      // function that constructs search query
      var constructQuery = function(query) {
          var url = "https://www.slated.com/films/autocomplete/profiles/?term="
          var terms = query.split(" ");
          var initialized = false;
          for (var i = 0; i < terms.length; i++) {
            if (!initialized) {
              url += terms[i];
              initialized = true;
            } else {
              url += "%20" + terms[i];
            }
          }
          url += "&callback=JSON_CALLBACK";
          return url;
        }
      var querystring = constructQuery($scope.query);
      console.log(querystring);
      $http({
        method: 'GET',
        url: querystring
      }).then(function successCallback(response) {
        console.log("SUCCESSFUL");
        console.log(response);
        $scope.results = response;
      }, function errorCallback(response) {
        console.log("ERROR");
      });
      console.log("RESULTS ARE");
      console.log($scope.results);
    }
  }]);
