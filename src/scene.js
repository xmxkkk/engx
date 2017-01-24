'use strict'

class Scene extends Node{
	constructor(opt){
	    super(opt);
	    this.type="scene";

	    this.width=opt.width||_engx.render.width;
	    this.height=opt.height||_engx.render.height;

	    this.resource=[];
	    this.resource['image']=[];
	    this.resource['audio']=[];

	    this.enter=opt.enter||null;
	    this.leave=opt.enter||null;

	    this.resourceData=null;
	    var layer=new Layer({});
	    this.addLayer(layer);
	}

	addResource(resourceData){
	    if(this.resourceData){
	      this.resourceData=this.resourceData.concat(resourceData);
	    }else{
	      this.resourceData=resourceData;
		}
	}

	loadResource(callback){
	    if(this.resourceData){
	      var self=this;

	      var len=this.resourceData.length;
	      for(var i=0;i<len;i++){
	          if(this.resourceData[i].type=="image"){
	              var img=new Image();
	              img.src=this.resourceData[i].url;
	              img.name=this.resourceData[i].name;
	              img.onload=function(){
	                  self.resource['image'][this.name]=this;
	                  len--;
	                  if(len<=0){
	                      callback();
	                      log("callback1");
	                  }
	              }
	          }else if(this.resourceData[i].type=="audio"){
	            var media=new Audio(this.resourceData[i].url);
	            media.name=this.resourceData[i].name;
	            media.preload="auto";
	            media.load();
	            media.addEventListener("canplaythrough",function(){
	                self.resource['audio'][this.name]=this;
	                len--;
	                if(len<=0){
	                    callback();
	                    media.addEventListener("canplaythrough",null);
	                }
	            });
	            /*
	            var src=this.resourceData[i].url;
	            var name=this.resourceData[i].name;
	            loadAudio(this.resourceData[i],function(audio,rd){
	              self.resource['audio'][rd.name]=audio;
	              len--;
	              if(len<=0){
	                  callback();
	                  log("callback1");
	              }
	            });*/


	          }
	      }
	    }else{
	      callback();
	      log("callback3");
	    }
	}

	draw(cxt){
		// cxt.save();
		// this.predraw(cxt);
		// this.eventHandle(cxt);
		this.childrenDraw(cxt);
		// cxt.restore();

		/*
		let nodeNum=0;
	    for(var i=0;i<this.children.length;i++){
	        this.children[i].draw(cxt);
			nodeNum+=this.children[i].getNodeNum();
	    }*/
		// debug&&log(nodeNum);
	}
	addLayer(layer){
	    layer.parent=this;
	    layer.scene=this;

		this.addNode(layer);

	}
	firstLayer(){
	    return this.children[0];
	}
	lastLayer(){
	    return this.children[this.children.length];
	}
	addSprite(sprite){
    	this.children[0].addSprite(sprite);
	}
	release(){
    	log("release");
	}
}
