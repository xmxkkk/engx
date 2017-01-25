'use strict'

window.load = function() {
    let engx = new Engx(document.getElementById('canvas'), {
        width: 800,
        height: 600,
        background: 'rgb(88,88,88)',
        fps: 60
    });
    engx.start();


    let scene = new Scene({});
    scene.addResource([{
        name: "mm",
        url: "./resource/img/fly.png",
        type: "image"
    }]);

    //,scale:{x:2,y:2}
    let mm = new Sprite({
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

    mm.mousedown(function() {
        let moveTo = new RotateToAction({
            rotate: 60
        });
        mm.runAction(moveTo);
    });

    let layer = new Layer({
        position: {
            x: 100,
            y: 100
        }
    });
    layer.addNode(mm);
    scene.addNode(layer);
    // scene.addNode(mm);

    engx.sceneManager.go(scene);

}
