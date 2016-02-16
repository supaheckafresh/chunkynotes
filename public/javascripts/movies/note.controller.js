(function () {

    'use strict';

    angular.module('app')
        .controller('NoteController', function (note) {
            var vm = this;

            vm.note = note;
        });

}());