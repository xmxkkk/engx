'use strict'

class Node {
    constructor(opt) {
		opt=opt||{};

        this.id = randomId();
        this.type = "node";
        this.parent = null;
        this.position = opt.position || {
            x: 0,
            y: 0
        };
        this.scale = opt.scale || {
            x: 1,
            y: 1
        };
        this.anchor = opt.anchor || {
            x: 0.5,
            y: 0.5
        };
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
            this[name] = (function(name) {
                return function(callback) {
                    this.events[name] = {
                        type: name,
                        event: null,
                        callback: callback
                    };
                    _engx.eventManager.sprites[this.id] = this;
                }
            })(name);
        }
    }
	transformRect(node,points){
		if(!node)return points;

		let p1=node.transformPoint(points[0]);
		let p2=node.transformPoint(points[1]);
		let p3=node.transformPoint(points[2]);
		let p4=node.transformPoint(points[3]);

		points=[p1,p2,p3,p4];

		node=node.parent;

		return this.transformRect(node,points);
	}
    transformPoint(pos) {
        pos = [pos[0], pos[1], 1];

        let a = 1,
            b = 0,
            c = 0,
            d = 1,
            e = 0,
            f = 0;
        let matrix = null;

		a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
		e = -this.anchor.x*this.width;
		f = -this.anchor.y*this.height;
		matrix = math.matrix([
            [a, c, e],
            [b, d, f],
            [0, 0, 1]
        ]);
        pos = math.multiply(matrix, pos);

        let r1 = this.rotate * Math.PI / 180;
        a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
        a = Math.cos(r1);
        b = Math.sin(r1);
        c = -Math.sin(r1);
        d = Math.cos(r1);
		matrix = math.matrix([
            [a, c, e],
            [b, d, f],
            [0, 0, 1]
        ]);
        pos = math.multiply(matrix, pos);

		a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
        a = this.scale.x;
        d = this.scale.y;
		matrix = math.matrix([
            [a, c, e],
            [b, d, f],
            [0, 0, 1]
        ]);
        pos = math.multiply(matrix, pos);

		a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
		e = this.position.x;
		f = this.position.y;
		matrix = math.matrix([
            [a, c, e],
            [b, d, f],
            [0, 0, 1]
        ]);
		// log(this.position);
		// log(pos);
        pos = math.multiply(matrix, pos);

        pos = pos.toArray();
        return [pos[0], pos[1]];
    }
    predraw(cxt) {
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

        let r1 = this.rotate * Math.PI / 180;
        let a = 1,
            b = 0,
            c = 0,
            d = 1,
            e = 0,
            f = 0;
        // let pos=[this.position.x,this.position.y,1];
        // let matrix=math.matrix([[a,c,e],[b,d,f],[0,0,1]]);

		a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
        e = this.position.x;
        f = this.position.y;
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
    childrenDraw(cxt) {
        if (this.children && this.children.length > 0) {
            let temp = [];
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
    eventHandle(cxt) {
        //todo 这个还需要优化，删除sprite的情况
        for (var i = 0; i < eventNames.length; i++) {
            var name = eventNames[i];
            if (this.events[name] && this.events[name].event) {
				let event=this.events[name].event;

				let px=0,py=0;
				if(event.type=="touchstart"||event.type=="touchmove"){
					px = event.touches[0].clientX;
	                py = event.touches[0].clientY;
				}else if(event.type=="touchend"||event.type=="touchcancel"){
					px = event.changedTouches[0].clientX;
	                py = event.changedTouches[0].clientY;
				}else{
					px = event.layerX;
	                py = event.layerY;
				}

				this.events[name].event.eventPoint={x:px,y:py};

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
    removeEvent(eventType) {
        delete this.events[this.eventType];
    }
    addNode(node) {
        node.status = "add";
        node.parent = this;
        this.children.push(node);

        var len = this.children.length,
            j;
        var temp;
        while (len > 0) {
            for (let j = 0; j < len - 1; j++) {
                if (this.children[j].zIndex > this.children[j + 1].zIndex) {
                    temp = this.children[j];
                    this.children[j] = this.children[j + 1];
                    this.children[j + 1] = temp;
                }
            }
            len--;
        }
    }
    remove(sprite) {
        if (!sprite) {
            this.status = "remove";
        } else {
            sprite.status = "remove";
        }

    }
    // removeSelf(){
    // 	this.status="remove";
    // }
    runAction(action) {
        action.sprite = this;
        action.start();
    }
    getNodeNum() {
        if (this.children.length == 0) {
            return 1;
        } else {
            let num = 1;
            for (let i = 0; i < this.children.length; i++) {
                num += this.children[i].getNodeNum();
            }
            return num;
        }
    }
}
