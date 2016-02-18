(function () {

    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'customDirectives', 'customFilters'])
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            /**
             * Default state
             */
            $urlRouterProvider.otherwise('/app');

            /**
             * State provider
             */
            $stateProvider
                .state('app', {
                    url: '/app',
                    templateUrl: 'build/partials/app/app.html'
                })
                .state('app.note', {
                    url: '/:note_title',
                    templateUrl: 'build/partials/app/note.html',
                    controller: 'NoteController',
                    controllerAs: 'note',
                    resolve: {
                        note: function (notes, NotesService, $stateParams) {
                            return NotesService.find($stateParams.note_title);
                        }
                    }
                });
        });
}());

