(function () {

    'use strict';

    angular.module('app')
        .service('NotesService', function (Note, $http) {
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


        });

}());