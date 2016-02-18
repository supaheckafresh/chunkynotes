(function () {

    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'customFilters', 'navMenu'])
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
                    templateUrl: 'build/partials/notes/app.html',
                    controller: 'NotesController',
                    controllerAs: 'notes',
                    resolve: {
                        notes: function (NotesService) {
                            return NotesService.getNotes();
                        }
                    }
                })
                .state('app.note', {
                    url: '/:note_title',
                    templateUrl: 'build/partials/notes/note.html',
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

