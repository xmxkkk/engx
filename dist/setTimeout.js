'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SetTimeout = function () {
	function SetTimeout(opt) {
		_classCallCheck(this, SetTimeout);

		this.time = opt.time || 0;
		this.callback = opt.callback || null;

		this.timeoutAction = null;
	}

	_createClass(SetTimeout, [{
		key: 'run',
		value: function run() {
			this.timeoutAction = new TimeoutAction({ delay: this.time, onStart: this.callback });
			this.timeoutAction.start();
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.timeoutAction.stop();
		}
	}]);

	return SetTimeout;
}();