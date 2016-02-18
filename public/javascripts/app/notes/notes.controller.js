(function () {

    'use strict';

    angular.module('app')
        .controller('NotesController', function (notes, NotesService) {
            var vm = this;

            vm.notes = notes;
        });
}());