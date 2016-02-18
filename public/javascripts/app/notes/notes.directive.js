(function () {

    'use strict';

    angular.module('customDirectives')
        .directive('notesList', function () {
            return {
                restrict: 'E',
                scope: {
                    items: '='
                },
                templateUrl: 'build/partials/app/notes/notes.html',
            };
        });

}());