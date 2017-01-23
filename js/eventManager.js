var EventManager=function(){
	var self=this;

	this.sprites=[];

	this.init=function(){
		_canvas.addEventListener("mousedown", function(event) {
			// self.mousedown=event;
			for(var i in self.sprites){
				if(self.sprites[i].events["mousedown"]){
					self.sprites[i].events["mousedown"].event=event;
				}
			}
		});
		_canvas.addEventListener("mouseup",function(event){
			// self.mouseup=event;
			for(var i in self.sprites){
				if(self.sprites[i].events["mouseup"]){
					self.sprites[i].events["mouseup"].event=event;
				}
			}
		});
		_canvas.addEventListener("mousemove",function(event){
			// self.mousemove=event;
			for(var i in self.sprites){
				if(self.sprites[i].events["mousemove"]){
					self.sprites[i].events["mousemove"].event=event;
				}
			}
		});
		_canvas.addEventListener("mouseenter",function(event){
			// self.mouseenter=event;
			for(var i in self.sprites){
				if(self.sprites[i].events["mouseenter"]){
					self.sprites[i].events["mouseenter"].event=event;
				}
			}
		});
		_canvas.addEventListener("mouseleave",function(event){
			// self.mouseleave=event;
			for(var i in self.sprites){
				if(self.sprites[i].events["mouseleave"]){
					self.sprites[i].events["mouseleave"].event=event;
				}
			}
		});
		_canvas.addEventListener("mouseout",function(event){
			// self.mouseout=event;
			for(var i in self.sprites){
				if(self.sprites[i].events["mouseout"]){
					self.sprites[i].events["mouseout"].event=event;
				}
			}
		});
		_canvas.addEventListener("mouseover",function(event){
			// self.mouseover=event;
			for(var i in self.sprites){
				if(self.sprites[i].events["mouseover"]){
					self.sprites[i].events["mouseover"].event=event;
				}
			}
		});
	}
}