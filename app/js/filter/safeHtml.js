// Safe HTML Filter
grabs.filter('safeHtml', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
