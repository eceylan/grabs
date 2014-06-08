var grabs = angular.module('grabs', ['ngRoute']);

grabs.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    // HTML5 Push State
    //$locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        template: 'Index Page Detail...'
    }).
    when('/contact', {
        templateUrl: '/views/contact/contact.html'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);
