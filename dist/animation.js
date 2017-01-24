'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Animation = function (_Sprite) {
    _inherits(Animation, _Sprite);

    function Animation(opt) {
        _classCallCheck(this, Animation);

        var _this = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this, opt));

        _this.opt = opt;
        _this.type = "animation";

        _this.updateFrame = opt.updateFrame || null;
        _this.intervalTime = opt.intervalTime || 150;
        _this.frames = [];
        _this.currentIndex = opt.currentIndex || 0;
        _this.status = "stop";
        _this.action = null;

        _this.prevIndex = _this.currentIndex;
        return _this;
    }

    _createClass(Animation, [{
        key: "addFrame",
        value: function addFrame(texture) {
            this.frames.push(texture);
        }
        // step(){
        // 	this.currentIndex=(++this.currentIndex) % (this.frames.length);
        // }

    }, {
        key: "stop",
        value: function stop() {
            this.action && this.action.stop();
            this.status = "stop";
            this.currentIndex = this.opt.currentIndex || 0;
        }
    }, {
        key: "run",
        value: function run(times, _onComplete) {
            if (this.status == "start") {
                return;
            }

            var self = this;

            var repeat = times == undefined ? 0 : times;
            this.action = new AnimateAction({
                time: this.intervalTime * this.frames.length,
                currentIndex: this.frames.length,
                repeat: repeat,
                onComplete: function onComplete(val) {
                    self.status = "stop";
                    _onComplete && _onComplete(val);
                }
            });
            this.runAction(this.action);
            this.status = "start";
        }
    }, {
        key: "draw",
        value: function draw(cxt) {
            if (this.frames.length > 0) {
                cxt.save();
                this.predraw(cxt);

                this.currentIndex = parseInt(this.currentIndex) % this.frames.length;

                if (this.updateFrame && this.prevIndex != this.currentIndex) {
                    this.updateFrame();
                }

                this.prevIndex = this.currentIndex;

                var texture = this.frames[this.currentIndex];

                this.width = this.width || texture.rect.width;
                this.height = this.height || texture.rect.height;

                texture.draw(cxt, {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height
                });

                cxt.beginPath();

                cxt.globalAlpha = 1;
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

    return Animation;
}(Sprite);