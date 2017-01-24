'use strict'

class Texture{
	constructor(opt){
		this.opt=opt;
		this.type="texture";
		this.name=opt.name||null;
		this.rect=opt.rect||null;
	}
	draw(cxt,rect){
		this.resource=_engx.sceneManager.currentScene.resource['image'][this.name];
		this.rect=this.opt.rect||{x:0,y:0,width:this.resource.width,height:this.resource.height};

		cxt.drawImage(this.resource,this.rect.x,this.rect.y,this.rect.width,this.rect.height,rect.x,rect.y,rect.width,rect.height);
	}
}
