Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

var circle = document.getElementById('circle')

var memoryEl = document.getElementById('memory')
var title = document.getElementById('title')
var description = document.getElementById('description')

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var nearCircle = 240;
var farCircle = 270;

var memories = [
	{
		"pos": 48,
		"title": "w",
		"description": ""
	},
	{
		"pos": 4,
		"title": "Снежная деревня",
		"description": "apdpawkd awdkm lkwamd lka\nawdawawd\nawawd"
	},
	{
		"pos": 12,
		"title": "Возвращение",
		"description": "awda\nawdawe aqwd wdadawd awdawd\nawd"
	},

]

function init(){
	var rect = circle.getClientRects()[0]
	circle.style.marginLeft = -rect.width/2+"px"
	circle.style.marginTop  = -rect.height/2+"px"
}
init()

var mousePos = {x:0, y:0}
var angleTarget = 0
var angle = 0

var controls = {}

var lastSelected = -1;
var selected = 0;

function updateMemoryBlock(){
	title.innerHTML = memories[selected].title
	description.innerHTML = memories[selected].description
	.replace(new RegExp("\n", "g"), "<br>")

	var rect = memoryEl.getClientRects()[0]
	memoryEl.style.marginLeft = -rect.width/2+"px"
	memoryEl.style.marginTop  = -rect.height/2+"px"
}

var isRight = false;
var isDown = false;

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ctx.strokeStyle = "#2e3133"
	ctx.fillStyle = "#A0A0A0"

	for (var i = 0; i < 12; i++) {
		var dir = {
			x: Math.cos((Math.PI*2/12)*i+(Math.PI*2/12/2)),
			y: Math.sin((Math.PI*2/12)*i+(Math.PI*2/12/2))
		}

		ctx.lineWidth = 4

		if(i==1) ctx.lineWidth = 9

		ctx.beginPath();
		ctx.moveTo(
			window.innerWidth/2+ dir.x*nearCircle,
			window.innerHeight/2+ dir.y*nearCircle);
		ctx.lineTo(
			window.innerWidth/2+ dir.x*farCircle,
			window.innerHeight/2+ dir.y*farCircle);
		ctx.stroke();
	}

	var dist = 360

	for (var i = 0; i < memories.length; i++) {
		ctx.globalAlpha = (1-Math.abs(angle-memories[i].pos)/16).clamp(0, 1)

		if (Math.abs(angle-memories[i].pos)<dist) {
			dist = Math.abs(angle-memories[i].pos);
			selected = new Number(i)
		}

		var dir = {
			x: Math.cos((Math.PI/180)*memories[i].pos+(Math.PI*2/12/2)+(Math.PI*2/12)*1),
			y: Math.sin((Math.PI/180)*memories[i].pos+(Math.PI*2/12/2)+(Math.PI*2/12)*1)
		}

		ctx.beginPath();
		ctx.moveTo(
			window.innerWidth/2+ dir.x*nearCircle*1.2,
			window.innerHeight/2+ dir.y*nearCircle*1.2);
		ctx.lineTo(
			window.innerWidth/2+ dir.x*farCircle*1.2,
			window.innerHeight/2+ dir.y*farCircle*1.2);
		ctx.stroke();

		ctx.font = "18px monospace";
		ctx.fillText(memories[i].title,
			window.innerWidth/2+ dir.x*farCircle*1.3, 
			window.innerHeight/2+ dir.y*farCircle*1.3);

		ctx.globalAlpha = 1
	}

	if(selected!=lastSelected){
		updateMemoryBlock()
	}

	lastSelected = selected
}

function update(){
	window.requestAnimationFrame(update)

	//var targetAngle = Math.atan2(window.innerHeight/2-mousePos.y, window.innerWidth/2-mousePos.x)
	//var circleAngle = Math.atan2(window.innerHeight/2-mousePos.y, window.innerWidth/2-mousePos.x)

	if(controls["BracketRight"]) angleTarget+=1
	if(controls["BracketLeft"]) angleTarget-=1

	if(isDown){
		if(isRight) angleTarget+=1
		else		angleTarget-=1
	}

	angle += (angleTarget-angle)/5

	circle.style.transform = "rotate("+(angle+((Math.PI*2/12)*4+(Math.PI*2/12/2))*(180/Math.PI))+"deg)"

	draw()
}
update()


function onDown(e){
init()
	var rect = circle.getClientRects()[0]
	if (e.pageX > rect.x+rect.width/2) isRight = true
	else isRight = false
	isDown = true;
}
function onUp(e){
	isDown = false;
}

circle.addEventListener('mousedown', function(e){
	onDown(e)
})
circle.addEventListener('mouseup', function(e){
	onUp(e)
})

circle.addEventListener('touchstart', function(e){
	onDown(e.changedTouches[0])
})
circle.addEventListener('touchend', function(e){
	onUp(e.changedTouches[0])
})



document.addEventListener('mousemove', function(e){
	mousePos.x = e.pageX
	mousePos.y = e.pageY
});



document.addEventListener('keydown', function(e){
	console.log(e.code);
	if(e.code=="BracketRight"||e.code=="BracketLeft") controls[e.code] = true
});

document.addEventListener('keyup', function(e){
	if(e.code=="BracketRight"||e.code=="BracketLeft") controls[e.code] = false
});





//edit / load

function readFile(url, callback){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			var data = JSON.parse(this.response);
			callback(data)
		} else {
			
		}
	};

	request.onerror = function() {

	};

	request.send();
}


readFile("https://dl.dropbox.com/s/so8ud7sp9lae0vj/memories.json", function(data){
	memories = data
})

var dbx = new Dropbox.Dropbox({
	accessToken:  "8CVESRMgviAAAAAAAAAATyJPBq4RUD0yclwcKNtQukQvZ4MK7hMOxKtES8rjBJL_", 
	clientSecret: "kl4qiv86lecfzgk", 
	clientId:     "mp9t7d5r7kl6qfm", 
	fetch:fetch
});

function addMemory(){
	var tmp_title = document.getElementById("edit-title").value
	var tmp_description = document.getElementById("edit-description").value

	memories.push({
		pos: new Number(angle),
		title: tmp_title,
		description: tmp_description
	})

	dbx.filesUpload({
	    "path": "/memories.json",
	    "contents": JSON.stringify(memories, null, 2),
		"mode": {".tag": "overwrite"},
		"autorename": false,
		"mute": true,
		"strict_conflict": false
	}).then(function(req){
		console.log("saved");
	})
}
