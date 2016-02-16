(function () {

    'use strict';

    angular.module('app')
        .service('MoviesService', function (Movie, $http) {

            var vm = this;

            vm.movies = [];

            vm.makeMovies = function (data) {
                _.each(data, function (l) {
                    vm.movies.push(new Movie(l));
                });
                return vm.movies;
            };

            vm.getMovies = function () {
                return $http.get('build/data/movies.json')
                    .then(function (res) {
                        return vm.makeMovies(res.data);
                    }, function (err) {
                        console.log(err);
                        return 'Sorry, there has been an error...';
                    });
            };

            vm.find = function (movie_title) {
                return _.find(vm.movies, {title: movie_title});
            };
        });
}());