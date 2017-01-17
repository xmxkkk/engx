var MoveToAction=function(opt){
    var self=this;

    this.pos=opt.pos||{x:0,y:0};

    this.time=opt.time||1000;
    this.easing=opt.easing||TWEEN.Easing.Linear.None;
    this.sprite=null;
    this.tween=null;

    this.start=function(){
        this.tween=new TWEEN.Tween(this.sprite.pos).to(this.pos,this.time).onUpdate(function(){
            self.sprite.pos={x:this.x,y:this.y};
        }).easing(this.easing).start(_render.getTime());
    }
}

var MoveByAction=function(opt){
    var self=this;

    this.pos=opt.pos||{x:0,y:0};

    this.time=opt.time||1000;
    this.easing=opt.easing||TWEEN.Easing.Linear.None;
    this.sprite=null;
    this.tween=null;

    this.start=function(){
        var toX=(this.pos.x?this.pos.x:0)+this.sprite.pos.x;
        var toY=(this.pos.y?this.pos.y:0)+this.sprite.pos.y;
        
        this.tween=new TWEEN.Tween(this.sprite.pos).to({x:toX,y:toY},this.time)
        .onUpdate(function(){
            self.sprite.pos={x:this.x,y:this.y};
        }).easing(this.easing).start(_render.getTime());
    }
}

var ScaleToAction=function(opt){
    var self=this;

    this.scale=opt.scale||{x:0,y:0};

    this.time=opt.time||1000;
    this.easing=opt.easing||TWEEN.Easing.Linear.None;
    this.sprite=null;
    this.tween=null;

    this.start=function(){
        this.tween=new TWEEN.Tween(this.sprite.scale).to(this.scale,this.time)
        .onUpdate(function(){
            self.sprite.scale={x:this.x,y:this.y};
        }).easing(this.easing).start(_render.getTime());
    }
}

var ScaleByAction=function(opt){
    var self=this;

    this.scale=opt.scale||{x:0,y:0};

    this.time=opt.time||1000;
    this.easing=opt.easing||TWEEN.Easing.Linear.None;
    this.sprite=null;
    this.tween=null;

    this.start=function(){
        var toX=(this.scale.x?this.scale.x:0)+this.sprite.scale.x;
        var toY=(this.scale.y?this.scale.y:0)+this.sprite.scale.y;

        this.tween=new TWEEN.Tween(this.sprite.scale).to({x:toX,y:toY},this.time)
        .onUpdate(function(){
            self.sprite.scale={x:this.x,y:this.y};
        }).easing(this.easing).start(_render.getTime());
    }
}

var RotateToAction=function(opt){
    var self=this;

    this.rotate=opt.rotate||0;

    this.time=opt.time||1000;
    this.easing=opt.easing||TWEEN.Easing.Linear.None;
    this.sprite=null;
    this.tween=null;

    this.start=function(){
        this.tween=new TWEEN.Tween({rotate:this.sprite.rotate}).to({rotate:this.rotate},this.time)
        .onUpdate(function(){
            self.sprite.rotate=this.rotate;
        }).easing(this.easing).start(_render.getTime());
    }
}

var RotateByAction=function(opt){
    var self=this;

    this.rotate=opt.rotate||0;

    this.time=opt.time||1000;
    this.easing=opt.easing||TWEEN.Easing.Linear.None;
    this.sprite=null;
    this.tween=null;

    this.start=function(){
        var toRotate=this.rotate+this.sprite.rotate;
        
        this.tween=new TWEEN.Tween({rotate:this.sprite.rotate}).to({rotate:toRotate},this.time)
        .onUpdate(function(){
            self.sprite.rotate=this.rotate;
        }).easing(this.easing).start(_render.getTime());
    }
}