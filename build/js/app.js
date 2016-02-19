(function () {

    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'customDirectives', 'customFilters'])
        .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
                    templateUrl: 'build/partials/app/app.html',
                    controller: 'NotesController',
                    controllerAs: 'notes',
                    resolve: {
                        notes: ["NotesService", function (NotesService) {
                            return NotesService.getNotes();
                        }]
                    }
                })
                .state('app.note', {
                    // TODO: use unique ID in url instead of full note_content. Same goes for `app.edit` state.
                    url: '/view/:note_content',
                    templateUrl: 'build/partials/app/notes/note.html',
                    controller: 'NoteController',
                    controllerAs: 'note',
                    resolve: {
                        note: ["notes", "NotesService", "$stateParams", function (notes, NotesService, $stateParams) {
                            return NotesService.find($stateParams.note_content);
                        }]
                    }
                })
                .state('app.edit', {
                    url: '/edit/:note_content',
                    templateUrl: 'build/partials/app/editor/edit_mode.html',
                    controller: 'NoteController',
                    controllerAs: 'note',
                    resolve: {
                        note: ["notes", "NotesService", "$stateParams", function (notes, NotesService, $stateParams) {
                            return NotesService.find($stateParams.note_content);
                        }]
                    }
                });
        }]);
}());


(function () {

    'use strict';

    angular.module('customDirectives', []);

}());
(function () {

    'use strict';

    angular.module('customFilters', []);

}());
(function () {

    'use strict';

    angular.module('app')
        .factory('Note', function () {
            function Note(data) {
                 _.merge(this, {
                     content: '',
                     date: '',
                     hidden: false,
                 }, data || {});
            }

            Note.prototype = {
                preview: function () {
                    if (this.content) {
                        if (this.content.length > 40) {
                            return this.content.substr(0, 40).replace(/\s$/, '') + '...';
                        }
                        return this.content;
                    }
                },

                hide: function () {
                    this.hidden = true;
                }

            };

            return Note;

        });

}());
(function () {

    'use strict';

    angular.module('customFilters')
        .filter('titlecase', function() {
            return function(input) {

                var title = [];

                if (input!== null) {
                    var inputCopy = input.toLowerCase().split(' ');

                    var i = 0;
                    _.each(inputCopy, function (word) {
                        if (i === 0 || !isLower(word)) {
                            title.push(word.substring(0, 1).toUpperCase() + word.substring(1));
                        } else {
                            title.push(word);
                        }
                        i++;
                    });
                }
                return title.join(' ');
            };
        });

    function  isLower(word) {
        var lWords = ['of', 'the', 'a', 'in', 'at', 'and', 'an', 'but', 'or', 'to', 'into'];

        return lWords.indexOf(word) > -1;
    }

}());
(function () {

    'use strict';

    angular.module('customFilters')
        .filter('runningHours', function () {
            return function (input) {
                return Math.floor(input / 60) + 'hr ' + (input % 60) + 'min ';
            };
        })
        .filter('reverse', function() {
            return function(input) {
                if (input) {
                    return input.slice().reverse();
                }
            };
        });
}());
(function () {

    'use strict';

    angular.module('app')
        .controller('EditorController', function () {

            var vm = this;

        });

}());
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
(function () {

    'use strict';

    angular.module('app')
        .controller('NavController', function () {

    });

}());
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
(function () {

    'use strict';

    angular.module('app')
        .controller('NoteController', ["note", "NotesService", function (note, NotesService) {
            var vm = this;
            vm.note = note;

            vm.update = function () {
                vm.note.date = Date.now();
                NotesService.setNewest(vm.note);
                NotesService.saveToLocalStorage();
            }
        }]);
}());
(function () {

    'use strict';

    angular.module('app')
        .controller('NotesController', ["notes", "NotesService", function (notes, NotesService) {
            var vm = this;

            vm.notes = notes;

            vm.newNote = '';

            vm.addNote = function () {

                var note = {
                    content: vm.newNote.toString(),
                    date: Date.now()
                };
                NotesService.saveNote(note);

                vm.newNote = '';
            };

            vm.deleteNote = function (note) {
                var noteIndex = vm.notes.indexOf(note);
                vm.notes.splice(noteIndex, 1);
                NotesService.saveToLocalStorage();
            };

        }]);

}());
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
(function () {

    'use strict';

    angular.module('app')
        .service('NotesService', ["Note", "$http", function (Note, $http) {
            var vm = this;

            vm.notes = [];

            vm.makeNotes = function (data) {
                vm.notes = [];
                _.each(data, function (l) {
                    vm.notes.push(new Note(l));
                });
                return vm.notes;
            };

            vm.saveNote = function (note) {
                vm.notes.push(new Note(note));
                vm.saveToLocalStorage();
                if (vm.notes.length === 1) {
                    return vm.notes;
                }
            };

            vm.getNotes = function () {
                if (localStorage.chunkynotes) {
                    vm.notes = JSON.parse(localStorage.chunkynotes);
                    return vm.makeNotes(vm.notes);

                } else {
                    vm.notes = vm.fakeNotes();
                    return vm.notes;
                }
            };

            vm.fakeNotes = function () {
                return $http.get('build/data/fakenotes.json')
                    .then(function (res) {
                        return vm.makeNotes(res.data);
                    }, function (err) {
                        console.log(err);
                        return 'Sorry, there has been an error processing fake notes JSON...';
                    });
            };

            vm.setNewest = function (note) {
                var noteIndex = vm.notes.indexOf(note);
                vm.notes.splice(noteIndex, 1);
                vm.notes.push(note);
                vm.saveToLocalStorage();
            };

            vm.saveToLocalStorage = function () {
                localStorage.chunkynotes = JSON.stringify(vm.notes);
            };

            vm.find = function (note_content) {
                return _.find(vm.notes, {content: note_content});
            };


        }]);

}());