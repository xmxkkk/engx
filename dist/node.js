'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
		function Node(opt) {
				_classCallCheck(this, Node);

				this.id = randomId();
				this.type = "node";
				this.parent = null;
				this.position = opt.position || { x: 0, y: 0 };
				this.scale = opt.scale || { x: 1, y: 1 };
				this.anchor = opt.anchor || { x: 0.5, y: 0.5 };
				this.rotate = opt.rotate || 0;
				this.transform = opt.transform || [1, 0, 0, 1, 0, 0];
				this.zIndex = opt.zIndex || 0;
				this.alpha = opt.alpha || 1.0;
				this.mask = opt.mask || null;
				this.shape = opt.shape || "box";
				this.collision = opt.collision || null;
				this.tag = opt.tag || null;

				this.borders = [];
				this.radius = 0;

				this.status = "create";

				this.events = [];
				this.children = [];

				for (var i = 0; i < eventNames.length; i++) {
						var name = eventNames[i];
						this[name] = function (name) {
								return function (callback) {
										this.events[name] = { type: name, event: null, callback: callback };
										_engx.eventManager.sprites[this.id] = this;
								};
						}(name);
				}
		}

		_createClass(Node, [{
				key: "transformPoint",
				value: function transformPoint(pos) {
						pos = [pos[0], pos[1], 1];

						var a = 1,
						    b = 0,
						    c = 0,
						    d = 1,
						    e = 0,
						    f = 0;
						var matrix = math.matrix([[a, c, e], [b, d, f], [0, 0, 1]]);

						e = this.position.x; //-this.anchor.x*this.width+this.anchor.x*this.width;
						f = this.position.y; //-this.anchor.y*this.height+this.anchor.y*this.height;
						pos = math.multiply(matrix, pos);

						a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
						a = this.scale.x;
						d = this.scale.y;
						pos = math.multiply(matrix, pos);

						var r1 = this.rotate * Math.PI / 180;
						a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
						a = Math.cos(r1);
						b = Math.sin(r1);
						c = -Math.sin(r1);
						d = Math.cos(r1);
						pos = math.multiply(matrix, pos);

						a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
						e = -this.anchor.x * this.width;
						f = -this.anchor.y * this.height;
						pos = math.multiply(matrix, pos);

						pos = pos.toArray();
						return [pos[0], pos[1]];
				}
		}, {
				key: "predraw",
				value: function predraw(cxt) {

						cxt.globalAlpha = this.alpha;
						/*
      		cxt.translate(this.position.x-this.anchor.x*this.width+this.anchor.x*this.width,this.position.y-this.anchor.x*this.width+this.anchor.y*this.height);
      	    // cxt.translate(this.position.x-this.anchor.x*this.width,this.position.y-this.anchor.x*this.width);
      	    // cxt.translate(this.anchor.x*this.width,this.anchor.y*this.height);
      	    cxt.scale(this.scale.x,this.scale.y);
      	    var r1=this.rotate*Math.PI/180;
      	    cxt.rotate(r1);
      	    cxt.transform(this.transform[0],this.transform[1],this.transform[2],this.transform[3],this.transform[4],this.transform[5]);
      	    cxt.translate(-this.anchor.x*this.width,-this.anchor.y*this.height);
      */

						var r1 = this.rotate * Math.PI / 180;
						var a = 1,
						    b = 0,
						    c = 0,
						    d = 1,
						    e = 0,
						    f = 0;
						// let pos=[this.position.x,this.position.y,1];
						// let matrix=math.matrix([[a,c,e],[b,d,f],[0,0,1]]);

						a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
						e = this.position.x; //-this.anchor.x*this.width+this.anchor.x*this.width;
						f = this.position.y; //-this.anchor.y*this.height+this.anchor.y*this.height;
						cxt.transform(a, b, c, d, e, f);

						// pos=math.multiply(matrix,pos);

						a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
						a = this.scale.x;
						d = this.scale.y;
						cxt.transform(a, b, c, d, e, f);
						// pos=math.multiply(matrix,pos);

						a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
						a = Math.cos(r1);
						b = Math.sin(r1);
						c = -Math.sin(r1);
						d = Math.cos(r1);
						cxt.transform(a, b, c, d, e, f);
						// pos=math.multiply(matrix,pos);

						a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
						e = -this.anchor.x * this.width;
						f = -this.anchor.y * this.height;
						cxt.transform(a, b, c, d, e, f);
						// pos=math.multiply(matrix,pos);

						// log(pos);
						// log(cxt.currentTransform);
				}
		}, {
				key: "childrenDraw",
				value: function childrenDraw(cxt) {
						if (this.children && this.children.length > 0) {
								var temp = [];
								for (var i = 0; i < this.children.length; i++) {
										if (this.children[i].status == "remove") {
												// log("remove");
										} else {
												temp.push(this.children[i]);
										}
								}
								this.children = temp;
								for (var i = 0; i < this.children.length; i++) {
										this.children[i].draw(cxt);
								}
						}
				}
		}, {
				key: "eventHandle",
				value: function eventHandle(cxt) {
						//todo 这个还需要优化，删除sprite的情况
						for (var i = 0; i < eventNames.length; i++) {
								var name = eventNames[i];
								if (this.events[name] && this.events[name].event) {
										var px = this.events[name].event.layerX;
										var py = this.events[name].event.layerY;
										if (cxt.isPointInPath(px, py)) {
												this.events[name].event.selected = true;
										}
										this.events[name].callback(this.events[name].event);
										this.events[name].event.selected = false;
										delete this.events[name].event;
								}
						}
				}
				// addEvent(eventType,callback){
				//     this.events[eventType]={type:eventType,event:null,callback:callback};
				//       _engx.eventManager.sprites[this.id]=this;
				// }

		}, {
				key: "removeEvent",
				value: function removeEvent(eventType) {
						delete this.events[this.eventType];
				}
		}, {
				key: "addNode",
				value: function addNode(node) {
						node.status = "add";
						node.parent = this;
						this.children.push(node);

						var len = this.children.length,
						    j;
						var temp;
						while (len > 0) {
								for (var _j = 0; _j < len - 1; _j++) {
										if (this.children[_j].zIndex > this.children[_j + 1].zIndex) {
												temp = this.children[_j];
												this.children[_j] = this.children[_j + 1];
												this.children[_j + 1] = temp;
										}
								}
								len--;
						}
				}
		}, {
				key: "remove",
				value: function remove(sprite) {
						if (!sprite) {
								this.status = "remove";
						} else {
								sprite.status = "remove";
						}
				}
				// removeSelf(){
				// 	this.status="remove";
				// }

		}, {
				key: "runAction",
				value: function runAction(action) {
						action.sprite = this;
						action.start();
				}
		}, {
				key: "getNodeNum",
				value: function getNodeNum() {
						if (this.children.length == 0) {
								return 1;
						} else {
								var num = 1;
								for (var i = 0; i < this.children.length; i++) {
										num += this.children[i].getNodeNum();
								}
								return num;
						}
				}
		}]);

		return Node;
}();