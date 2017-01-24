'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_Layer) {
    _inherits(Text, _Layer);

    function Text(opt) {
        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, opt));

        _this.type = "text";

        _this.fontStyle = opt.fontStyle || "normal";
        _this.fontFamily = opt.fontFamily || "'宋体'";
        _this.textAlign = opt.textAlign || "center";
        _this.textBaseline = opt.textBaseline || "middle";
        _this.fontWeight = opt.fontWeight || 400;
        _this.fontSize = opt.fontSize || 12;
        _this.text = opt.text || "";
        _this.style = opt.style || "fill";
        _this.fillStyle = opt.fillStyle || "rgb(200,200,200)";
        _this.strokeStyle = opt.strokeStyle || "rgb(200,200,200)";
        return _this;
    }

    _createClass(Text, [{
        key: "draw",
        value: function draw(cxt) {
            if (this.text) {
                cxt.save();

                cxt.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
                cxt.textAlign = this.textAlign;
                cxt.textBaseline = this.textBaseline;
                cxt.fillStyle = this.fillStyle;
                cxt.strokeStyle = this.strokeStyle;

                var rect = cxt.measureText(this.text); // TextMetrics object
                this.width = rect.width;
                this.height = this.fontSize;

                if (this.textAlign == "left") {
                    this.anchor.x = 0;
                } else if (this.textAlign == "center") {
                    this.anchor.x = 0.5;
                } else if (this.textAlign == "right") {
                    this.anchor.x = 1;
                }
                if (this.textBaseline == "top") {
                    this.anchor.y = 0;
                } else if (this.textBaseline == "middle") {
                    this.anchor.y = 0.5;
                } else if (this.textBaseline == "bottom") {
                    this.anchor.y = 1;
                }

                this.predraw(cxt);
                if (this.style == "fill") {
                    cxt.fillText(this.text, this.anchor.x * this.width, 0 + this.anchor.y * this.height);
                } else if (this.style = "stroke") {
                    cxt.strokeText(this.text, this.anchor.x * this.width, 0 + this.anchor.y * this.height);
                }
                cxt.beginPath();

                // cxt.globalAlpha=1;
                cxt.strokeStyle = debug ? yesColor : noColor;
                cxt.rect(0, 0, this.width, this.height);

                cxt.stroke();
                this.eventHandle(cxt);
                this.childrenDraw(cxt);
                cxt.restore();
            }
        }
    }]);

    return Text;
}(Layer);