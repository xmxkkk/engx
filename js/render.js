
var Render=function(opt){
    var self=this;
    var fps=opt.fps||30;
    var interval=1000.0/fps;

    var times=0;
    
    var handleId=0;

    _canvas.width=opt.width;
    _canvas.height=opt.height;
    _canvas.style.background=opt.background;

    var context=null;
    var canvasBuffer=null;
    var contextBuffer=null;

    this.init=function(){
        canvasBuffer = document.createElement("canvas"); 
        canvasBuffer.width = _canvas.width;  
        canvasBuffer.height = _canvas.height;  
        context = _canvas.getContext("2d");  
        contextBuffer = canvasBuffer.getContext("2d");  
        context.clearRect(0, 0, canvas.width, canvas.height)  
        contextBuffer.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);
    }
    this.getTime=function(){
        return times*interval;
    }

    this.update=function(){
        times++;

        context.clearRect(0, 0, canvas.width, canvas.height)  
        contextBuffer.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);  

        //contextBuffer用于绘制的cxt
        _sceneManager.currentScene&&
        _sceneManager.currentScene.draw&&
        _sceneManager.currentScene.draw(contextBuffer);

        context.drawImage(canvasBuffer, 0, 0);

        TWEEN.update(self.getTime());
    }
    

    this.run=function(){
        handleId=setInterval(this.update,interval);
    }

    this.start=function(){
        this.run();
    }
    this.stop=function(){
        if(handleId){
            clearInterval(handleId);
            handleId=0;
        }
    }
    this.pause=function(){
        if(handleId){
            clearInterval(handleId);
            handleId=0;
        }else{
            this.run();
        }
    }
}