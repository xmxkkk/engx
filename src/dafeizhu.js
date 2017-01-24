'use strict'

window.load=function(){
	let winWidth=400;
	let winHeight=600;

	let engx=new Engx(document.getElementById('canvas'),{
		width:winWidth,
		height:winHeight,
		background:'rgb(88,88,88)',
		fps:60
	});

	let gameScene=new Scene({});
	gameScene.addResource(
		[
			{name:'fly',url:'./resource/img/fly.png'+"?time="+randomId(),type:'image'},
			{name:'feizhu',url:'./resource/img/feizhu.png'+"?time="+randomId(),type:'image'},
			{name:'daodan',url:'./resource/img/daodan.png'+"?time="+randomId(),type:'image'},
			{name:'gun',url:'./resource/audio/gun.wav'+"?time="+randomId(),type:"audio"},
			{name:'boom',url:'./resource/audio/3431.mp3'+"?time="+randomId(),type:"audio"},
			{name:'flyboom',url:'./resource/audio/flyboom.wav'+"?time="+randomId(),type:"audio"},
			{name:'boom',url:'./resource/img/boom.png'+"?time="+randomId(),type:"image"}
		]
	);
	let layer=new Layer({});
	gameScene.addLayer(layer);

	let feizhuTime=0;
	let feizhuHandleId=0;
	let feizhuIntervalTime=200;

	let fasheFeizhu=function(){
		feizhuHandleId=setInterval(function(){
			if((_engx.render.getTime()-feizhuTime)>feizhuIntervalTime){
				let feizhu=new Sprite({texture:"feizhu",mask:"00000011"});
				feizhu.position={x:parseInt(Math.random()*winWidth),y:0};
				feizhu.collision=function(node){
					if(node.texture=="feizhu"){
						return;
					}else if(node.texture=="daodan"){
						// console.log("feizhu==="+node);
						this.remove();
					}
				}
				layer.addSprite(feizhu);

				let moveTo=new MoveToAction(
					{
						time:1000,
						position:{
							y:winHeight+60,
							x:parseInt(Math.random()*360)+20
						},
						onComplete:function(val){
							feizhu.remove();
						}
					}
				);
				feizhu.runAction(moveTo);

				feizhuTime=_engx.render.getTime();
			}
		},feizhuIntervalTime);
	}
	gameScene.enter=function(){
		fasheFeizhu();
	}
	let gameStatus="running";

	let fly=new Sprite({texture:"fly",zIndex:3,mask:"00000010"});
	fly.position={x:winWidth/2,y:winHeight-80};
	fly.collision=function(node){
		if(node.texture=="feizhu"&&gameStatus!="over"){
			gameStatus="over";
			fly.touch.down=false;
			log("stop");
			let flyboom=new Music({audioName:'flyboom'});
			flyboom.start();

			clearInterval(feizhuHandleId);
			clearInterval(daodanhandleId);

			let boom=new Animation({width:200,height:200});
			boom.addFrame(new Texture({name:'boom',rect:{x:0,y:0,width:500,height:491},width:200,height:200}));
			boom.addFrame(new Texture({name:'boom',rect:{x:500,y:0,width:500,height:491},width:200,height:200}));
			boom.addFrame(new Texture({name:'boom',rect:{x:500,y:491,width:500,height:491},width:200,height:200}));
			boom.addFrame(new Texture({name:'boom',rect:{x:0,y:491,width:500,height:491},width:200,height:200}));
			boom.zIndex=10;
			boom.position=fly.position;
			layer.addNode(boom);
			boom.run(0,function(val){
				boom.remove();
				fly.remove();
				// engx.stop();
			});

		}
	}
	layer.addSprite(fly);

	let fasheTime=0;
	let daodanhandleId=0;
	let fasheIntervalTime=300;

	let fasheDaodan=function(){
		daodanhandleId=setInterval(function(){
			// if((_engx.render.getTime()-fasheTime)>30&&fly.touch.down==true){
			if(fly.touch.down==true){

				let daodan=new Sprite({texture:"daodan",mask:"00000001",position:{x:fly.position.x,y:fly.position.y-10}});
				daodan.collision=function(node){
					if(node.texture=="feizhu"){
						console.log("xxxxxxx"+node);
						this.remove();
						let gunMusic=new Music({audioName:'boom',loop:false});
						gunMusic.start();
					}
				}
				layer.addSprite(daodan);

				let moveTo=new MoveToAction({time:400,position:{y:-100},onComplete:function(val){
					daodan.remove();
				}})
				daodan.runAction(moveTo);

				fasheTime=_engx.render.getTime();
			}
		},fasheIntervalTime);
	}

	fly.touch={
		down:false,
		downPos:{x:0,y:0}
	};
	fly.mousedown(function(event){
		if(event.selected){
			log(1);
			fly.touch.down=true;
			fly.touch.downPos={x:event.layerX,y:event.layerY};
			fly.touch.position=fly.position;

			fasheDaodan();
		}
	});
	fly.mousemove(function(event){
		if(fly.touch.down){
			let dx=event.layerX-fly.touch.downPos.x;
			let dy=0;
			fly.position={
				x:fly.touch.position.x+dx,
				y:fly.touch.position.y+dy
			}
		}
	});
	fly.mouseup(function(event){
		fly.touch.down=false;
	});
	// layer.removeNode(fly);
	engx.sceneManager.go(gameScene);
	engx.start();

	window.pauseAction=function(){
		engx.pause(function(){
		});
	}

}