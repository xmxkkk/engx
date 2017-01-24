'use strict';

window.load = function () {
	var winWidth = 400;
	var winHeight = 600;

	var engx = new Engx(document.getElementById('canvas'), {
		width: winWidth,
		height: winHeight,
		background: 'rgb(88,88,88)',
		fps: 60
	});

	var gameScene = new Scene({});
	gameScene.addResource([{ name: 'fly', url: './resource/img/fly.png' + "?time=" + randomId(), type: 'image' }, { name: 'feizhu', url: './resource/img/feizhu.png' + "?time=" + randomId(), type: 'image' }, { name: 'daodan', url: './resource/img/daodan.png' + "?time=" + randomId(), type: 'image' }, { name: 'gun', url: './resource/audio/gun.wav' + "?time=" + randomId(), type: "audio" }, { name: 'boom', url: './resource/audio/3431.mp3' + "?time=" + randomId(), type: "audio" }, { name: 'flyboom', url: './resource/audio/flyboom.wav' + "?time=" + randomId(), type: "audio" }, { name: 'boom', url: './resource/img/boom.png' + "?time=" + randomId(), type: "image" }]);
	var layer = new Layer({});
	gameScene.addLayer(layer);

	var feizhuTime = 0;
	var feizhuHandleId = 0;
	var feizhuIntervalTime = 200;

	var fasheFeizhu = function fasheFeizhu() {
		feizhuHandleId = setInterval(function () {
			if (_engx.render.getTime() - feizhuTime > feizhuIntervalTime) {
				(function () {
					var feizhu = new Sprite({ texture: "feizhu", mask: "00000011" });
					feizhu.position = { x: parseInt(Math.random() * winWidth), y: 0 };
					feizhu.collision = function (node) {
						if (node.texture == "feizhu") {
							return;
						} else if (node.texture == "daodan") {
							// console.log("feizhu==="+node);
							this.remove();
						}
					};
					layer.addSprite(feizhu);

					var moveTo = new MoveToAction({
						time: 1000,
						position: {
							y: winHeight + 60,
							x: parseInt(Math.random() * 360) + 20
						},
						onComplete: function onComplete(val) {
							feizhu.remove();
						}
					});
					feizhu.runAction(moveTo);

					feizhuTime = _engx.render.getTime();
				})();
			}
		}, feizhuIntervalTime);
	};
	gameScene.enter = function () {
		fasheFeizhu();
	};
	var gameStatus = "running";

	var fly = new Sprite({ texture: "fly", zIndex: 3, mask: "00000010" });
	fly.position = { x: winWidth / 2, y: winHeight - 80 };
	fly.collision = function (node) {
		if (node.texture == "feizhu" && gameStatus != "over") {
			(function () {
				gameStatus = "over";
				fly.touch.down = false;
				log("stop");
				var flyboom = new Music({ audioName: 'flyboom' });
				flyboom.start();

				clearInterval(feizhuHandleId);
				clearInterval(daodanhandleId);

				var boom = new Animation({ width: 200, height: 200 });
				boom.addFrame(new Texture({ name: 'boom', rect: { x: 0, y: 0, width: 500, height: 491 }, width: 200, height: 200 }));
				boom.addFrame(new Texture({ name: 'boom', rect: { x: 500, y: 0, width: 500, height: 491 }, width: 200, height: 200 }));
				boom.addFrame(new Texture({ name: 'boom', rect: { x: 500, y: 491, width: 500, height: 491 }, width: 200, height: 200 }));
				boom.addFrame(new Texture({ name: 'boom', rect: { x: 0, y: 491, width: 500, height: 491 }, width: 200, height: 200 }));
				boom.zIndex = 10;
				boom.position = fly.position;
				layer.addNode(boom);
				boom.run(0, function (val) {
					boom.remove();
					fly.remove();
					// engx.stop();
				});
			})();
		}
	};
	layer.addSprite(fly);

	var fasheTime = 0;
	var daodanhandleId = 0;
	var fasheIntervalTime = 300;

	var fasheDaodan = function fasheDaodan() {
		daodanhandleId = setInterval(function () {
			// if((_engx.render.getTime()-fasheTime)>30&&fly.touch.down==true){
			if (fly.touch.down == true) {
				(function () {

					var daodan = new Sprite({ texture: "daodan", mask: "00000001", position: { x: fly.position.x, y: fly.position.y - 10 } });
					daodan.collision = function (node) {
						if (node.texture == "feizhu") {
							console.log("xxxxxxx" + node);
							this.remove();
							var gunMusic = new Music({ audioName: 'boom', loop: false });
							gunMusic.start();
						}
					};
					layer.addSprite(daodan);

					var moveTo = new MoveToAction({ time: 400, position: { y: -100 }, onComplete: function onComplete(val) {
							daodan.remove();
						} });
					daodan.runAction(moveTo);

					fasheTime = _engx.render.getTime();
				})();
			}
		}, fasheIntervalTime);
	};

	fly.touch = {
		down: false,
		downPos: { x: 0, y: 0 }
	};
	fly.mousedown(function (event) {
		if (event.selected) {
			log(1);
			fly.touch.down = true;
			fly.touch.downPos = { x: event.layerX, y: event.layerY };
			fly.touch.position = fly.position;

			fasheDaodan();
		}
	});
	fly.mousemove(function (event) {
		if (fly.touch.down) {
			var dx = event.layerX - fly.touch.downPos.x;
			var dy = 0;
			fly.position = {
				x: fly.touch.position.x + dx,
				y: fly.touch.position.y + dy
			};
		}
	});
	fly.mouseup(function (event) {
		fly.touch.down = false;
	});
	// layer.removeNode(fly);
	engx.sceneManager.go(gameScene);
	engx.start();

	window.pauseAction = function () {
		engx.pause(function () {});
	};
};