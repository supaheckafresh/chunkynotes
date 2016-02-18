(function () {

    'use strict';

    angular.module('customDirectives')
        .directive('editor', function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'build/partials/app/editor/editor.html'
            };
        });

}());