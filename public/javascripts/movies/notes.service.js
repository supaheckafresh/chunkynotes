(function () {

    'use strict';

    angular.module('app')
        .service('NotesService', function (Note, $http) {

            var vm = this;

            vm.notes = [];

            vm.makeNotes = function (data) {
                _.each(data, function (l) {
                    vm.notes.push(new Note(l));
                });
                return vm.notes;
            };

            vm.getNotes = function () {
                return $http.get('build/data/notes.json')
                    .then(function (res) {
                        return vm.makeNotes(res.data);
                    }, function (err) {
                        console.log(err);
                        return 'Sorry, there has been an error processing notes...';
                    });
            };

            vm.find = function (note_title) {
                return _.find(vm.notes, {title: note_title});
            };
        });
}());