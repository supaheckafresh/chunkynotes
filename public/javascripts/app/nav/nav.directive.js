(function () {

    'use strict';

    angular.module('customDirectives')
        .directive('navbar', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '='
                },
                templateUrl: 'build/partials/app/nav/navbar.html'
            };
        });
}());