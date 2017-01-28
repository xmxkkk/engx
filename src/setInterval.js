'use strict'


class SetInterval{
	constructor(opt){
		this.time=opt.time||0;
		this.callback=opt.callback||null;

		this.intervalAction=null;
	}
	run(){
		this.intervalAction=new IntervalAction({repeat:Number.MAX_VALUE,repeatDelay:this.time,callback:this.callback});
		this.intervalAction.start();
	}
	stop(){
		this.intervalAction.stop();
	}
}
