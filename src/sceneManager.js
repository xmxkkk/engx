'use strict'

class SceneManager{
    constructor(){
    	this.currentScene=null;
    }

    go(scene){
      var self=this;
      this.currentScene&&this.currentScene.leave&&this.currentScene.leave();

      this.currentScene&&
      this.currentScene.release&&
      this.currentScene.release();

      scene.loadResource(function(){
          self.currentScene=scene;
          self.currentScene.enter&&self.currentScene.enter();
      });
    }
}
