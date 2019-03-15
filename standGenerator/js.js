var time = 0;

var can = document.getElementById('can');
var ctx = can.getContext('2d');
can.width = window.innerWidth;
can.height = window.innerHeight;

const DOTCLR = "#ffffff",
           ENMCLR = "#F17E7E",
BCKCLR = "rgba(0, 0, 0, .25)";

const circle = 2*Math.PI;
const width = can.width;
const height = can.height;
var circleImg = new Image(); circleImg.src = "circle.png";
var mousePos = {x:0,y:0};
var infoShow = false;
var maxPoints = 10;

var abilities = [
	["влажность",Math.floor((Math.random() * maxPoints))],
	["умность",Math.floor((Math.random() * maxPoints))],
	["выносливость",Math.floor((Math.random() * maxPoints))],
	["стояк",Math.floor((Math.random() * maxPoints))],
	["метаболизм",Math.floor((Math.random() * maxPoints))],
	["скорость",Math.floor((Math.random() * maxPoints))],
	["дальность",Math.floor((Math.random() * maxPoints))]
]
function generate() {
	abilities.forEach(function(ab) {ab[1] = Math.floor((Math.random() * maxPoints));});
	$('#description').html('<span style="color: #fff;font-weight: 500;font-size: 1.5em">Описание:<span><br>...Погодь...');
	generateAbility();
}
//animations
var abLevelsAnim = [];// levels animation
var abCirclesAnim = [];// levels animation
abilities.forEach(function(ab){
	abLevelsAnim.push(0);
	abCirclesAnim.push({c:0,t:0.3});
});
//end animations

ctx.strokeStyle = "#5c665f";
ctx.fillStyle = "#2d2d2d";
ctx.lineCap = "round";
ctx.lineWidth = 5;

var r=height/8;

function drawOneSircle() {
	ctx.fillStyle = "#2c313c";
	ctx.beginPath();
	ctx.arc(width/2,height/2,r,0,circle);
}

var cellAng = circle/abilities.length;
function drawCircle() {
	ctx.globalAlpha = 1;
	//circle shadow
	ctx.fillStyle = "#2d2d2d";
	ctx.fillStyle = "#11141a";
	ctx.beginPath();
	ctx.arc(width/2,height/2+10,r,0,circle);
	ctx.fill();
	//circle fill
	drawOneSircle();
	ctx.fill();

	for(var l = 1; l<abilities.length+1;l++){
		//cells
		ctx.strokeStyle = "#3f464a";
		ctx.beginPath();
		ctx.moveTo(width/2,height/2);
		ctx.lineTo(Math.sin(cellAng*l)*r+width/2,
				   Math.cos(cellAng*l)*r+height/2);
		ctx.stroke();
	}
	ctx.strokeStyle = "#5c665f";
	drawOneSircle();
	ctx.stroke();
	ctx.beginPath();
	ctx.stroke();
}

function drawAbilities(){
	ctx.strokeStyle = ctx.fillStyle = "#f4ac5f";
	ctx.lineJoin = "round";

	let am = r/maxPoints; //ability line multiplier
	ctx.moveTo(Math.sin(cellAng*0)*abLevelsAnim[0]*am+width/2,
			   Math.cos(cellAng*0)*abLevelsAnim[0]*am+height/2);
	for(var l = 0; l<abilities.length;l++){
		let x = Math.sin(cellAng*(l))*abLevelsAnim[l]*am+width/2;
		let y = Math.cos(cellAng*(l))*abLevelsAnim[l]*am+height/2;
		ctx.lineTo(x,y);
		drawPointerCircle(x,y,l);
	}
	ctx.lineTo(Math.sin(cellAng*0)*abLevelsAnim[0]*am+width/2,
			   Math.cos(cellAng*0)*abLevelsAnim[0]*am+height/2);

	ctx.globalAlpha = 0.25;
	ctx.fill();
	ctx.globalAlpha = 1;
	ctx.stroke();
}

function drawPointerCircle(x,y,i) {
	let s = r/8;
	if (distanceToMouse(x,y)<16) {
		abCirclesAnim[i].t = 1;infoShow=true;
		$('#ability').html(abilities[i][0]);
		$('#level').html(abilities[i][1]+'/'+maxPoints);
	}else{abCirclesAnim[i].t = 0.3;$('#info').css('opacity','0');};
	ctx.globalAlpha=abCirclesAnim[i].c;
	s+=(ctx.globalAlpha-0.3)*8;
	ctx.drawImage(circleImg,x-s/2,y-s/2,s,s);
}

setInterval(function() {
	ctx.clearRect(0,0,width,height);
	drawCircle();
	drawAbilities();
	for (var i = 0; i < abLevelsAnim.length; i++){
		if(i*4<time) abLevelsAnim[i]+=(abilities[i][1]-abLevelsAnim[i])/6;//animate
		abCirclesAnim[i].c+=(abCirclesAnim[i].t-abCirclesAnim[i].c)/4;
	}
	time++;
	$('#info').css({
		left: Number.parseInt($('#info').css('left'))+(mousePos.x-Number.parseInt($('#info').css('left')))/3,
		top: Number.parseInt($('#info').css('top'))+(mousePos.y-Number.parseInt($('#info').css('top')))/3
	});
	$('#info').css('opacity',(infoShow) ? '0.5' : '0');
},1000/60);


document.addEventListener('mousemove',function(e){
	mousePos.x = e.pageX;
	mousePos.y = e.pageY;
});
function distanceToMouse(x,y) {
	var x = Math.abs(mousePos.x-x);
	var y = Math.abs(mousePos.y-y);
	return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}