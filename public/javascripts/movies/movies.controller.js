
(function () {

    'use strict';

    angular.module('app')
        .controller('NotesController', function (movies, MoviesService) {
            var vm = this;

            vm.movies = movies;
        });

}());

