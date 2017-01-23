'use strict'

class Node{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){
		return this.x+","+this.y;
	}
}

let node=new Node(1,2);

console.log(node);