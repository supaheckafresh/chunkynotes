(function () {

    'use strict';

    angular.module('app')
        .controller('NotesController', function (notes, NotesService) {
            var vm = this;

            vm.notes = notes;

            vm.newNote = '';

            vm.addNote = function () {
                console.log(vm.newNote);

                var note = [{
                    content: vm.newNote.toString(),
                    date: Date.now()
                }];
                NotesService.makeNotes(note);

                vm.noteForm = '';
            };

        });

}());