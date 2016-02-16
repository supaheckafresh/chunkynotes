(function () {

    'use strict';

    angular.module('navMenu', [])
        .directive('navbar', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '='
                },
                templateUrl: 'build/partials/navbar.html'
            };
        });
}());