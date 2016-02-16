
(function () {

    'use strict';

    angular.module('app')
        .controller('NavController', function () {
            var vm = this;

            vm.views = {
                movies: 'Home',
                contact: 'Contact'
            };

        });

}());