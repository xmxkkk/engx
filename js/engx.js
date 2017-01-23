var Engx=function(canvas,opt){
    window._engx=this;

    var width=opt.width||400;
    var height=opt.height||300;

    window._canvas=canvas;

    this.init=function(){
        var sceneManager=new SceneManager(opt);
        sceneManager.init();

        var render=new Render(opt);
        render.init();

        var eventManager=new EventManager();
        eventManager.init();

        window._eventManager=eventManager;
        window._render=render;
        window._sceneManager= sceneManager;
    }

    this.start=function(){
        _render.start();
    }
    this.stop=function(){
        _render.stop();
    }
    this.pause=function(){
        _render.pause();
    }
    
    this.init();
}
