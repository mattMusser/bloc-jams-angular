(function() {
    function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();

         /**
         * @function getSongIndex
         * @desc gets the index of a song
         * @param song
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };

         SongPlayer.currentSong = null;

         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;

         /**
         * @desc The volume value
         * @type {Number}
         */
         SongPlayer.volume = 50;

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
                SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
             });

             currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });

             SongPlayer.currentSong = song;
         }

         SongPlayer.currentSong = null;

         /**
         * @function playSong
         * @desc Starts playing the currentBuzzObject
         * @param {Object} song
         */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };

         /**
         * @function stopSong
         * @desc Stops the currentBuzzObject
         * @param {Object} song
         */
         var stopSong = function(song) {
             currentBuzzObject.stop();
             song.playing = null;
         };

         /**
         * @method play
         * @desc Play current song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
               } else if (SongPlayer.currentSong === song) {
                   if (currentBuzzObject.isPaused()) {
                       playSong(song);
                   }
               }
        };

        /**
        * @method pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @method previous
        * @desc Gets the index of the currently playing song and then decreaces that index by one.
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @method next
        * @desc Gets the index of the currently playing song and then advances it by one.
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc Sets the volume
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if(currentBuzzObject) {
               currentBuzzObject.setVolume(volume);
            }
        };

         return SongPlayer;
    }

    angular
        .module('blocjams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
