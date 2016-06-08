angular.module('slated-search', [])

  .controller('searchController', ['$scope', '$sce', function($scope, $sce) {

      $scope.search = function() {
          console.log("searching");
          // function that constructs search query
          var constructQuery = function(query) {
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

          var querystring = constructQuery($scope.query);

          //CORS get request
          $.ajax({
              type: 'GET',
              url: querystring,
              data: {
                  field: 'value'
              },
              dataType: 'jsonp',
              crossDomain: true,
          }).done(function(response){
              $scope.results = response;
              console.log(response);
          }).fail(function(error){
              console.log(error.statusText);
          });

          $scope.renderHtml = function(htmlCode) {
              console.log("rendering");
              console.log(htmlCode);
              return $sce.trustAsHtml(htmlCode);
          };

      }
  }]);
