(function () {

    'use strict';

    angular.module('app')
        .controller('NotesController', function (notes, NotesService) {
            var vm = this;

            vm.notes = notes;

            vm.newNote = '';

            vm.addNote = function () {

                var note = [{
                    content: vm.newNote.toString(),
                    date: Date.now()
                }];
                NotesService.makeNotes(note);

                vm.newNote = '';
            };

            vm.deleteNote = function (note) {
                var noteIndex = vm.notes.indexOf(note);
                vm.notes.splice(noteIndex, 1);
            };

        });

}());