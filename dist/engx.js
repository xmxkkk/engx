'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = console.log;

var Engx = function () {
	function Engx(canvas, opt) {
		_classCallCheck(this, Engx);

		window._engx = this;

		this.status = "stop";

		this.render = new Render(canvas, opt);
		this.sceneManager = new SceneManager();
		this.eventManager = new EventManager();
		this.musicManager = new MusicManager();
		this.collision = new Collision();
	}

	_createClass(Engx, [{
		key: "start",
		value: function start(onStart) {
			this.render.start();
			onStart && onStart();
			this.status = "start";
		}
	}, {
		key: "stop",
		value: function stop(onStop) {
			this.render.stop();
			onStop && onStop();
			this.status = "stop";
		}
	}, {
		key: "pause",
		value: function pause(onPause) {
			this.render.pause();
			onPause && onPause();
			this.status = "pause";
		}
	}]);

	return Engx;
}();