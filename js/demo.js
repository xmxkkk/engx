var log=console.log;


window.load=function(){
	var engx=new Engx(document.getElementById('canvas'),{
		width:800,
		height:300,
		background:'rgb(88,88,88)',
		fps:30
	});
	
//[{name:xx,url:xxx,type:image}]
	
	//可以增加个Resource类用于加载资源

	var mainScene=new Scene();
	mainScene.init([
		{name:'meinv',url:'https://img6.bdstatic.com/img/image/smallpic/xiaoqingxin112.jpg',type:'image'},
		{name:'meinv2',url:'http://img6.bdstatic.com/img/image/smallpic/chongwu112.jpeg',type:'image'}]
		);

	var btn=new Sprite();
	btn.pos={x:20+100/2,y:20+35/2};
	btn.width=100;
	btn.height=35;
	btn.texture="meinv2";

	btn.addEvent('mousedown',function(event){
		log("calback in btn mousedown:"+event);
	});
	btn.addEvent('mouseup',function(event){
		log("calback in btn mouseup:"+event);
	});
	btn.addEvent('mousemove',function(event){
		log("calback in btn mousemove:"+event);
	});
	btn.addEvent('mouseenter',function(event){
		log("calback in btn mouseenter:"+event);
	});
	btn.addEvent('mouseleave',function(event){
		log("calback in btn mouseleave:"+event);
	});
	btn.addEvent('mouseout',function(event){
		log("calback in btn mouseout:"+event);
	});
	btn.addEvent('mouseover',function(event){
		log("calback in btn mouseover:"+event);
	});


	var sprite=new Sprite();
	sprite.pos={x:100,y:100};
	sprite.width=200;
	sprite.height=200;
	// sprite.rotate=45;
	sprite.shape="box";

	sprite.texture="meinv";

	sprite.addEvent('mousedown',function(event){
		log("calback in mousedown:"+event);
	});
	sprite.addEvent('mouseup',function(event){
		log("calback in mouseup:"+event);
	});
	sprite.addEvent('mousemove',function(event){
		log("calback in mousemove:"+event);
	});
	sprite.addEvent('mouseenter',function(event){
		log("calback in mouseenter:"+event);
	});
	sprite.addEvent('mouseleave',function(event){
		log("calback in mouseleave:"+event);
	});
	sprite.addEvent('mouseout',function(event){
		log("calback in mouseout:"+event);
	});
	sprite.addEvent('mouseover',function(event){
		log("calback in mouseover:"+event);
	});
	
	var moveTo=new MoveToAction({time:3000,easing:TWEEN.Easing.Quadratic.InOut,pos:{x:300}});
	var scaleTo=new ScaleByAction({time:6000,easing:TWEEN.Easing.Quadratic.InOut,scale:{x:0.5,y:0.5}});
	var rotateTo=new RotateByAction({time:100,easing:TWEEN.Easing.Quadratic.InOut,rotate:30});
	
	mainScene.addSprite(sprite);
	mainScene.addSprite(btn);

	_sceneManager.go(mainScene);



	// sprite.runAction(moveTo);
	engx.start();
	window.goAction=function(){
		// 
		// sprite.runAction(scaleTo);
		// sprite.runAction(moveTo);

		sprite.runAction(rotateTo);
	}

	window.pauseAction=function(){
		engx.pause();
	}
	window.stopAction=function(){
		engx.stop();
	}
	
}