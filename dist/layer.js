"use strict";
'user strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layer = function (_Node) {
        _inherits(Layer, _Node);

        function Layer(opt) {
                _classCallCheck(this, Layer);

                var _this = _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).call(this, opt));

                _this.type = "layer";

                _this.opt = opt;

                _this.width = _this.opt.width || _engx.render.width;
                _this.height = _this.opt.height || _engx.render.height;

                _this.anchor = opt.anchor || {
                        x: 0,
                        y: 0
                };

                _this.scene = null;
                _this.background = opt.background || null;
                return _this;
        }

        _createClass(Layer, [{
                key: "addSprite",
                value: function addSprite(sprite) {
                        this.addNode(sprite);
                }
        }, {
                key: "draw",
                value: function draw(cxt) {
                        cxt.save();
                        this.predraw(cxt);

                        cxt.beginPath();
                        cxt.strokeStyle = debug ? yesColor : noColor;
                        cxt.rect(0, 0, this.width, this.height);
                        cxt.stroke();

                        cxt.globalAlpha = 1;
                        cxt.fillStyle = this.background ? this.background : noColor;
                        cxt.fillRect(0, 0, this.width, this.height);

                        var p1 = this.transformPoint([this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height]);
                        var p2 = this.transformPoint([this.position.x - this.anchor.x * this.width + this.width, this.position.y - this.anchor.y * this.height]);
                        var p3 = this.transformPoint([this.position.x - this.anchor.x * this.width + this.width, this.position.y - this.anchor.y * this.height + this.height]);
                        var p4 = this.transformPoint([this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height + this.height]);

                        this.borders = [p1, p2, p3, p4];

                        this.eventHandle(cxt);
                        this.childrenDraw(cxt);
                        cxt.restore();
                }
        }]);

        return Layer;
}(Node);