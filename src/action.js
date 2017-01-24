'use strict'

class Action {
    constructor(opt) {
        this.delay = opt.delay || 0;
        this.onStart = opt.onStart || null;
        // this.onUpdate=opt.onUpdate||null;
        this.onComplete = opt.onComplete || null;
        this.onStop = opt.onStop || null;

        this.time = opt.time || 1000;
        this.repeat = opt.repeat || 0;
        this.repeatDelay = opt.repeatDelay || null;
        this.yoyo = opt.yoyo || false;

        this.easing = opt.easing || TWEEN.Easing.Linear.None;
        this.sprite = null;
        this.tween = null;
    }
    preStart(oldProp, newProp, update) {
        this.tween = new TWEEN.Tween(oldProp).to(newProp, this.time)
            .onStart(this.onStart)
            .onUpdate(update)
            .onStop(this.onStop)
            .onComplete(this.onComplete)
            .delay(this.delay)
            .repeat(this.repeat)
            .repeatDelay(this.repeatDelay)
            .yoyo(this.yoyo)
            .easing(this.easing)
            .start(_engx.render.getTime());
    }
    stop() {
        this.tween && this.tween.stop();
    }
    end() {
        this.tween && this.tween.end();
    }
}

class MoveToAction extends Action {
    constructor(opt) {
        super(opt);
        this.position = opt.position || {
            x: 0,
            y: 0
        };
    }
    start() {
        var self = this;
        this.preStart(this.sprite.position, this.position, function(val) {
            self.sprite.scale = val;
            self.onUpdate && self.onUpdate(val);
        });
    }
}

class MoveByAction extends Action {
    constructor(opt) {
        super(opt);
        this.position = opt.position || {
            x: 0,
            y: 0
        };
    }
    start() {
        var self = this;

        var toX = (this.position.x ? this.position.x : 0) + this.sprite.position.x;
        var toY = (this.position.y ? this.position.y : 0) + this.sprite.position.y;

        this.preStart(this.sprite.position, {
            x: toX,
            y: toY
        }, function(val) {
            self.sprite.scale = val;
            self.onUpdate && self.onUpdate(val);
        });
    }
}

class ScaleToAction extends Action {
    constructor(opt) {
        super(opt);
        this.scale = opt.scale || {
            x: 1,
            y: 1
        };
    }
    start() {
        var self = this;
        this.preStart(this.sprite.scale, this.scale, function(val) {
            self.sprite.scale = val;
            self.onUpdate && self.onUpdate(val);
        });
    }
}

class ScaleByAction extends Action {
    constructor(opt) {
        super(opt);
        this.scale = opt.scale || {
            x: 1,
            y: 1
        };
    }
    start() {
        var self = this;

        var toX = (this.scale.x ? this.scale.x : 0) + this.sprite.scale.x;
        var toY = (this.scale.y ? this.scale.y : 0) + this.sprite.scale.y;

        var self = this;
        this.preStart(this.sprite.scale, {
            x: toX,
            y: toY
        }, function(val) {
            self.sprite.scale = val;
            self.onUpdate && self.onUpdate(val);
        });
    }
}

class RotateToAction extends Action {
    constructor(opt) {
        super(opt);
        this.rotate = opt.rotate || 0;
    }
    start() {
        var self = this;
        this.preStart({
            rotate: this.sprite.rotate
        }, {
            rotate: this.rotate
        }, function(val) {
            self.sprite.scale = val;
            self.onUpdate && self.onUpdate(val);
        });
    }
}

class RotateByAction extends Action {
    constructor(opt) {
        super(opt);
        this.rotate = opt.rotate || 0;
    }
    start() {
        var self = this;
        var toRotate = this.rotate + this.sprite.rotate;

        this.preStart({
            rotate: this.sprite.rotate
        }, {
            rotate: toRotate
        }, function(val) {
            self.sprite.scale = val;
            self.onUpdate && self.onUpdate(val);
        });
    }
}
class AlphaAction extends Action {
    constructor(opt) {
        super(opt);
        this.alpha = opt.alpha || 0;
    }
    start() {
        var self = this;
        this.preStart({
            alpha: this.sprite.alpha
        }, {
            alpha: this.alpha
        }, function(val) {
            log(val);
            self.sprite.alpha = val;
            self.onUpdate && self.onUpdate(val);
        });
    }
}

class AnimateAction extends Action {
    constructor(opt) {
        super(opt);
        this.currentIndex = opt.currentIndex || 0;
    }
    start() {
        var self = this;
        this.preStart({
            currentIndex: this.sprite.currentIndex
        }, {
            currentIndex: this.currentIndex
        }, function(val) {
            self.sprite.currentIndex = this.currentIndex;
            self.onUpdate && self.onUpdate(val);
        });
    }
}
