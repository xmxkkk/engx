var Sprite=function(){
    var self=this;

    this.id=null;

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

    this.events=[];
    this.init=function(){
        for(var i=0;i<eventNames.length;i++){
            var name=eventNames[i];
            this.events[name]=null;
        }
        this.id=(parseInt(Math.random()*100000000)+10000000)+"-"+
            (parseInt(Math.random()*100000000)+10000000)+"-"+
            (parseInt(Math.random()*100000000)+10000000)+"-"+
            (parseInt(Math.random()*100000000)+10000000)+"-";
    }
    this.init();
    
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

            for(var i=0;i<eventNames.length;i++){
                var name=eventNames[i];
                if(this.events[name]&&this.events[name].event){
                    var px=this.events[name].event.layerX;
                    var py=this.events[name].event.layerY;
                    if(cxt.isPointInPath(px,py)){
                        this.events[name].callback(this.events[name].event);
                        delete this.events[name].event;
                    }
                }
            }
            
            cxt.restore();
        }
    }
    this.addEvent=function(eventType,callback){
        // this.eventType=eventType;
        // this.eventCallback=callback;
        this.events[eventType]={type:eventType,event:null,callback:callback};
        _eventManager.sprites[this.id]=this;
    }
    this.removeEvent=function(eventType){
        // this.event[this.eventType]=null;
        delete this.events[this.eventType];
    }
    this.runAction=function(action){
        action.sprite=this;
        action.start();
    }
}