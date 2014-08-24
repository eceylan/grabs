// Grabs Languaga Service
grabs.factory('languageService', function($http) {
    'use strict';

    return {
        getLanguageFile: function (path) {
            return $http.get('views/' + path + '.json');
        }
    }
});
