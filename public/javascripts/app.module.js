(function () {

    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'customFilters', 'navMenu'])
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            /**
             * Default state
             */
            $urlRouterProvider.otherwise('/movies');

            /**
             * State provider
             */
            $stateProvider
                .state('movies', {
                    url: '/movies',
                    templateUrl: 'build/partials/movies/movies.html',
                    controller: 'MoviesController',
                    controllerAs: 'movies',
                    resolve: {
                        movies: function (MoviesService) {
                            return MoviesService.getMovies();
                        }
                    }
                })
                .state('movies.movie', {
                    url: '/:movie_title',
                    templateUrl: 'build/partials/movies/movie.html',
                    controller: 'MovieController',
                    controllerAs: 'movie',
                    resolve: {
                        movie: function (movies, MoviesService, $stateParams) {
                            return MoviesService.find($stateParams.movie_title);
                        }
                    }
                });
        });
}());

