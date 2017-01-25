'use strict'

class Sprite extends Layer {
    constructor(opt) {
        super(opt);
        this.opt = opt;
        this.type = "sprite";

        this.width = this.opt.width || 0;
        this.height = this.opt.height || 0;

        this.anchor = opt.anchor || {
            x: 0.5,
            y: 0.5
        };

        this.texture = opt.texture || null;
    }
    draw(cxt) {
        if (this.texture) {
            cxt.save();
            this.predraw(cxt);

            if (typeof this.texture == 'string') {
                let img = _engx.sceneManager.currentScene.resource['image'][this.texture];
                this.width = this.width || img.width;
                this.height = this.height || img.height;

                cxt.drawImage(img, 0, 0, this.width, this.height);
            } else {
                this.width = this.width || this.texture.rect.width;
                this.height = this.height || this.texture.rect.height;

                this.texture.draw(cxt, {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height
                });
            }

            cxt.beginPath();

            // cxt.globalAlpha=1;
            cxt.strokeStyle = debug ? yesColor : noColor;
            if (this.shape == "box") {
                cxt.rect(0, 0, this.width, this.height);
				this.borders=this.transformRect(this,[[0,0],[this.width,0],[this.width,this.height],[0,this.height]]);
            } else if (this.shape == "circle") {
                cxt.arc(this.width / 2, this.height / 2, this.width / 2, 0, Math.PI * 2, true);
                this.radius = this.width / 2;
            }
            cxt.stroke();

            this.eventHandle(cxt);
            this.childrenDraw(cxt);
            cxt.restore();
        }
    }
}
