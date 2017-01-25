'use strict';

window.load = function () {
    var winWidth = screen.width;
    var winHeight = screen.height;
    var engx = new Engx(document.getElementById('canvas'), {
        width: winWidth,
        height: winHeight,
        background: 'rgb(88,88,88)',
        fps: 60
    });
    engx.start();

    var scene = new Scene({});
    scene.addResource([{
        name: "mm",
        url: "./resource/img/fly.png",
        type: "image"
    }]);

    //,scale:{x:2,y:2}
    var mm = new Sprite({
        texture: "mm",
        anchor: {
            x: 0.5,
            y: 0.5
        },
        width: 100,
        height: 100,
        position: {
            x: 30,
            y: 30
        },
        rotate: 45,
        scale: {
            x: 1,
            y: 1
        },
        tag: "mm"
    });

    mm.mousedown(function (event) {
        var moveTo = new RotateToAction({
            rotate: 60
        });
        mm.runAction(moveTo);
    });
    mm.touchstart(function (event) {
        var moveTo = new RotateToAction({
            rotate: 60
        });
        mm.runAction(moveTo);
    });

    var layer = new Layer({
        position: {
            x: 100,
            y: 100
        }
    });
    layer.addNode(mm);
    scene.addNode(layer);
    // scene.addNode(mm);

    engx.sceneManager.go(scene);
};