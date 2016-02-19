(function () {

    'use strict';

    angular.module('customFilters')
        .filter('runningHours', function () {
            return function (input) {
                return Math.floor(input / 60) + 'hr ' + (input % 60) + 'min ';
            };
        })
        .filter('reverse', function() {
            return function(input) {
                if (input) {
                    return input.slice().reverse();
                }
            };
        });
}());