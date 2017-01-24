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
							}
						}
					}
				}
			}
		}
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
