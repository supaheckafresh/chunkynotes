(function () {

    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'customFilters', 'navMenu'])
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            /**
             * Default state
             */
            $urlRouterProvider.otherwise('/notes');

            /**
             * State provider
             */
            $stateProvider
                .state('notes', {
                    url: '/notes',
                    templateUrl: 'build/partials/movies/app.html',
                    controller: 'NotesController',
                    controllerAs: 'notes',
                    resolve: {
                        notes: function (NotesService) {
                            return NotesService.getNotes();
                        }
                    }
                })
                .state('notes.note', {
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

