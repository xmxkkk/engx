var Scene=function(){
    var self=this;
    /*
    [{name:xx,url:xxx,type:image}]
    */
    var resource=[];
    var resourceData=[];

    this.layers=[];

    this.release=null;

    this.init=function(_resourceData){
        resourceData=_resourceData;
        this.resource=resource;

        var layer=new Layer();
        this.addLayer(layer);
    }
    this.loadResource=function(callback){
        var len=resourceData.length;
        for(var i=0;i<len;i++){
            if(resourceData[i].type=="image"){
                var img=new Image();
                img.src=resourceData[i].url;
                img.name=resourceData[i].name;
                img.onload=function(){
                    self.resource[this.name]=this;
                    len--;
                    if(len<=0){
                        callback();
                    }
                }
            }
        }
    }
    this.draw=function(cxt){
        for(var i=0;i<this.layers.length;i++){
            this.layers[i].draw(cxt);
        }
    }
    this.addLayer=function(layer){
        layer.setScene(this);
        this.layers[this.layers.length]=layer;
    }
    this.firstLayer=function(){
        var layer=null;
        var max=2000000000;
        for(var i=0;i<this.layers.length;i++){
            if(this.layers[i].zIndex<max){
                layer=this.layers[i];
            }
        }
        if(layer==null)layer=this.layers[0];
        return layer;
    }
    this.lastLayer=function(){
        var layer=null;
        var min=-2000000000;
        for(var i=0;i<this.layers.length;i++){
            if(this.layers[i].zIndex>min){
                layer=this.layers[i];
            }
        }
        if(layer==null)layer=this.layers[0];
        return layer;
    }
    this.addSprite=function(sprite){
        this.lastLayer().addSprite(sprite);
    }
}