'use strict'

class EventManager{
	constructor(){
		let self=this;

		this.sprites=[];
		for(let i=0;i<eventNames.length;i++){
        	let name=eventNames[i];

			var target=_engx.render.canvas;
			if(name=="keydown"||name=="keyup"||name=="keypress"){
				target=window;
			}

			if (typeof window.addEventListener != "undefined") {
				target.addEventListener(name, function(event) {
					for(var i in self.sprites){
						if(self.sprites[i].events[name]){
							self.sprites[i].events[name].event=event;
						}
					}
				});
			}else{
				target.attachEvent(name, function(event) {
					for(var i in self.sprites){
						if(self.sprites[i].events[name]){
							self.sprites[i].events[name].event=event;
						}
					}
				});
			}

    	}
	}
}
