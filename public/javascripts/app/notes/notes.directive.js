(function () {

    'use strict';

    angular.module('customDirectives')
        .directive('notesList', function () {
            return {
                restrict: 'E',
                scope: false,
                templateUrl: 'build/partials/app/notes/notes.html',
            };
        });

}());