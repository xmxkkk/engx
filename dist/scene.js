'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = function (_Node) {
    _inherits(Scene, _Node);

    function Scene(opt) {
        _classCallCheck(this, Scene);

        var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, opt));

        _this.type = "scene";

        _this.width = opt.width || _engx.render.width;
        _this.height = opt.height || _engx.render.height;

        _this.anchor = opt.anchor || { x: 0, y: 0 };

        _this.resource = [];
        _this.resource['image'] = [];
        _this.resource['audio'] = [];

        _this.enter = opt.enter || null;
        _this.leave = opt.enter || null;

        _this.resourceData = null;
        var layer = new Layer({});
        _this.addLayer(layer);

        _this.fpsText = null;
        return _this;
    }

    _createClass(Scene, [{
        key: 'addResource',
        value: function addResource(resourceData) {
            if (this.resourceData) {
                this.resourceData = this.resourceData.concat(resourceData);
            } else {
                this.resourceData = resourceData;
            }
        }
    }, {
        key: 'loadResource',
        value: function loadResource(callback) {
            if (this.resourceData) {
                var self = this;

                var len = this.resourceData.length;
                for (var i = 0; i < len; i++) {
                    if (this.resourceData[i].type == "image") {
                        var img = new Image();
                        img.src = this.resourceData[i].url;
                        img.name = this.resourceData[i].name;
                        img.onload = function () {
                            self.resource['image'][this.name] = this;
                            len--;
                            if (len <= 0) {
                                callback();
                                log("callback1");
                            }
                        };
                    } else if (this.resourceData[i].type == "audio") {
                        var media = new Audio(this.resourceData[i].url);
                        media.name = this.resourceData[i].name;
                        media.preload = "auto";
                        media.load();

                        media.handleId = setInterval(function (m) {
                            if (m.readyState == 4) {
                                clearTimeout(m.handleId);
                                self.resource['audio'][m.name] = m;
                                len--;
                                if (len <= 0) {
                                    callback();
                                    log("callback2");
                                }
                            }
                        }, 10, media);
                    }
                }
            } else {
                callback();
                log("callback3");
            }
        }
    }, {
        key: 'draw',
        value: function draw(cxt) {
            if (debug) {
                if (!this.fpsText) {
                    this.fpsText = new Text({
                        fontSize: 30,
                        textAlign: 'left',
                        textBaseline: 'top'
                    });
                    var layer = this.firstLayer();
                    layer.addNode(this.fpsText);
                }
                this.fpsText.text = _engx.render.realFps;
            }
            this.childrenDraw(cxt);
        }
    }, {
        key: 'addLayer',
        value: function addLayer(layer) {
            layer.parent = this;
            layer.scene = this;

            this.addNode(layer);
        }
    }, {
        key: 'firstLayer',
        value: function firstLayer() {
            return this.children[0];
        }
    }, {
        key: 'lastLayer',
        value: function lastLayer() {
            return this.children[this.children.length - 1];
        }
    }, {
        key: 'addSprite',
        value: function addSprite(sprite) {
            this.children[0].addSprite(sprite);
        }
    }, {
        key: 'release',
        value: function release() {
            log("release");
        }
    }]);

    return Scene;
}(Node);