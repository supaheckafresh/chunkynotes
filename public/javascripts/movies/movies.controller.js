
(function () {

    'use strict';

    angular.module('app')
        .controller('MoviesController', function (movies, MoviesService) {
            var vm = this;

            vm.movies = movies;
        });

}());

