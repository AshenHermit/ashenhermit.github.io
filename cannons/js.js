var can = document.getElementById('can'); 
can.oncontextmenu = function() {return false;}
var ctx = can.getContext('2d');
ctx.imageSmoothingEnabled= false;
ctx.fillStyle = "#ffffff";

const fps = 60;
var scale = 5;
var Time = 0;

var resize = () => {
	can.width = can.clientWidth/scale;
	can.height = can.clientHeight/scale;
}
resize();

const distortion = 2;
const width = can.width;
const height = can.height;
const groundHeight = can.height - can.height/2;

var gravity = 0.1;
var initFireSpeed = 0.3;
var initBulletType = "bullet";
var initCannonLength = 6;

const groundClr = "#191919";
const fillClr = "rgba(32,32,32,0.2)";


var lastPice = groundHeight;
var ground = [];
var bullets = [];
var cannons = [];

var mouseDown = false;
var isLoaded = false;

function vector2(x,y) {
	this.x = x;
	this.y = y;

	this.add = (v) => {	this.x+=v.x; this.y+=v.y; }
	this.mul = (v) => {	this.x*=v.x; this.y*=v.y; }
	this.round = (v) => { this.x=Math.round(this.x); this.y=Math.round(this.y); }
	this.toZero = (n) => {
		if(this.x>0){this.x-=n}else if(this.x<0){this.x+=n}
		if(this.y>0){this.y-=n}else if(this.y<0){this.y+=n}
	}
}

var mousePose = new vector2(0,0);

