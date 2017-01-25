'use strict';

window.load = function () {

    var winWidth = document.body.scrollWidth;
    var winHeight = document.body.scrollHeight;

    var engx = new Engx(document.getElementById('canvas'), {
        width: winWidth,
        height: winHeight,
        background: 'rgb(88,88,88)',
        fps: 60
    });

    var gameScene = new Scene({});
    gameScene.addResource([{
        name: 'fly',
        url: './resource/img/fly.png',
        type: 'image'
    }, {
        name: 'feizhu',
        url: './resource/img/feizhu.png',
        type: 'image'
    }, {
        name: 'daodan',
        url: './resource/img/daodan.png',
        type: 'image'
    }, {
        name: 'gun',
        url: './resource/audio/gun.wav',
        type: "audio"
    }, {
        name: 'boom',
        url: './resource/audio/3431.mp3',
        type: "audio"
    }, {
        name: 'flyboom',
        url: './resource/audio/flyboom.wav',
        type: "audio"
    }, {
        name: 'boom',
        url: './resource/img/boom.png',
        type: "image"
    }]);
    var layer = new Layer({});
    gameScene.addLayer(layer);

    var feizhuTime = 0;
    var feizhuHandleId = 0;
    var feizhuIntervalTime = 400;

    var fasheFeizhu = function fasheFeizhu() {
        feizhuHandleId = setInterval(function () {
            if (_engx.render.getTime() - feizhuTime > feizhuIntervalTime) {
                (function () {
                    var feizhu = new Sprite({
                        texture: "feizhu",
                        mask: "00000011",
                        tag: "feizhu",
                        shape: "circle"
                    });
                    feizhu.position = {
                        x: parseInt(Math.random() * winWidth),
                        y: 0
                    };
                    feizhu.collision = function (node) {
                        if (node.tag == "feizhu") {
                            return;
                        } else if (node.tag == "daodan") {
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

    var fly = new Sprite({
        texture: "fly",
        zIndex: 3,
        shape: "circle",
        mask: "00000010",
        tag: "fly"
    });
    fly.position = {
        x: winWidth / 2,
        y: winHeight - 80
    };
    fly.collision = function (node) {
        if (node.tag == "feizhu" && gameStatus != "over") {
            (function () {
                gameStatus = "over";
                fly.touch.down = false;
                log("stop");
                var flyboom = new Music({
                    audioName: 'flyboom'
                });
                flyboom.start();

                clearInterval(feizhuHandleId);
                clearInterval(daodanhandleId);

                var boom = new Animation({
                    width: 200,
                    height: 200
                });
                boom.addFrame(new Texture({
                    name: 'boom',
                    rect: {
                        x: 0,
                        y: 0,
                        width: 500,
                        height: 491
                    },
                    width: 200,
                    height: 200
                }));
                boom.addFrame(new Texture({
                    name: 'boom',
                    rect: {
                        x: 500,
                        y: 0,
                        width: 500,
                        height: 491
                    },
                    width: 200,
                    height: 200
                }));
                boom.addFrame(new Texture({
                    name: 'boom',
                    rect: {
                        x: 500,
                        y: 491,
                        width: 500,
                        height: 491
                    },
                    width: 200,
                    height: 200
                }));
                boom.addFrame(new Texture({
                    name: 'boom',
                    rect: {
                        x: 0,
                        y: 491,
                        width: 500,
                        height: 491
                    },
                    width: 200,
                    height: 200
                }));
                boom.zIndex = 10;
                boom.position = fly.position;
                layer.addNode(boom);
                boom.run(0, function (val) {
                    boom.remove();
                    fly.remove();
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
            if (fly.touch.down == true) {
                (function () {
                    var daodan = new Sprite({
                        texture: "daodan",
                        mask: "00000001",
                        tag: "daodan",
                        position: {
                            x: fly.position.x,
                            y: fly.position.y - 10
                        }
                    });
                    daodan.collision = function (node) {
                        if (node.tag == "feizhu") {
                            // console.log("xxxxxxx"+node);
                            this.remove();
                            var gunMusic = new Music({
                                audioName: 'boom',
                                loop: false
                            });
                            gunMusic.start();
                        }
                    };
                    layer.addSprite(daodan);

                    var moveTo = new MoveToAction({
                        time: 400,
                        position: {
                            y: -100
                        },
                        onComplete: function onComplete(val) {
                            daodan.remove();
                        }
                    });
                    daodan.runAction(moveTo);

                    fasheTime = _engx.render.getTime();
                })();
            }
        }, fasheIntervalTime);
    };

    fly.touch = {
        down: false,
        downPos: {
            x: 0,
            y: 0
        }
    };
    var mousedown = function mousedown(event) {
        if (event.selected) {
            log(1);
            fly.touch.down = true;
            fly.touch.downPos = {
                x: event.eventPoint.x,
                y: event.eventPoint.y
            };
            fly.touch.position = fly.position;

            fasheDaodan();
        }
    };
    fly.mousedown(mousedown);
    fly.touchstart(mousedown);

    var mousemove = function mousemove(event) {
        if (fly.touch.down) {
            var dx = event.eventPoint.x - fly.touch.downPos.x;
            var dy = 0;
            fly.position = {
                x: fly.touch.position.x + dx,
                y: fly.touch.position.y + dy
            };
        }
    };
    fly.mousemove(mousemove);
    fly.touchmove(mousemove);

    var mouseup = function mouseup(event) {
        fly.touch.down = false;
    };
    fly.mouseup(mouseup);
    fly.touchend(mouseup);
    fly.touchcancel(mouseup);
    // layer.removeNode(fly);
    engx.sceneManager.go(gameScene);
    engx.start();

    window.pauseAction = function () {
        engx.pause();
    };
};