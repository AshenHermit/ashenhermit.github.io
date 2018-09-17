////////////////////////////////////////////////
//системные перемнные (глобальные)
for (var i = 0; i < document.getElementsByTagName('canvas').length; i++) {
	document.getElementsByTagName('canvas')[i].width  = window.innerWidth;
	document.getElementsByTagName('canvas')[i].height  = window.innerHeight;
}

var touchDown = false;
var mousePos = {x:0,y:0}

var can = document.getElementById('can');
var ctx = can.getContext('2d');

var canback = document.getElementById('canback');
var ctxback = canback.getContext('2d');

var initDel = 8;
var initScreenDel = 1.5;
var initCamXPosition = 0;

var camXPosition = 0;
var camYPosition = 0;
var del = 8;
var screenDel = 1.5;

function drawScene(context) {
	context.clearRect(0, 0, window.innerWidth, window.innerHeight)
	context.strokeStyle = "#bc6cff";
	context.lineWidth=3;

	var rp = window.innerWidth/del;
	var hcenter = window.innerHeight/screenDel;

	for (var p = -rp*2; p < rp*2; p++) {
		var pwc = p; //(point with cam) position
		
		context.beginPath();

		context.moveTo(pwc*rp+camXPosition,window.innerHeight);
		context.lineTo((window.innerWidth)/2*pwc/50+window.innerWidth/2,hcenter);	

		context.stroke();
	}

	for (var l = 1; l < hcenter/10; l++) {
		var ldel = l*l/5;
		context.beginPath();

		context.moveTo(0,hcenter+l*ldel);
		context.lineTo(window.innerWidth,hcenter+l*ldel);	

		context.stroke();
	}

	context.clearRect(0, 0, window.innerWidth, hcenter)

	var sun = new Image();
	sun.src = "src/sun.png";
	imgDel = 3;
	sun.width = ((sun.width/imgDel)*window.innerWidth/1500);
	sun.height = ((sun.height/imgDel)*window.innerWidth/1500);
	context.drawImage(sun,(window.innerWidth/2-sun.width/2)+(window.innerWidth/2-camXPosition)/50,hcenter-sun.height,sun.width,sun.height);
}

function updateCanvases() {
	drawScene(ctxback);
	drawScene(ctx);
}

var TcamXPosition = 0;
var TscreenDel = 1.5;

updateCanvases();

function Mupdate() {
	TcamXPosition = (window.innerWidth)-mousePos.x;
	TscreenDel = ((window.innerHeight*1.3)-mousePos.y)/300;
}


function update() {
	Mupdate()

	camXPosition = camXPosition+(TcamXPosition-camXPosition)/10;
	screenDel = screenDel+(TscreenDel-screenDel)/10;
	updateCanvases();
}

function updateMousePos(e) {
	mousePos.x = e.pageX;
	mousePos.y = e.pageY;
}

setInterval(update,1000/60);
$(document).mousemove(updateMousePos);
document.addEventListener('touchmove', updateMousePos);
$(document).mousedown(function(e) {
	touchDown = true;
});

$(document).mousedown(function(e) {
	touchDown = true;
});
