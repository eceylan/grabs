var grabs = angular.module('grabs', [
        'ngRoute',
        'pageTitle'
    ]);

grabs.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    'use strict';

    $routeProvider.when('/', {
        templateUrl: '/views/homepage/homepage.html',
        controller: 'HomepageCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });

    // HTML5 Push State
    $locationProvider.html5Mode(true);
}]);
