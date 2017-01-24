'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function () {
    function Texture(opt) {
        _classCallCheck(this, Texture);

        this.opt = opt;
        this.type = "texture";
        this.name = opt.name || null;
        this.rect = opt.rect || null;
    }

    _createClass(Texture, [{
        key: 'draw',
        value: function draw(cxt, rect) {
            this.resource = _engx.sceneManager.currentScene.resource['image'][this.name];
            this.rect = this.opt.rect || {
                x: 0,
                y: 0,
                width: this.resource.width,
                height: this.resource.height
            };

            cxt.drawImage(this.resource, this.rect.x, this.rect.y, this.rect.width, this.rect.height, rect.x, rect.y, rect.width, rect.height);
        }
    }]);

    return Texture;
}();