var drawLine = (x1,y1,x2,y2) => {
	ctx.msImageSmoothingEnabled = false;
 	ctx.imageSmoothingEnabled = false;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

var getDirection = (angle,dist) => {
	var x = dist*Math.cos(angle*(Math.PI / 180));
	var y = dist*Math.sin(angle*(Math.PI / 180));

	return new vector2(x,y);
}
var getAngle = (v1,v2) => {
	var b = v2.x-v1.x;
	var a = v2.y-v1.y;

	return Math.atan2(a,b)/(Math.PI / 180);
}
var isOutOfScreen = (v) => {
	if(v.x<0 || v.x>width || v.y>height){return true;}
	return false;
}
/////////////////////////////////////////////////////////////////////////////
function Bullet(x,y,dir) {
	this.arrId = bullets.length;
	this.pos = new vector2(x,y);
	this.direction = dir;
	this.scale = 2;
	this.clr = "#ffffff";
	this.speed;

	this.update = () => {
		this.direction.y+=gravity;
		this.pos.add(this.direction);
		ctx.fillStyle = this.clr;
		ctx.fillRect(Math.round(this.pos.x)-this.scale/2,Math.round(this.pos.y)-this.scale/2,this.scale,this.scale);
		if(isOutOfScreen(this.pos)){bullets.splice(this.arrId,1);}
	}
}
function Rocket(x,y,dir) {
	this.arrId = bullets.length;
	this.pos = new vector2(x,y);
	this.direction = dir;
	this.scale = 2;
	this.clr = "#ffffff";
	this.speed = 0.2;
	this.lifeTime = 2;
	this.spawnTime = Time;
	this.explosionStrenth = 2;

	this.update = () => {
		if (Time>=this.spawnTime+this.lifeTime) {this.detonate();}

		this.direction.add(getDirection(getAngle(this.pos,mousePose),this.speed));
		this.pos.add(this.direction);
		ctx.fillStyle = this.clr;
		ctx.fillRect(Math.round(this.pos.x)-this.scale/2,Math.round(this.pos.y)-this.scale/2,this.scale,this.scale);
		this.direction.toZero(this.speed/3.14);
	}
	this.detonate = () => {
		for (var b = 0; b < 12; b++) {
			let randDir = getDirection(Math.random()*360,1);
			bullets.push(new Bullet(this.pos.x,this.pos.y,randDir));
			bullets[bullets.length-1].direction.mul({x:Math.random()*this.explosionStrenth,y:Math.random()*this.explosionStrenth});
			this.direction.mul({x:0.8,y:0.8});
			bullets[bullets.length-1].direction.add(this.direction);
		}

		bullets.splice(this.arrId,1);
	}
}

function Cannon(x,y) {
	this.pos = new vector2(x,y)
	this.angle = 0;
	this.scale = 4;
	this.clr = "#ffffff";
	this.maxlength = initCannonLength;
	this.length = this.maxlength;
	this.strength = 3;
	this.speed = initFireSpeed;

	this.nextFire = this.speed;

	this.update = () => {
		this.speed = initFireSpeed;
		this.maxlength = initCannonLength;
		this.angle = getAngle(this.pos,mousePose);

		if(Time<=this.nextFire){this.length = (this.maxlength/this.speed)*(Time-this.nextFire+this.speed);}else{this.length = this.maxlength}

		let dir = getDirection(this.angle,this.length)
		ctx.lineWidth=this.scale/2;
		ctx.fillStyle = this.clr;
		ctx.fillRect(this.pos.x-this.scale/2,this.pos.y-this.scale/2,this.scale,this.scale);
		ctx.strokeStyle = "#fff";
		drawLine(this.pos.x,this.pos.y,this.pos.x+dir.x,this.pos.y+dir.y);

		this.fire();
	}

	this.fire = () => {
		if(mouseDown && Time>=this.nextFire){
			let spawn = getDirection(this.angle,this.length);
			let dir = getDirection(this.angle,1);
			if(initBulletType=="bullet"){bullets.push(new Bullet(this.pos.x+spawn.x,this.pos.y+spawn.y,dir));}else
			if(initBulletType=="rocket"){bullets.push(new Rocket(this.pos.x+spawn.x,this.pos.y+spawn.y,dir));}
			bullets[bullets.length-1].direction.mul({x:this.strength,y:this.strength});
			this.nextFire = Time+this.speed;
			this.length = 0;
		}
	}
}
/////////////////////////////////////////////////////////////////////////////
var generateGround = () => {
	for(var p = 0; p < width; p++){
		if (lastPice>=height) {
			ctx.clearRect(0, 0, width, height);
			lastPice = groundHeight;
			p = 0;
			ground = [];
		}

		ctx.fillStyle = 'hsl('+(120/width)*p+',100%,80%)';
		lastPice = lastPice+Math.round(Math.random()*distortion*2)-distortion;
		ctx.fillRect(p,lastPice,1,height);

		ctx.fillStyle = groundClr;
		ctx.fillRect(p,lastPice-1,1,1);

		ground.push({x:p,y:lastPice});
	}
}
var drawGround = () => {
	for (var g = 0; g < ground.length; g++) {
		ctx.fillStyle = 'hsl('+(120/width)*ground[g].x+',100%,80%)';
		ctx.fillRect(ground[g].x,ground[g].y,1,height);
		ctx.fillStyle = groundClr;
		ctx.fillRect(ground[g].x,ground[g].y-1,1,1);
	}
}

//generateGround();

//cannons.push(new Cannon(64,80));

function update () {
	if (isLoaded) {
		gravity = parseFloat($('input[name="gravity"]').val());
		initFireSpeed = parseFloat($('input[name="fireSpeed"]').val());
		initBulletType = $('input[name="bulletType"]:checked').val();
		initCannonLength = parseFloat($('input[name="cannonLength"]').val());
	}

	////////////////////////////////////
	//ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = fillClr;
	ctx.fillRect(0,0,width,height);
	for (var b = 0; b < bullets.length; b++) {
		bullets[b].arrId = b;
		bullets[b].update();
	}
	for (var c = 0; c < cannons.length; c++) {
		cannons[c].update();
	}


	drawGround();
	Time+=(1000/fps)/1000;
};

setInterval(update,1000/fps);


document.addEventListener('mousedown', function(e) {
	if (e.button==0) {
		mouseDown = true;
	}else
	if (e.button==2) {
		cannons.push(new Cannon(Math.round(mousePose.x),Math.round(mousePose.y)));
		cannons[cannons.length-1].speed = parseFloat($('input[name="fireSpeed"]').val());
	}
});
document.addEventListener('mouseup', function(e) {mouseDown = false;});

document.addEventListener('mousemove', function(e) {
	mousePose.x = (width/can.clientWidth)*e.pageX;mousePose.x-=2;
	mousePose.y = (height/can.clientHeight)*e.pageY;mousePose.y-=2;
});

window.addEventListener('resize', function (e) {
	resize();
})

document,addEventListener('load', function(e) {
	$('input[name="gravity"]').val(gravity);
	$('input[name="fireSpeed"]').val(initFireSpeed);
	$('input[name="cannonLength"]').val(initCannonLength);
	isLoaded = true;
})
