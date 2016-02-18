(function () {

    'use strict';

    angular.module('app')
        .factory('Note', function () {
            function Note(data) {
                 _.merge(this, {
                     content: '',
                     date: ''
                 }, data || {});
            }

            Note.prototype = {
                preview: function () {
                    return this.content.substr(0, 25).replace(/\s$/, '') + '...';
                }

            };

            return Note;

        });

}());