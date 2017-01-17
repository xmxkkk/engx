var Layer=function(){
    this.scene=null;
    this.x=0;
    this.y=0;
    this.zIndex=0;
    this.sprites=[];

    this.init=function(){

    }
    this.draw=function(cxt){
        for(var i=0;i<this.sprites.length;i++){
            this.sprites[i].draw&&this.sprites[i].draw(cxt);
        }
    }
    this.addSprite=function(sprite){
        sprite.layer=this;
        sprite.scene=this.scene;

        this.sprites[this.sprites.length]=sprite;
    }
    this.setScene=function(scene){
        this.scene=scene;
        for(var i=0;i<this.sprites.length;i++){
            this.sprites[i].scene=scene;
        }
    }
}