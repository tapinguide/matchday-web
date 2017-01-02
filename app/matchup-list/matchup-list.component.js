'use strict';

// Register `matchupList` component, along with its associated controller and template
angular.
  module('matchupList').
  component('matchupList', {
    templateUrl: 'matchup-list/matchup-list.template.html',
    controller: ['$scope', '$http', function MatchupListController($scope, $http) {
       var self = this;
       self.matches = [];
       $http.get('https://jsonplaceholder.typicode.com/albums').
        then(function(response) {
            self.matches = response.data;
        });
    }]
  });
