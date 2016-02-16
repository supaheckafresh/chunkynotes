(function () {

    'use strict';

    angular.module('customFilters')
        .filter('titlecase', function() {
            return function(input) {

                var title = [];

                if (input!== null) {
                    var inputCopy = input.toLowerCase().split(' ');

                    var i = 0;
                    _.each(inputCopy, function (word) {
                        if (i === 0 || !isLower(word)) {
                            title.push(word.substring(0, 1).toUpperCase() + word.substring(1));
                        } else {
                            title.push(word);
                        }
                        i++;
                    });
                }
                return title.join(' ');
            };
        });

    function  isLower(word) {
        var lWords = ['of', 'the', 'a', 'in', 'at', 'and', 'an', 'but', 'or', 'to', 'into'];

        return lWords.indexOf(word) > -1;
    }

}());