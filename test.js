'use strict'

var containPoint =function(p, points){
	let nCross = 0;
	let nCount=points.length;
　　for (let i = 0; i < points.length; i++){
　　　　let p1 = points[i];
　　　　let p2 = points[(i + 1) % nCount];
　　　　// 求解 y=p.y 与 p1p2 的交点
　　　　if ( p1[1] == p2[1] ) // p1p2 与 y=p0.y平行
　　　　　　continue;
　　　　if ( p[1] < Math.min(p1[1], p2[1]) ) // 交点在p1p2延长线上
　　　　　　continue;
　　　　if ( p[1] >= Math.max(p1[1], p2[1]) ) // 交点在p1p2延长线上
　　　　　　continue;
　　　　// 求交点的 X 坐标 --------------------------------------------------------------
　　　　let x = (p[1] - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
　　　　if ( x > p[0] )
　　　　　　nCross++; // 只统计单边交点
　　}
 　 // 单边交点为偶数，点在多边形之外 ---
  　return (nCross % 2 == 1);
}

// let points=[[170,490],[230,490],[230,550],[170,550]];
// console.log(containPoint([195,-79],points));
// console.log(containPoint([245,-79],points));
// console.log(containPoint([245,-41],points));
// console.log(containPoint([195,-41],points));
let points=[[195,-79],[],[],[]];


console.log(["left","right","center"]["center"])



/*
170,490
230,490
230,550
170,550

195,-79
245,-79
245,-41
195,-41
*/
