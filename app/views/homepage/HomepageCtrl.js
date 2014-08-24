grabs.controller('HomepageCtrl', function ($scope, $route, languageService) {
    'use strict';

    $scope.lang = $route.current.key;

    languageService.getLanguageFile('homepage/' + $scope.lang).success(function (response) {
        $scope.ln = response;
    });
});
