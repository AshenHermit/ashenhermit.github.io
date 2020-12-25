function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

const fetch = window.fetch.bind(window);

var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function mod(x, y) {
  return  x - y * Math.floor(x/y)
};

window.onresize = function(e){
	// canvas.width = window.innerWidth
	// canvas.height = window.innerHeight
	canvas.width = document.documentElement.clientWidth
	canvas.height = document.documentElement.clientHeight
}

var editVisible = false;

var circle = document.getElementById('circle')

var memoryEl = document.getElementById('memory')
var title = document.getElementById('title')
var description = document.getElementById('description')
var year = document.getElementById('year')
var trackList = document.getElementById('track-list')

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
window.onresize();

var nearCircle = 240;
var farCircle = 270;

if(detectMob()){
	title.style.userSelect = "none"
	description.style.userSelect = "none"
}

var memories = [
	{
		"pos": 0,
		"title": "Waiting for data...",
		"description": "controls: ctrl + [ or ]"
	}

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

function setLastAsTarget(){
	var lastAng = memories[0].pos
	for (var i = 1; i < memories.length; i++) {
		if(memories[i].pos > lastAng){
			lastAng = memories[i].pos
		}else{
			
		}
	}

	angleTarget = lastAng
}

setLastAsTarget()

function updateMemoryBlock(){
	title.innerHTML = memories[selected].title
	description.innerHTML = memories[selected].description
	.replace(new RegExp("\n", "g"), "<br>")

	try{trackList.innerHTML = decodeURIComponent(escape(window.atob(memories[selected].tracks)))}catch(err){}

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
			x: Math.cos((Math.PI*2/12)*i+(Math.PI*2/12/2)+(Math.PI*2/12)*1),
			y: Math.sin((Math.PI*2/12)*i+(Math.PI*2/12/2)+(Math.PI*2/12)*1)
		}

		ctx.lineWidth = 4

		if(i==1) ctx.lineWidth = 9

		ctx.beginPath();
		ctx.moveTo(
			canvas.clientWidth/2+ dir.x*nearCircle,
			canvas.clientHeight/2+ dir.y*nearCircle);
		ctx.lineTo(
			canvas.clientWidth/2+ dir.x*farCircle,
			canvas.clientHeight/2+ dir.y*farCircle);
		ctx.stroke();
	}

	var dist = 360
	var ang = angle 

	for (var i = 0; i < memories.length; i++) {
		ctx.globalAlpha = (1-Math.abs(ang-memories[i].pos)/16).clamp(0, 1)

		if (Math.abs(ang-memories[i].pos)<dist) {
			dist = Math.abs(ang-memories[i].pos);
			selected = i
		}

		var dir = {
			x: Math.cos((Math.PI/180)*memories[i].pos+(Math.PI*2/12/2)+(Math.PI*2/12)*2),
			y: Math.sin((Math.PI/180)*memories[i].pos+(Math.PI*2/12/2)+(Math.PI*2/12)*2)
		}

		ctx.beginPath();
		ctx.moveTo(
			canvas.clientWidth/2+ dir.x*nearCircle*1.2,
			canvas.clientHeight/2+ dir.y*nearCircle*1.2);
		ctx.lineTo(
			canvas.clientWidth/2+ dir.x*farCircle*1.2,
			canvas.clientHeight/2+ dir.y*farCircle*1.2);
		ctx.stroke();

		ctx.font = "18px monospace";
		if(dir.x > 0){
			ctx.textAlign = "left";
		}else{
			ctx.textAlign = "right";
		}
		ctx.fillText(memories[i].title,
			canvas.clientWidth/2+ dir.x*farCircle*1.3, 
			canvas.clientHeight/2+ dir.y*farCircle*1.3);

		ctx.globalAlpha = 1
	}

	if(selected!=lastSelected){
		updateMemoryBlock()
	}
	lastSelected = selected

	year.innerHTML = ""
	var m = months[mod(Math.floor(ang/360*12), 12)]
	for(var i=0; i<(8-m.length); i++) year.innerHTML += "&nbsp;"
	year.innerHTML +=  m + " " + (2020+Math.floor(ang/360))

}

function update(){
	window.requestAnimationFrame(update)

	//var targetAngle = Math.atan2(window.innerHeight/2-mousePos.y, window.innerWidth/2-mousePos.x)
	//var circleAngle = Math.atan2(window.innerHeight/2-mousePos.y, window.innerWidth/2-mousePos.x)

	if(controls["BracketRight"] || controls["ArrowRight"] || controls["KeyD"]) angleTarget+=1
	if(controls["BracketLeft"] || controls["ArrowLeft"] || controls["KeyA"]) angleTarget-=1

	if(isDown){
		if(isRight) angleTarget+=1
		else		angleTarget-=1
	}

	angle += (angleTarget-angle)/5

	circle.style.transform = "rotate("+(angle+((Math.PI*2/12)*4+(Math.PI*2/12*1.5))*(180/Math.PI))+"deg)"

	draw()
}
update()


