var Sprite=function(){
    var self=this;

    this.shape="box";

    this.anchor={x:0.5,y:0.5};
    this.pos={x:0,y:0};
    this.scale={x:1,y:1};
    this.rotate=0;
    this.transform=[1, 0, 0, 1, 0, 0];
    this.width=0;
    this.height=0;
    this.texture=null;

    this.scene=null;
    this.layer=null;

    this.event=[];

    this.draw=function(cxt){
        if(this.texture&&this.scene.resource[this.texture]){
            var img=this.scene.resource[this.texture];

            this.width=this.width||img.width;
            this.height=this.height||img.height;

            cxt.save();
            cxt.translate(this.pos.x-this.anchor.x*this.width,this.pos.y-this.anchor.y*this.height);
            
            cxt.translate(this.anchor.x*this.width,this.anchor.y*this.height);
            cxt.scale(this.scale.x,this.scale.y);
            
            var r1=this.rotate*Math.PI/180;
            cxt.rotate(r1);
            
            cxt.transform(this.transform[0],this.transform[1],this.transform[2],
                this.transform[3],this.transform[4],this.transform[5]);

            cxt.translate(-this.anchor.x*this.width,-this.anchor.y*this.height);

            cxt.drawImage(img,0,0,this.width,this.height);

            if(this.shape=="box"){
                cxt.beginPath();
                cxt.strokeStyle = "red";
                cxt.rect(0,0,this.width,this.height);
                cxt.stroke();
            }else if(this.shape=="circle"){
                cxt.beginPath();
                cxt.strokeStyle = "red";
                cxt.arc(this.width/2,this.height/2,this.width/2,0,Math.PI*2,true);
                cxt.stroke();
            }

            if(_canvas.event){
                var currEvent=this.event[_canvas.event.type];
                if(currEvent){
                    var px=_canvas.event.layerX;
                    var py=_canvas.event.layerY;

                    if(cxt.isPointInPath(px,py)){
                        currEvent.callbck(_canvas.event);
                    }
                }
            }

            cxt.restore();
        }
    }
    this.addEvent=function(eventType,callbck){
        // this.eventType=eventType;
        // this.eventCallback=callbck;
        this.event[eventType]={type:eventType,callbck:callbck};
    }
    this.removeEvent=function(eventType){
        // this.event[this.eventType]=null;
        delete this.event[this.eventType];
    }
    this.runAction=function(action){
        action.sprite=this;
        action.start();
    }
}