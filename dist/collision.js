'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collision = function () {
	function Collision() {
		_classCallCheck(this, Collision);

		this.defaultMask = "00000000";
		this.nodes = [];
		for (var i = 0; i < this.defaultMask.length; i++) {
			this.nodes[i] = [];
		}
	}

	_createClass(Collision, [{
		key: "getNode",
		value: function getNode(node) {
			if (node.mask && node.mask != this.defaultMask) {
				for (var i = 0; i < node.mask.length; i++) {
					if (node.mask.charAt(i) == "1") {
						this.nodes[i].push(node);
					}
				}
				// this.nodes.push(node);
			}
			for (var _i = 0; _i < node.children.length; _i++) {
				this.getNode(node.children[_i]);
			}
		}
	}, {
		key: "check",
		value: function check() {
			if (_engx.sceneManager.currentScene) {
				this.nodes = [];
				for (var i = 0; i < this.defaultMask.length; i++) {
					this.nodes[i] = [];
				}

				this.getNode(_engx.sceneManager.currentScene);
				// log(this.nodes);
				for (var _i2 = 0; _i2 < this.defaultMask.length; _i2++) {
					if (this.nodes[_i2].length > 1) {
						for (var j = 0; j < this.nodes[_i2].length; j++) {
							for (var k = j + 1; k < this.nodes[_i2].length; k++) {
								var node1 = this.nodes[_i2][j];
								var node2 = this.nodes[_i2][k];
								if (node1.shape == "box" && node2.shape == "box") {
									if (this.boxAndbox(node1, node2)) {
										node1.collision && node1.collision(node2);
										node2.collision && node2.collision(node1);
									}
								}
							}
						}
					}
				}
			}
		}
	}, {
		key: "boxAndbox",
		value: function boxAndbox(node1, node2) {
			for (var i = 0; i < node1.borders.length; i++) {
				if (containPoint(node1.borders[i], node2.borders)) {
					return true;
				}
			}
			for (var _i3 = 0; _i3 < node2.borders.length; _i3++) {
				if (containPoint(node2.borders[_i3], node1.borders)) {
					return true;
				}
			}

			return false;
		}
	}]);

	return Collision;
}();