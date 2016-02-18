(function () {

    'use strict';

    angular.module('app')
        .controller('NoteController', function (note) {
            var vm = this;
            vm.note = note;

            vm.saveChanges = function () {
                console.log(vm.note);
                console.log("edit");
                note.content = vm.newNote;
            };
        });
}());