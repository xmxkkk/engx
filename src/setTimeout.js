'use strict'


class SetTimeout{
	constructor(opt){
		this.time=opt.time||0;
		this.callback=opt.callback||null;

		this.timeoutAction=null;
	}
	run(){
		this.timeoutAction=new TimeoutAction({delay:this.time,onStart:this.callback});
		this.timeoutAction.start();
	}
	stop(){
		this.timeoutAction.stop();
	}
}
