'use strict'

window.load=function(){
	let engx=new Engx(document.getElementById('canvas'),{
		width:800,
		height:600,
		background:'rgb(88,88,88)',
		fps:30
	});

	let scene=new Scene({});
	scene.addResource(
		[
			{name:'meinv',url:'https://img6.bdstatic.com/img/image/smallpic/xiaoqingxin112.jpg',type:'image'},
			{name:'meinv2',url:'http://img6.bdstatic.com/img/image/smallpic/chongwu112.jpeg',type:'image'},
			{name:'bgmusic',url:"./resource/audio/music.mp3",type:"audio"},
			{name:'gun',url:"./resource/audio/gun.WAV",type:"audio"},
			{name:'animate',url:"./resource/img/F3_CHA41.png",type:"image"},
			{name:"bg",url:'./resource/img/bg.jpg',type:"image"},
			{name:'boom',url:'./resource/img/boom.png',type:"image"}
		]
	);

	let boom=new Animation({width:200,height:200});
	boom.addFrame(new Texture({name:'boom',rect:{x:0,y:0,width:500,height:491},width:200,height:200}));
	boom.addFrame(new Texture({name:'boom',rect:{x:500,y:0,width:500,height:491},width:200,height:200}));
	boom.addFrame(new Texture({name:'boom',rect:{x:500,y:491,width:500,height:491},width:200,height:200}));
	boom.addFrame(new Texture({name:'boom',rect:{x:0,y:491,width:500,height:491},width:200,height:200}));

	boom.position={x:100,y:100};
	scene.addNode(boom);
	boom.run(0,function(val){
		boom.remove();
		// engx.stop();
	});

	scene.enter=function(){
		log("enter");
	}

	let anim=new Animation({});
	// anim.texture="animate";
	for(let i=0;i<4;i++){
		anim.addFrame(new Texture({name:"animate",rect:{x:i*32,y:56*2,width:32,height:56}}));
	}
	anim.width=200;
	anim.height=200;
	anim.position={x:100,y:100};
	anim.anchor={x:0,y:0};
	anim.zIndex=2;
	anim.intervalTime=150;
	anim.alpha=1;
	anim.rotate=45;

	let aa=new AlphaAction({alpha:0,time:3000});

	anim.mousedown(function(event){
		if(event.selected){
			// anim.run(Number.MAX_VALUE);
			if(anim.status=="start"){
				anim.stop();
			}else{
				anim.run(10);
			}
		}
	});
	let running=false;
	let moveBy=new MoveByAction({time:200,position:{x:10},onComplete:function(val){
		running=false;
	}});
	anim.updateFrame=function(){
		anim.position.x+=10;
	}
	anim.keypress(function(event){
		log("press");
		anim.run(Number.MAX_VALUE);
		if(!running){
			log("moveby");
			running=true;
			// anim.runAction(moveBy);
		}
	});
	anim.keyup(function(event){
		log("stop");
		anim.stop();
		moveBy.stop();
		running=false;
	})

	let bg=new Sprite({});
	bg.anchor={x:0,y:0};
	bg.texture=new Texture({name:"bg"});
	bg.width=_engx.render.width;
	bg.height=_engx.render.height;
	bg.zIndex=-1;
	// scene.addSprite(bg);

	// scene.addSprite(anim);

	let mm=new Sprite({});
	mm.texture=new Texture({name:'meinv2'});
	mm.width=150;
	mm.height=150;
	mm.anchor={x:1,y:1}
	mm.position={x:300,y:300}

	// mm.shape="circle";
	// scene.addSprite(mm);

	mm.mousedown(function(event){
		if(event.selected){

			// _engx.audioManager.play("gun");
			// var gun=new Music({audioName:"bgmusic",volume:0.1});
			// gun.start();

			mm.grab=true;
			mm.grabEvent=event;
			mm.grabStartPosition={x:mm.position.x,y:mm.position.y};
		}
	});
	mm.mousemove(function(event){
		if(mm.grab){
			let dx=event.layerX-mm.grabEvent.layerX+mm.grabStartPosition.x;
			let dy=event.layerY-mm.grabEvent.layerY+mm.grabStartPosition.y;

			mm.position={x:dx,y:dy};
		}
	})

	mm.mouseup(function(event){
		mm.grab=false;
		var scaleTo=new RotateByAction({time:10000,easing:TWEEN.Easing.Quadratic.InOut,rotate:360,delay:3000});
		if(event.selected){
			mm.runAction(scaleTo);
		}
	});

	scene.firstLayer().mouseup(function(event){
		// log(event);
	});

	let sprite=new Sprite({});
	sprite.texture='meinv';
	sprite.width=150;
	sprite.height=150;
	sprite.anchor={x:0,y:0};

	let layer=new Layer({zIndex:-1,anchor:{x:0.5,y:0.5},position:{x:200,y:200},width:200,height:200});
	// layer.scale.x=2;
	// layer.rotate=45;
	layer.addSprite(sprite);

	// scene.addLayer(layer);
	let music=null;
	scene.enter=function(){
		log("why here!");
		music=new Music({audioName:'bgmusic',loop:false});
		// music.start();
	};
	//this.textAlign=opt.textAlign||"center";
	// this.textBaseline=opt.textBaseline||"middle";
	let text=new Text({text:"hello world",fontSize:50,textAlign:"right",textBaseline:"bottom"});
	text.position={x:200,y:200};//100,100
	// text.anchor={x:0.5,y:0.5};
	text.mousedown(function(event){
		if(event.selected){
			log("hello");
		}
	});
	// scene.addSprite(text);

	engx.sceneManager.go(scene);

	var lay=scene.firstLayer();

	engx.start();

	window.startAction=function(){

	}
	window.stopAction=function(){
		engx.stop();
	}
	window.pauseAction=function(){
		engx.pause();
	}
	window.runAction=function(){
		var moveTo=new MoveByAction({time:500,easing:TWEEN.Easing.Quadratic.InOut,position:{x:200},delay:0,
			onComplete:function(prop){
				log(prop);
			},onUpdate:function(x){
				log(x);
			},repeat:10,repeatDelay:1000,yoyo:true});
		// sprite.runAction(moveTo);
		// var scaleTo=new RotateByAction({time:100,easing:TWEEN.Easing.Quadratic.InOut,rotate:30});
		layer.runAction(moveTo);
	}
	window.playMusicAction=function(){

		music.start();
	}
	window.stopMusicAction=function(){
		music.stop();
	}
	window.pauseMusicAction=function(){
		music.pause();
	}

}
