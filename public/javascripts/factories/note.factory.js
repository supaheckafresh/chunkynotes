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
                    if (this.content.length > 40) {
                        return this.content.substr(0, 40).replace(/\s$/, '') + '...';
                    }
                    return this.content;
                }
            };

            return Note;

        });

}());