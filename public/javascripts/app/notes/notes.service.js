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
            };

            vm.getNotes = function () {
                if (localStorage.chunkynotes) {
                    vm.notes = JSON.parse(localStorage.chunkynotes);
                    return vm.makeNotes(vm.notes);
                }
            };

            vm.saveToLocalStorage = function () {

                console.log(vm.notes);

                localStorage.chunkynotes = JSON.stringify(vm.notes);
            };

            vm.find = function (note_content) {
                return _.find(vm.notes, {content: note_content});
            };


        });

}());