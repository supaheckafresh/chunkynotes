(function () {

    'use strict';

    angular.module('app')
        .controller('MovieController', function (movie) {
            var vm = this;

            vm.movie = movie;
        });

}());