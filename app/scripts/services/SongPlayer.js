(function() {
    function SongPlayer() {
         var SongPlayer = {};

         var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and Loads new audio file as currentBuzzObject
         * @param {Object} song
         */

         var setSong = function(song) {
             if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
             });

             currentSong = song;
         }

         /*var playSong = function(song) {
             currentBuzzObject.play();
             song.Playing = true;
         }*/

         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 currentBuzzObject.play();
                 song.Playing = true;
               } else if (currentSong === song) {
                   if (currentBuzzObject.isPaused()) {
                       currentBuzzObject.play();
                   }
               }
        };

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }

         return SongPlayer;
    }

    angular
        .module('blocjams')
        .factory('SongPlayer', SongPlayer);
})();
