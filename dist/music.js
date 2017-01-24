'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Music = function () {
    function Music(opt) {
        _classCallCheck(this, Music);

        var loop = opt.loop || false;
        this.audioName = opt.audioName || null;
        this.volume = opt.volume || 1.;

        var audio_ = _engx.sceneManager.currentScene.resource['audio'][this.audioName];

        this.id = randomId();

        this.audio = new Audio(audio_.src);
        this.audio.proload = "auto";
        this.audio.volume = this.volume;
        this.audio.load();

        _engx.musicManager.addMusic(this);
    }

    _createClass(Music, [{
        key: 'start',
        value: function start() {
            this.audio.volume = 0.1;
            this.audio.play();
            this.status = "start";
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.audio.currentTime = 0;
            this.audio.pause();
            this.status = "stop";
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.audio.pause();
            this.status = "pause";
        }
    }]);

    return Music;
}();