function onDown(e){
	//var rect = circle.getClientRects()[0]
	if (e.pageX > canvas.clientWidth/2) isRight = true
	else isRight = false
	isDown = true;

	//year.innerHTML = e.pageX + " " + canvas.clientWidth/2
}
function onUp(e){
	isDown = false;
}

document.addEventListener('mousedown', function(e){
	if(e.target.id == "canvas") onDown(e)
})
document.addEventListener('mouseup', function(e){
	onUp(e)
})

document.addEventListener('touchstart', function(e){
	window.onresize();
	if(e.changedTouches[0].target.id == "canvas") onDown(e.changedTouches[0])
})
document.addEventListener('touchend', function(e){
	onUp(e.changedTouches[0])
})



document.addEventListener('mousemove', function(e){
	mousePos.x = e.pageX
	mousePos.y = e.pageY
});



document.addEventListener('keydown', function(e){
	if(e.ctrlKey){
		if(e.code=="BracketRight"||e.code=="BracketLeft") controls[e.code] = true
	}
	if(!editVisible){
		if(e.code!="BracketRight"&&e.code!="BracketLeft"){
			controls[e.code] = true
		}
	}
});

document.addEventListener('keyup', function(e){
	controls[e.code] = false
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


function setLastUpdateText(text){
	document.getElementById("last_update").innerHTML = text
}

readFile("https://dl.dropbox.com/s/so8ud7sp9lae0vj/memories.json", function(data){
	memories = data.memories
	if(data.last_update) setLastUpdateText(data.last_update)
	setLastAsTarget()
})

var dbx = new Dropbox.Dropbox();

function setEditVisibility(state){
	var el = document.getElementById("edit_block")
	el.style.visibility = state ? "visible" : "hidden"
}

setEditVisibility(editVisible)
function editClick(){
	editVisible = !editVisible
	setEditVisibility(editVisible)
}

function executeWithAccessToDB(callback){
	var accessKeys = document.getElementById("edit-access-token").value
	accessKeys = accessKeys.split("\n")
	var at = accessKeys[0]

	var valid = true

	try{
		dbx = new Dropbox.Dropbox({
			accessToken:  at,
			fetch: fetch
		});
	}catch(err){
		valid = false
	}

	if(valid){
		callback();
	}
}

function addMemory(){
	executeWithAccessToDB(function(){
		var tmp_title = document.getElementById("edit-title").value
		var tmp_description = document.getElementById("edit-description").value
		var tmp_tracks_embed = document.getElementById("edit-tracks-embed").value

		memories.push({
			pos: new Number(angle),
			title: tmp_title,
			description: tmp_description,
			tracks: window.btoa(unescape(encodeURIComponent(tmp_tracks_embed)))
		})

		saveMemories()
	})
}
function copyMemoryData(){
	document.getElementById("edit-title").value = title.innerHTML
	document.getElementById("edit-description").value = description.innerHTML.replace(new RegExp("<br>", "g"), "\n")
	document.getElementById("edit-tracks-embed").value = trackList.innerHTML
	angleTarget = memories[selected].pos
}
function clearFields(){
	document.getElementById("edit-title").value = ""
	document.getElementById("edit-description").value = ""
	document.getElementById("edit-tracks-embed").value = ""
}
function rewriteMemory(){
	executeWithAccessToDB(function(){
		var tmp_title = document.getElementById("edit-title").value
		var tmp_description = document.getElementById("edit-description").value
		var tmp_tracks_embed = document.getElementById("edit-tracks-embed").value

		memories[selected] = {
			pos: new Number(angle),
			title: tmp_title,
			description: tmp_description,
			tracks: window.btoa(unescape(encodeURIComponent(tmp_tracks_embed)))
		}
		updateMemoryBlock()

		saveMemories()
	})
}
function removeMemory(){
	executeWithAccessToDB(function(){
		memories.splice(selected, 1)
		selected = 0
		setLastAsTarget()
		updateMemoryBlock()

		saveMemories()
	})
}

function minDigitsCount(num, minCount){
	let str = ""+num
	let add = minCount - str.length
	for(let i=0; i<add; i+=1) str = "0"+str
	return str
}

function getCurrentDate(){
	let date = new Date()
	var txt = minDigitsCount(date.getDate(), 2) + "." + minDigitsCount(date.getMonth()+1, 2) + "." + date.getFullYear()
	return txt
}

function saveMemories(){
	let lastUpdate = getCurrentDate()
	setLastUpdateText(lastUpdate)

	dbx.filesUpload({
	    "path": "/memories.json",
	    "contents": JSON.stringify({"last_update": lastUpdate, "memories":memories}, null, 2),
		"mode": {".tag": "overwrite"},
		"autorename": false,
		"mute": true,
		"strict_conflict": false
	}).then(function(req){
		console.log("saved");
	})
}