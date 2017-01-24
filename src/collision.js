'use strict'

class Collision{
	constructor(){
		this.defaultMask="00000000";
		this.nodes=[];
		for(let i=0;i<this.defaultMask.length;i++){
			this.nodes[i]=[];
		}
	}
	getNode(node){
		if(node.mask&&node.mask!=this.defaultMask){
			for(let i=0;i<node.mask.length;i++){
				if(node.mask.charAt(i)=="1"){
					this.nodes[i].push(node);
				}
			}
			// this.nodes.push(node);
		}
		for(let i=0;i<node.children.length;i++){
			this.getNode(node.children[i]);
		}
	}
	check(){
		if(_engx.sceneManager.currentScene){
			this.nodes=[];
			for(let i=0;i<this.defaultMask.length;i++){
				this.nodes[i]=[];
			}

			this.getNode(_engx.sceneManager.currentScene);
			// log(this.nodes);
			for(let i=0;i<this.defaultMask.length;i++){
				if(this.nodes[i].length>1){
					for(let j=0;j<this.nodes[i].length;j++){
						for(let k=j+1;k<this.nodes[i].length;k++){
							let node1=this.nodes[i][j];
							let node2=this.nodes[i][k];
							if(node1.shape=="box"&&node2.shape=="box"){
								if(this.boxAndbox(node1,node2)){
									node1.collision&&node1.collision(node2);
									node2.collision&&node2.collision(node1);
								}
							}else if(node1.shape=="circle"&&node2.shape=="circle"){
								if(this.circleAndcircle(node1,node2)){
									node1.collision&&node1.collision(node2);
									node2.collision&&node2.collision(node1);
								}
							}else if(node1.shape=="circle"&&node2.shape=="box"){
								if(this.circleAndbox(node1,node2)){
									node1.collision&&node1.collision(node2);
									node2.collision&&node2.collision(node1);
								}
							}else if(node2.shape=="circle"&&node1.shape=="box"){
								if(this.circleAndbox(node2,node1)){
									node1.collision&&node1.collision(node2);
									node2.collision&&node2.collision(node1);
								}
							}
						}
					}
				}
			}
		}
	}
	circleAndbox(node1,node2){
		//pointToLine
		let node1Position=[node1.position.x+(0.5-node1.anchor.x)*node1.width,node1.position.y+(0.5-node1.anchor.y)*node1.height];
		for(let i=0;i<node2.borders.length;i++){
			let x=node2.borders[i];

			let distance=pointDistance(node2.borders[i],node1Position);
			if(distance<node1.width/2){
				return true;
			}
		}

		let len=node2.borders.length;
		for(let i=0;i<len;i++){
			let distance=pointToLine(node1Position,node2.borders[i%len],node2.borders[(i+1)%len]);
			if(distance<node1.width/2){
				return true;
			}
		}

		return false;
	}
	circleAndcircle(node1,node2){
		let distance=pointDistance([node1.position.x,node1.position.y],[node2.position.x,node2.position.y]);
		if(distance<=(node1.width/2+node2.width/2)){
			return true;
		}
		return false;
	}
	boxAndbox(node1,node2){
		for(let i=0;i<node1.borders.length;i++){
			if(containPoint(node1.borders[i],node2.borders)){
				return true;
			}
		}
		for(let i=0;i<node2.borders.length;i++){
			if(containPoint(node2.borders[i],node1.borders)){
				return true;
			}
		}

		return false;
	}

}
