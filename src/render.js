'use strict'

class Render{
	constructor(canvas,opt){
		this.canvas=canvas;
		this.opt=opt;

		this.width=this.opt.width||800;
		this.height=this.opt.height||600;
	    this.background=this.opt.background||'rgb(88,88,88)';

	    this.canvas.width=this.width;
	    this.canvas.height=this.height;
	    this.canvas.style.background=this.background;

		this.init();
	}
	init(){
		this.fps=this.opt.fps||60;
	    this.interval=1000.0/this.fps;
	    this.times=0;
		this.status="stop";

		this.canvasBuffer = document.createElement("canvas");
		this.canvasBuffer.width = this.canvas.width;
	    this.canvasBuffer.height = this.canvas.height;

	    this.context = this.canvas.getContext("2d");
	    this.contextBuffer = this.canvasBuffer.getContext("2d");
	    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.contextBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

	}
	getTime(){
      return this.times*this.interval;
	}
	render(){
		_engx.collision.check();

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	    this.contextBuffer.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

	    //contextBuffer用于绘制的cxt
	    _engx.sceneManager.currentScene&&
	    _engx.sceneManager.currentScene.draw&&
	    _engx.sceneManager.currentScene.draw(this.contextBuffer);

	    this.context.drawImage(this.canvasBuffer, 0, 0);

	    TWEEN.update(this.getTime());

		++this.times;
	}
	_startRender(){
		// this.handleId=setInterval(this.render,this.interval);
		this.status="start";
		var self=this;
		(function animate(){
			if(self.status=="start"){
				self.render();
				self.handleId=setTimeout(animate,self.interval);
			}else if(self.handleId=="stop"){
				clearTimeout(self.handleId);
			}
		})();
	}
	_stopRender(){
		this.status="stop";
		if(this.handleId){
			log("stop="+this.handleId);
			for(let id=this.handleId-5;id<this.handleId+10;id++){
				clearTimeout(id);
			}
			this.handleId=0;
		}
	}
	start(){
		this._startRender();
	}
	stop(){
		this._stopRender();
	}
	pause(){
		this._stopRender();
	}
}
