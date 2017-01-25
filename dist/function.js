'use strict';

var debug = false;

var log = function log(value) {
    debug && console.log(value);
};

var eventNames = ["mousedown", "mousemove", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel", "mouseenter", "mouseleave", "mouseout", "mouseover", "keydown", "keypress", "keyup"];

var noColor = "rgba(0,0,0,0)";
var yesColor = "rgba(256,0,0,1)";

var randomId = function randomId() {
    return parseInt(Math.random() * 90000000 + 10000000) + "-" + parseInt(Math.random() * 90000000 + 10000000) + "-" + parseInt(Math.random() * 90000000 + 10000000) + "-" + parseInt(Math.random() * 90000000 + 10000000);
};

var containPoint = function containPoint(p, points) {
    var nCross = 0;
    var nCount = points.length;
    for (var i = 0; i < points.length; i++) {
        var p1 = points[i];
        var p2 = points[(i + 1) % nCount]; // 求解 y=p.y 与 p1p2 的交点

        if (p1[1] == p2[1]) // p1p2 与 y=p0.y平行
            continue;
        if (p[1] < Math.min(p1[1], p2[1])) // 交点在p1p2延长线上
            continue;
        if (p[1] >= Math.max(p1[1], p2[1])) // 交点在p1p2延长线上
            continue; // 求交点的 X 坐标 --------------------------------------------------------------

        var x = (p[1] - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
        if (x > p[0]) nCross++; // 只统计单边交点
    } // 单边交点为偶数，点在多边形之外 ---

    return nCross % 2 == 1;
};
var pointDistance = function pointDistance(pos1, pos2) {
    return Math.sqrt((pos1[0] - pos2[0]) * (pos1[0] - pos2[0]) + (pos1[1] - pos2[1]) * (pos1[1] - pos2[1]));
};
//var pointToLine(double PAx, double PAy,double PBx, double PBy,double PCx, double PCy)
var pointToLine = function pointToLine(point, point1, point2) {
    var a = pointDistance(point, point1);
    var b = pointDistance(point1, point2);
    var c = pointDistance(point, point2);
    if (b * b >= c * c + a * a) return c;
    if (c * c >= b * b + a * a) return b;
    var l = (a + b + c) / 2;
    var s = Math.sqrt(l * (l - a) * (l - b) * (l - c));
    return 2 * s / a;
};

/*
var loadAudio=function(resourceData,callback){
	var xhr=new XMLHttpRequest();
	xhr.open('GET',resourceData.url,true);
	xhr.responseType='arraybuffer';
	xhr.onload=function(e){
	var context=new AudioContext();
	context.decodeAudioData(this.response, function(buffer) { //解码成功时的回调函数
	    var audio=context.createBufferSource();
	    audio.buffer = buffer;
	    audio.connect(context.destination);
	    callback(audio,resourceData);
	}, function(e) { //解码出错时的回调函数
	    console.log('Error decoding file', e);
	});
	}
	xhr.send();
}*/