(function () {
    angular.module('myApp.directives', [])
        .directive('searchbox', [function () {
            return {
                restrict: 'AE',
                templateUrl: '/theme/bcbento/partials/searchbox.html'
            }
        }])
        .directive('results',[function() {
            return {
                restrict: 'AE',
                templateUrl: '/theme/bcbento/partials/results.html'
            }
        }]);
})();