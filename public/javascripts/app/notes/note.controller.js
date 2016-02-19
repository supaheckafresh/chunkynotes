(function () {

    'use strict';

    angular.module('app')
        .controller('NoteController', function (note, NotesService) {
            var vm = this;
            vm.note = note;

            vm.update = function () {
                vm.note.date = Date.now();
                NotesService.saveToLocalStorage();
            }
        });
}());