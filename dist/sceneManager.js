'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SceneManager = function () {
    function SceneManager() {
        _classCallCheck(this, SceneManager);

        this.currentScene = null;
    }

    _createClass(SceneManager, [{
        key: "go",
        value: function go(scene) {
            var self = this;
            this.currentScene && this.currentScene.leave && this.currentScene.leave();

            this.currentScene && this.currentScene.release && this.currentScene.release();

            log("loadResource");

            scene.loadResource(function () {
                log("loadResource.over");
                self.currentScene = scene;
                self.currentScene.enter && self.currentScene.enter();
            });
        }
    }]);

    return SceneManager;
}();