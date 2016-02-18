(function () {

    'use strict';

    angular.module('app')
        .service('NotesService', function (Note, $http) {
            var vm = this;



            vm.makeNotes = function (data) {
                vm.notes = [];
                _.each(data, function (l) {
                    vm.notes.push(new Note(l));
                    vm.saveToLocalStorage();
                });
                console.log('local storage ' + JSON.parse(localStorage.chunkynotes));
                return vm.notes;
            };

            vm.getNotes = function () {
                if (localStorage.chunkynotes) {
                    vm.notes = JSON.parse(localStorage.chunkynotes);
                    console.log('local storage is not empty');
                    return vm.notes;

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

            vm.saveToLocalStorage = function () {
                console.log(vm.notes);
                localStorage.chunkynotes = JSON.stringify(vm.notes);
            };

            vm.find = function (note_content) {
                return _.find(vm.notes, {content: note_content});
            };


        });

}());