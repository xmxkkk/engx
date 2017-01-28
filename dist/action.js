'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function () {
    function Action(opt) {
        _classCallCheck(this, Action);

        this.delay = opt.delay || 0;
        this.onStart = opt.onStart || null;
        // this.onUpdate=opt.onUpdate||null;
        this.onComplete = opt.onComplete || null;
        this.onStop = opt.onStop || null;

        this.time = opt.time || 1000;
        this.repeat = opt.repeat || 0;
        this.repeatDelay = opt.repeatDelay || null;
        this.yoyo = opt.yoyo || false;

        this.easing = opt.easing || TWEEN.Easing.Linear.None;
        this.sprite = null;
        this.tween = null;
    }

    _createClass(Action, [{
        key: 'preStart',
        value: function preStart(oldProp, newProp, update) {
            this.tween = new TWEEN.Tween(oldProp).to(newProp, this.time).onStart(this.onStart).onUpdate(update).onStop(this.onStop).onComplete(this.onComplete).delay(this.delay).repeat(this.repeat).repeatDelay(this.repeatDelay).yoyo(this.yoyo).easing(this.easing).start(_engx.render.getTime());
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.tween && this.tween.stop();
        }
    }, {
        key: 'end',
        value: function end() {
            this.tween && this.tween.end();
        }
    }]);

    return Action;
}();

var MoveToAction = function (_Action) {
    _inherits(MoveToAction, _Action);

    function MoveToAction(opt) {
        _classCallCheck(this, MoveToAction);

        var _this = _possibleConstructorReturn(this, (MoveToAction.__proto__ || Object.getPrototypeOf(MoveToAction)).call(this, opt));

        _this.position = opt.position || {
            x: 0,
            y: 0
        };
        return _this;
    }

    _createClass(MoveToAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            this.preStart(this.sprite.position, this.position, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return MoveToAction;
}(Action);

var MoveByAction = function (_Action2) {
    _inherits(MoveByAction, _Action2);

    function MoveByAction(opt) {
        _classCallCheck(this, MoveByAction);

        var _this2 = _possibleConstructorReturn(this, (MoveByAction.__proto__ || Object.getPrototypeOf(MoveByAction)).call(this, opt));

        _this2.position = opt.position || {
            x: 0,
            y: 0
        };
        return _this2;
    }

    _createClass(MoveByAction, [{
        key: 'start',
        value: function start() {
            var self = this;

            var toX = (this.position.x ? this.position.x : 0) + this.sprite.position.x;
            var toY = (this.position.y ? this.position.y : 0) + this.sprite.position.y;

            this.preStart(this.sprite.position, {
                x: toX,
                y: toY
            }, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return MoveByAction;
}(Action);

var ScaleToAction = function (_Action3) {
    _inherits(ScaleToAction, _Action3);

    function ScaleToAction(opt) {
        _classCallCheck(this, ScaleToAction);

        var _this3 = _possibleConstructorReturn(this, (ScaleToAction.__proto__ || Object.getPrototypeOf(ScaleToAction)).call(this, opt));

        _this3.scale = opt.scale || {
            x: 1,
            y: 1
        };
        return _this3;
    }

    _createClass(ScaleToAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            this.preStart(this.sprite.scale, this.scale, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return ScaleToAction;
}(Action);

var ScaleByAction = function (_Action4) {
    _inherits(ScaleByAction, _Action4);

    function ScaleByAction(opt) {
        _classCallCheck(this, ScaleByAction);

        var _this4 = _possibleConstructorReturn(this, (ScaleByAction.__proto__ || Object.getPrototypeOf(ScaleByAction)).call(this, opt));

        _this4.scale = opt.scale || {
            x: 1,
            y: 1
        };
        return _this4;
    }

    _createClass(ScaleByAction, [{
        key: 'start',
        value: function start() {
            var self = this;

            var toX = (this.scale.x ? this.scale.x : 0) + this.sprite.scale.x;
            var toY = (this.scale.y ? this.scale.y : 0) + this.sprite.scale.y;

            var self = this;
            this.preStart(this.sprite.scale, {
                x: toX,
                y: toY
            }, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return ScaleByAction;
}(Action);

var RotateToAction = function (_Action5) {
    _inherits(RotateToAction, _Action5);

    function RotateToAction(opt) {
        _classCallCheck(this, RotateToAction);

        var _this5 = _possibleConstructorReturn(this, (RotateToAction.__proto__ || Object.getPrototypeOf(RotateToAction)).call(this, opt));

        _this5.rotate = opt.rotate || 0;
        return _this5;
    }

    _createClass(RotateToAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            this.preStart(this.sprite, {
                rotate: this.rotate
            }, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return RotateToAction;
}(Action);

var RotateByAction = function (_Action6) {
    _inherits(RotateByAction, _Action6);

    function RotateByAction(opt) {
        _classCallCheck(this, RotateByAction);

        var _this6 = _possibleConstructorReturn(this, (RotateByAction.__proto__ || Object.getPrototypeOf(RotateByAction)).call(this, opt));

        _this6.rotate = opt.rotate || 0;
        return _this6;
    }

    _createClass(RotateByAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            var toRotate = this.rotate + this.sprite.rotate;

            this.preStart(this.sprite, {
                rotate: toRotate
            }, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return RotateByAction;
}(Action);

var AlphaAction = function (_Action7) {
    _inherits(AlphaAction, _Action7);

    function AlphaAction(opt) {
        _classCallCheck(this, AlphaAction);

        var _this7 = _possibleConstructorReturn(this, (AlphaAction.__proto__ || Object.getPrototypeOf(AlphaAction)).call(this, opt));

        _this7.alpha = opt.alpha || 0;
        return _this7;
    }

    _createClass(AlphaAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            this.preStart(this.sprite, {
                alpha: this.alpha
            }, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return AlphaAction;
}(Action);

var AnimateAction = function (_Action8) {
    _inherits(AnimateAction, _Action8);

    function AnimateAction(opt) {
        _classCallCheck(this, AnimateAction);

        var _this8 = _possibleConstructorReturn(this, (AnimateAction.__proto__ || Object.getPrototypeOf(AnimateAction)).call(this, opt));

        _this8.currentIndex = opt.currentIndex || 0;
        return _this8;
    }

    _createClass(AnimateAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            this.preStart(this.sprite, {
                currentIndex: this.currentIndex
            }, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return AnimateAction;
}(Action);

var TimeoutAction = function (_Action9) {
    _inherits(TimeoutAction, _Action9);

    function TimeoutAction(opt) {
        _classCallCheck(this, TimeoutAction);

        return _possibleConstructorReturn(this, (TimeoutAction.__proto__ || Object.getPrototypeOf(TimeoutAction)).call(this, opt));
    }

    _createClass(TimeoutAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            this.preStart(0, 1, function (val) {
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return TimeoutAction;
}(Action);

var IntervalAction = function (_Action10) {
    _inherits(IntervalAction, _Action10);

    function IntervalAction(opt) {
        _classCallCheck(this, IntervalAction);

        var _this10 = _possibleConstructorReturn(this, (IntervalAction.__proto__ || Object.getPrototypeOf(IntervalAction)).call(this, opt));

        _this10.callback = opt.callback || null;
        return _this10;
    }

    _createClass(IntervalAction, [{
        key: 'start',
        value: function start() {
            var self = this;
            this.preStart(0, 1, function (val) {
                if (val == 1) {
                    self.callback && self.callback();
                }
                self.onUpdate && self.onUpdate(val);
            });
        }
    }]);

    return IntervalAction;
}(Action);