'use strict'

var transformPoint=function(pos) {
	pos = [pos[0], pos[1], 1];

	let a = 1,
		b = 0,
		c = 0,
		d = 1,
		e = 0,
		f = 0;
	let matrix = math.matrix([
		[a, c, e],
		[b, d, f],
		[0, 0, 1]
	]);

	e = this.position.x; //-this.anchor.x*this.width+this.anchor.x*this.width;
	f = this.position.y; //-this.anchor.y*this.height+this.anchor.y*this.height;
	matrix = math.matrix([
		[a, c, e],
		[b, d, f],
		[0, 0, 1]
	]);
	pos = math.multiply(matrix, pos);

	a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
	a = this.scale.x;
	d = this.scale.y;
	matrix = math.matrix([
		[a, c, e],
		[b, d, f],
		[0, 0, 1]
	]);
	pos = math.multiply(matrix, pos);

	let r1 = this.rotate * Math.PI / 180;
	a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
	a = Math.cos(r1);
	b = Math.sin(r1);
	c = -Math.sin(r1);
	d = Math.cos(r1);
	matrix = math.matrix([
		[a, c, e],
		[b, d, f],
		[0, 0, 1]
	]);
	pos = math.multiply(matrix, pos);

	a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
	e = -this.anchor.x * this.width;
	f = -this.anchor.y * this.height;
	matrix = math.matrix([
		[a, c, e],
		[b, d, f],
		[0, 0, 1]
	]);
	pos = math.multiply(matrix, pos);

	pos = pos.toArray();
	return [pos[0], pos[1]];
}
