'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MusicManager = function () {
    function MusicManager() {
        _classCallCheck(this, MusicManager);

        this.musics = [];
    }

    _createClass(MusicManager, [{
        key: 'addMusic',
        value: function addMusic(music) {
            this.musics[music.id] = music;
        }
    }, {
        key: 'removeMusic',
        value: function removeMusic(music) {
            delete this.musics[music.id];
        }
    }]);

    return MusicManager;
}();