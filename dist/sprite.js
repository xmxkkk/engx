'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = function (_Layer) {
	_inherits(Sprite, _Layer);

	function Sprite(opt) {
		_classCallCheck(this, Sprite);

		var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, opt));

		_this.opt = opt;
		_this.type = "sprite";

		_this.width = _this.opt.width || 0;
		_this.height = _this.opt.height || 0;

		_this.anchor = opt.anchor || { x: 0.5, y: 0.5 };

		_this.texture = opt.texture || null;
		return _this;
	}

	_createClass(Sprite, [{
		key: 'draw',
		value: function draw(cxt) {
			if (this.texture) {

				cxt.save();
				this.predraw(cxt);

				if (typeof this.texture == 'string') {
					var img = _engx.sceneManager.currentScene.resource['image'][this.texture];
					this.width = this.width || img.width;
					this.height = this.height || img.height;

					cxt.drawImage(img, 0, 0, this.width, this.height);
				} else {
					this.width = this.width || this.texture.rect.width;
					this.height = this.height || this.texture.rect.height;

					this.texture.draw(cxt, { x: 0, y: 0, width: this.width, height: this.height });
				}

				cxt.beginPath();

				// cxt.globalAlpha=1;
				cxt.strokeStyle = debug ? yesColor : noColor;
				if (this.shape == "box") {
					cxt.rect(0, 0, this.width, this.height);

					var p1 = this.transformPoint([this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height]);
					var p2 = this.transformPoint([this.position.x - this.anchor.x * this.width + this.width, this.position.y - this.anchor.y * this.height]);
					var p3 = this.transformPoint([this.position.x - this.anchor.x * this.width + this.width, this.position.y - this.anchor.y * this.height + this.height]);
					var p4 = this.transformPoint([this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height + this.height]);

					this.borders = [p1, p2, p3, p4];
				} else if (this.shape == "circle") {
					cxt.arc(this.width / 2, this.height / 2, this.width / 2, 0, Math.PI * 2, true);
					this.radius = this.width / 2;
				}
				cxt.stroke();

				this.eventHandle(cxt);
				this.childrenDraw(cxt);
				cxt.restore();
			}
		}
	}]);

	return Sprite;
}(Layer);