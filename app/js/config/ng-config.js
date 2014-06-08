angular.module('grabs', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        'use strict';

        // HTML5 Push State
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: '/index.html'
        })
        .when('/contact', {
            controller:'ContactCtrl',
            templateUrl: '/views/contact/contact.html'
        }).
        otherwise(
            redirectTo: '/'
        );
    });
