(function () {

    'use strict';

    angular.module('app')
        .factory('Note', function () {
            function Movie(data) {
                _.merge(this, {
                    title: '',
                    runTime: '',
                    releaseYear: '',
                    genre: '',
                    description: '',
                    checkedIn: true
                }, data || {});
            }

            Note.prototype = {
                shortDesc: function () {
                    return this.description.substr(0, 25).replace(/\s$/, '') + '...';
                },
                checkInOut: function () {
                    if (this.checkedIn) {
                        alert('This movie is available...');
                        this.checkedIn = !confirm('Would you like to check it out?');
                    }
                    else {
                        alert('This movie is currently unavailable...');
                        this.checkedIn = confirm('Would you like to check it in?');
                    }
                }
            };

            return Note;
        });
}());