var grabs = angular.module('grabs', ['ngRoute']);

grabs.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    'use strict';

    $routeProvider.when('/', {
        templateUrl: '/views/mainpage/mainpage.html'
    }).
    when('/contact', {
        templateUrl: '/views/contact/contact.html'
    }).
    otherwise({
        redirectTo: '/'
    });

    // HTML5 Push State
    $locationProvider.html5Mode(true);
}]);
