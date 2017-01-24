'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Render = function () {
	function Render(canvas, opt) {
		_classCallCheck(this, Render);

		this.canvas = canvas;
		this.opt = opt;

		this.width = this.opt.width || 800;
		this.height = this.opt.height || 600;
		this.background = this.opt.background || 'rgb(88,88,88)';

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.background = this.background;

		this.init();
	}

	_createClass(Render, [{
		key: 'init',
		value: function init() {
			this.fps = this.opt.fps || 60;
			this.interval = 1000.0 / this.fps;
			this.times = 0;
			this.status = "stop";

			this.canvasBuffer = document.createElement("canvas");
			this.canvasBuffer.width = this.canvas.width;
			this.canvasBuffer.height = this.canvas.height;

			this.context = this.canvas.getContext("2d");
			this.contextBuffer = this.canvasBuffer.getContext("2d");
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.contextBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

			this.realFps = this.fps;
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			return this.times * this.interval;
		}
	}, {
		key: 'render',
		value: function render() {
			var scene = _engx.sceneManager.currentScene;
			if (scene) {
				_engx.collision.check();

				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.contextBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

				//contextBuffer用于绘制的cxt
				scene && scene.draw && scene.draw(this.contextBuffer);

				this.context.drawImage(this.canvasBuffer, 0, 0);

				TWEEN.update(this.getTime());

				++this.times;
			}
		}
	}, {
		key: '_startRender',
		value: function _startRender() {
			// this.handleId=setInterval(this.render,this.interval);
			this.status = "start";
			var timeFunc = function timeFunc(r) {
				if (r.status == "start") {
					var benchStart = new Date().getTime();
					r.render();
					r.handleId = setTimeout(timeFunc, r.interval, r);
					r.realFps = parseInt(1000.0 / (new Date().getTime() - benchStart + r.interval));
				} else if (r.handleId == "stop") {
					clearTimeout(r.handleId);
					r.handleId = 0;
				}
			};
			this.handleId = setTimeout(timeFunc, this.interval, this);
		}
	}, {
		key: '_stopRender',
		value: function _stopRender() {
			this.status = "stop";
			if (this.handleId) {
				log("stop=" + this.handleId);
				clearTimeout(this.handleId);
				this.handleId = 0;
			}
		}
	}, {
		key: 'start',
		value: function start() {
			this._startRender();
		}
	}, {
		key: 'stop',
		value: function stop() {
			this._stopRender();
		}
	}, {
		key: 'pause',
		value: function pause() {
			this._stopRender();
		}
	}]);

	return Render;
}();