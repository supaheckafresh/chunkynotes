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
                return $http.get('build/data/fakenotes.json')
                    .then(function (res) {
                        return vm.makeNotes(res.data);
                    }, function (err) {
                        console.log(err);
                        return 'Sorry, there has been an error...';
                    });
            };

            vm.find = function (note_content) {
                console.log(note_content);
                return _.find(vm.notes, {content: note_content});
            };

        });

}());