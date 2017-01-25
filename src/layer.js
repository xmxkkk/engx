'user strict'

class Layer extends Node {
    constructor(opt) {
        super(opt);
        this.type = "layer";

        this.opt = opt;

        this.width = this.opt.width || _engx.render.width;
        this.height = this.opt.height || _engx.render.height;

        this.anchor = opt.anchor || {
            x: 0,
            y: 0
        };

        this.scene = null;
        this.background = opt.background || null;
    }

    addSprite(sprite) {
        this.addNode(sprite);
    }

    draw(cxt) {
        cxt.save();
        this.predraw(cxt);

        cxt.beginPath();
        cxt.strokeStyle = debug ? yesColor : noColor;
        cxt.rect(0, 0, this.width, this.height);
        cxt.stroke();

        cxt.globalAlpha = 1;
        cxt.fillStyle = this.background ? this.background : noColor;
        cxt.fillRect(0, 0, this.width, this.height);

        this.borders=this.transformRect(this,[[0,0],[this.width,0],[this.width,this.height],[0,this.height]]);

        this.eventHandle(cxt);
        this.childrenDraw(cxt);
        cxt.restore();
    }
}
