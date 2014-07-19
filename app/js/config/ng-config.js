var grabs = angular.module('grabs', [
        'ngRoute',
        'pageTitle'
    ]);

grabs.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    'use strict';

    $routeProvider.when('/', {
        templateUrl: '/views/home/home.html'
    }).
    when('/contact', {
        templateUrl: '/views/contact/contact.html',
        controller: 'ContactCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });

    // HTML5 Push State
    $locationProvider.html5Mode(true);
}]);
