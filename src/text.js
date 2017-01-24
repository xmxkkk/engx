'use strict'

class Text extends Layer{
	constructor(opt){
		super(opt);
		this.type="text";

		this.fontStyle=opt.fontStyle||"normal";
		this.fontFamily=opt.fontFamily||"'宋体'";
		this.textAlign=opt.textAlign||"center";
		this.textBaseline=opt.textBaseline||"middle";
		this.fontWeight=opt.fontWeight||400;
		this.fontSize=opt.fontSize||12;
		this.text=opt.text||"";
		this.style=opt.style||"fill";
		this.fillStyle=opt.fillStyle||"rgb(200,200,200)";
		this.strokeStyle=opt.strokeStyle||"rgb(200,200,200)";
	}
	draw(cxt){
		if(this.text){
			cxt.save();

			cxt.font=this.fontStyle+" "+this.fontWeight+" "+this.fontSize+"px "+this.fontFamily;
			cxt.textAlign=this.textAlign;
			cxt.textBaseline=this.textBaseline;
			cxt.fillStyle=this.fillStyle;
			cxt.strokeStyle=this.strokeStyle;

			let rect = cxt.measureText(this.text); // TextMetrics object
			this.width=rect.width;
			this.height=this.fontSize;

			if(this.textAlign=="left"){
				this.anchor.x=0;
			}else if(this.textAlign=="center"){
				this.anchor.x=0.5;
			}else if(this.textAlign=="right"){
				this.anchor.x=1;
			}
			if(this.textBaseline=="top"){
				this.anchor.y=0;
			}else if(this.textBaseline=="middle"){
				this.anchor.y=0.5;
			}else if(this.textBaseline=="bottom"){
				this.anchor.y=1;
			}

			this.predraw(cxt);
			if(this.style=="fill"){
				cxt.fillText(this.text, this.anchor.x*this.width, 0+this.anchor.y*this.height);
			}else if(this.style="stroke"){
				cxt.strokeText(this.text, this.anchor.x*this.width, 0+this.anchor.y*this.height);
			}
			cxt.beginPath();

			// cxt.globalAlpha=1;
		    cxt.strokeStyle=debug?yesColor:noColor;
		 	cxt.rect(0,0,this.width,this.height);

		    cxt.stroke();
			this.eventHandle(cxt);
		    this.childrenDraw(cxt);
		    cxt.restore();
		}
	}
}
