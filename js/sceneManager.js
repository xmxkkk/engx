var SceneManager=function(opt){
    var self=this;

    this.currentScene=null;
    this.init=function(){

    }
    this.go=function(scene){
        this.currentScene&&
        this.currentScene.release&&
        this.currentScene.release();

        scene.loadResource(function(){
            self.currentScene=scene;
        });
    }
}