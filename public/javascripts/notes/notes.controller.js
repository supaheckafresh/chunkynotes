(function () {

    'use strict';

    angular.module('app')
        .controller('NotesController', function () {
            var vm = this;

            vm.notes = notes;
        });

}());