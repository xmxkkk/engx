'use strict'

var log=console.log;

class Engx{
	constructor(canvas,opt){
		window._engx=this;

		this.status="stop";

		this.render=new Render(canvas,opt);
		this.sceneManager=new SceneManager();
		this.eventManager=new EventManager();
		this.musicManager=new MusicManager();
		this.collision=new Collision();

	}
	start(onStart){
		this.render.start();
		onStart&&onStart();
		this.status="start";
	}
	stop(onStop){
		this.render.stop();
		onStop&&onStop();
		this.status="stop";
	}
	pause(onPause){
		this.render.pause();
		onPause&&onPause();
		this.status="pause";
	}
}
