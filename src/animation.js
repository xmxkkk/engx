'use strict'

class Animation extends Sprite {
    constructor(opt) {
        super(opt);
        this.opt = opt;
        this.type = "animation";

        this.updateFrame = opt.updateFrame || null;
        this.intervalTime = opt.intervalTime || 150;
        this.frames = [];
        this.currentIndex = opt.currentIndex || 0;
        this.status = "stop";
        this.action = null;

        this.prevIndex = this.currentIndex;
    }
    addFrame(texture) {
        this.frames.push(texture);
    }
    // step(){
    // 	this.currentIndex=(++this.currentIndex) % (this.frames.length);
    // }
    stop() {
        this.action && this.action.stop();
        this.status = "stop";
        this.currentIndex = this.opt.currentIndex || 0;
    }
    run(times, onComplete) {
        if (this.status == "start") {
            return;
        }

        var self = this;

        let repeat = times == undefined ? 0 : times;
        this.action = new AnimateAction({
            time: this.intervalTime * this.frames.length,
            currentIndex: this.frames.length,
            repeat: repeat,
            onComplete: function(val) {
                self.status = "stop";
                onComplete && onComplete(val);
            }
        });
        this.runAction(this.action);
        this.status = "start";
    }
    draw(cxt) {
        if (this.frames.length > 0) {
            cxt.save();
            this.predraw(cxt);

            this.currentIndex = parseInt(this.currentIndex) % this.frames.length;

            if (this.updateFrame && this.prevIndex != this.currentIndex) {
                this.updateFrame();
            }

            this.prevIndex = this.currentIndex;

            let texture = this.frames[this.currentIndex];

            this.width = this.width || texture.rect.width;
            this.height = this.height || texture.rect.height;

            texture.draw(cxt, {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            });

            cxt.beginPath();

            cxt.globalAlpha = 1;
            cxt.strokeStyle = debug ? yesColor : noColor;
            if (this.shape == "box") {
                cxt.rect(0, 0, this.width, this.height);

                let p1 = this.transformPoint([this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height]);
                let p2 = this.transformPoint([this.position.x - this.anchor.x * this.width + this.width, this.position.y - this.anchor.y * this.height]);
                let p3 = this.transformPoint([this.position.x - this.anchor.x * this.width + this.width, this.position.y - this.anchor.y * this.height + this.height]);
                let p4 = this.transformPoint([this.position.x - this.anchor.x * this.width, this.position.y - this.anchor.y * this.height + this.height]);

                this.borders = [p1, p2, p3, p4];
				log(this.borders[0]+"/"+this.borders[1]+"/"+this.borders[2]+"/"+this.borders[3]);

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
