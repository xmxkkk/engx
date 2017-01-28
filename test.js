'use strict'



for(let i=0;i<10;i++){
	(function(k){
		console.log(k);
	})(i);
}


function a () {
	var k = 1;
	return function() {
		console.log(k);
	}
}

var b = a();

b();
