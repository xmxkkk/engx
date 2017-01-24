'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManager = function EventManager() {
    _classCallCheck(this, EventManager);

    var self = this;

    this.sprites = [];

    var _loop = function _loop(i) {
        var name = eventNames[i];

        target = _engx.render.canvas;

        if (name == "keydown" || name == "keyup" || name == "keypress") {
            target = window;
        }

        if (typeof window.addEventListener != "undefined") {
            target.addEventListener(name, function (event) {
                for (var i in self.sprites) {
                    if (self.sprites[i].events[name]) {
                        self.sprites[i].events[name].event = event;
                    }
                }
            });
        } else {
            target.attachEvent(name, function (event) {
                for (var i in self.sprites) {
                    if (self.sprites[i].events[name]) {
                        self.sprites[i].events[name].event = event;
                    }
                }
            });
        }
    };

    for (var i = 0; i < eventNames.length; i++) {
        var target;

        _loop(i);
    }
};