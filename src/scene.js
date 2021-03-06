'use strict'

class Scene extends Node {
    constructor(opt) {
        super(opt);
        this.type = "scene";

        this.width = opt.width || _engx.render.width;
        this.height = opt.height || _engx.render.height;

		this.anchor =opt.anchor||{x:0,y:0};

        this.resource = [];
        this.resource['image'] = [];
        this.resource['audio'] = [];

        this.enter = opt.enter || null;
        this.leave = opt.enter || null;

        this.resourceData = null;
        var layer = new Layer({});
        this.addLayer(layer);

        this.fpsText = null;
    }

    addResource(resourceData) {
        if (this.resourceData) {
            this.resourceData = this.resourceData.concat(resourceData);
        } else {
            this.resourceData = resourceData;
        }
    }

    loadResource(callback) {
        if (this.resourceData) {
            var self = this;

            var len = this.resourceData.length;
            for (var i = 0; i < len; i++) {
                if (this.resourceData[i].type == "image") {
                    var img = new Image();
                    img.src = this.resourceData[i].url;
                    img.name = this.resourceData[i].name;
                    img.onload = function() {
                        self.resource['image'][this.name] = this;
                        len--;
                        if (len <= 0) {
                            callback();
                            log("callback1");
                        }
                    }
                } else if (this.resourceData[i].type == "audio") {
                    var media = new Audio(this.resourceData[i].url);
                    media.name = this.resourceData[i].name;
                    media.preload = "auto";
                    media.load();

                    media.handleId = setInterval(function(m) {
                        if (m.readyState == 4) {
                            clearTimeout(m.handleId);
                            self.resource['audio'][m.name] = m;
                            len--;
                            if (len <= 0) {
                                callback();
                                log("callback2");
                            }
                        }
                    }, 10, media);
                }
            }
        } else {
            callback();
            log("callback3");
        }
    }

    draw(cxt) {
        if (debug) {
            if (!this.fpsText) {
                this.fpsText = new Text({
                    fontSize: 30,
                    textAlign: 'left',
                    textBaseline: 'top'
                });
                let layer = this.firstLayer();
                layer.addNode(this.fpsText);
            }
            this.fpsText.text = _engx.render.realFps;
        }
        this.childrenDraw(cxt);
    }
    addLayer(layer) {
        layer.parent = this;
        layer.scene = this;

        this.addNode(layer);

    }
    firstLayer() {
        return this.children[0];
    }
    lastLayer() {
        return this.children[this.children.length - 1];
    }
    addSprite(sprite) {
        this.children[0].addSprite(sprite);
    }
    release() {
        log("release");
    }
}
