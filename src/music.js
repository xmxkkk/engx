'use strict'

class Music{
	constructor(opt){
	    let loop=opt.loop||false;
	    this.audioName=opt.audioName||null;
	    this.volume=opt.volume||1.;

	    let audio_=_engx.sceneManager.currentScene.resource['audio'][this.audioName];

	    this.id=randomId();

	    this.audio=new Audio(audio_.src);
	    this.audio.proload="auto";
	    this.audio.volume=this.volume;
	    this.audio.load();

	    _engx.musicManager.addMusic(this);
	}
	start(){
		this.audio.volume=0.1;
	    this.audio.play();
	    this.status="start";
	}
	stop(){
	    this.audio.currentTime=0;
	    this.audio.pause();
	    this.status="stop";
	}
	pause(){
	    this.audio.pause();
	    this.status="pause";
	}
}
