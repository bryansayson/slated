angular.module('slated-search', [])

  .controller('searchController', ['$scope', '$sce', function($scope, $sce) {

      $scope.search = function() {
          // function that constructs search query
          var constructQuery = function(query) {
              console.log("searching for " + query);
              var url = "https://www.slated.com/films/autocomplete/profiles/?term=",
                  terms = query.split(" "),
                  initialized = false;
                      for (var i = 0; i < terms.length; i++) {
                          if (!initialized) {
                              url += terms[i];
                              initialized = true;
                          } else {
                              url += "%20" + terms[i];
                          }
                      }
                return url;
            }

          $scope.querystring = constructQuery($scope.query);

          //CORS get request
          $.ajax({
              type: 'GET',
              url: $scope.querystring,
              data: {
                  field: 'value'
              },
              dataType: 'jsonp',
              crossDomain: true,
          }).done(function(response){
              $scope.results = response;
              console.log("results object changed");
          }).fail(function(error){
              console.log(error);
          });

          //sanitize
          $scope.renderHtml = function(htmlCode) {
                return $sce.trustAsHtml(htmlCode);
          };

      }
  }]);
