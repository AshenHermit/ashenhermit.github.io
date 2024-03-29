var can = document.getElementById('can');
can.oncontextmenu = function(){return false;}
var ctx = can.getContext('2d');
var output = document.getElementById('text');	


var widthInput = document.getElementById('width');
var heightInput = document.getElementById('height');
can.width = parseInt(widthInput.value);
can.height = parseInt(heightInput.value);

var map = Map(can.width,can.height,'rgba(0,0,0,0)');

var isPainting = false,
	isErasing = false,
	mousePos = {x:0,y:0},
	canvasChanged = true,
	currentColor="#000";

var colors = ['rgba(0,0,0,0.2)','rgba(0,0,0,0.8)','#000']
function changeColor(id){
	currentColor = colors[id];
}

function updateMap(){
	ctx.clearRect(0,0,can.width,can.height);

	if(isPainting) map[mousePos.x][mousePos.y] = currentColor;
	if(isErasing) map[mousePos.x][mousePos.y] = 'rgba(0,0,0,0)';

	for (var x = 0; x < map.length; x++) {
		for (var y = 0; y < map[x].length; y++) {
			ctx.fillStyle=map[x][y];
			ctx.fillRect(x,y,1,1);
		}
	}
	//ctx.fillStyle=currentColor;
	//ctx.fillRect(mousePos.x,mousePos.y,1,1);
}

function updateMousePos(x,y){
	mousePos.x = Math.round((can.width/can.clientWidth)*(x-(can.clientWidth/can.width)/2));
	mousePos.y = Math.round((can.height/can.clientHeight)*(y-(can.clientHeight/can.height)/2));
}
can.addEventListener('mousemove',function(e){
	updateMousePos(e.offsetX,e.offsetY)
	updateMap();
});
can.addEventListener('mousedown',function(e){
	updateMousePos(e.offsetX,e.offsetY)
	if(e.button==0) {
		if(map[mousePos.x][mousePos.y]=="rgba(0,0,0,0)") isPainting = true;
		else isErasing = true;
	}
	if(e.button==2) isErasing = true;
	if(isPainting) map[mousePos.x][mousePos.y] = currentColor;
	if(isErasing) map[mousePos.x][mousePos.y] = 'rgba(0,0,0,0)';
	updateMap();

});
document.addEventListener('mouseup',function(e){
	if(e.button==0) {isErasing = false; isPainting = false;}
	if(e.button==2) isErasing = false;
});

function Map(sizeX,sizeY,defVal = 0,oldMap) {
	let array = new Array(sizeX);
	for (var x = 0; x < array.length; x++) {
		array[x] = new Array(sizeY);
		for (var y = 0; y < sizeY; y++) {
			array[x][y] = defVal;
			try{if(oldMap[x][y]!=undefined) array[x][y] = oldMap[x][y];}catch(err){}
		}
	}
	return array;
}

setInterval(function(){
	if(canvasChanged){
		canvasChanged = false;
		updateMap();
	}
},1000/60);

//----------------------button functions
function convert(){
	output.value = "";
	for (var y = 0; y < map[0].length; y++) {
		for (var x = 0; x < map.length; x++) {
			if(map[x][y]=='#000') output.value+="██";
			else if(map[x][y]=='rgba(0,0,0,0)') output.value+="░░";
			else if(map[x][y]=='rgba(0,0,0,0.2)') output.value+="▒▒";
			else if(map[x][y]=='rgba(0,0,0,0.8)') output.value+="▓▓";
		}
		output.value+="\n";
	}
}
function resize(){
	can.width = parseInt(widthInput.value);
	can.height = parseInt(heightInput.value);
	map = Map(can.width,can.height,'rgba(0,0,0,0)',oldMap=map);
	canvasChanged = true;
}
function clear(){
	map = Map(can.width,can.height,'rgba(0,0,0,0)');
	canvasChanged = true;
}
//
document.getElementById('clear').onclick = clear;

output.addEventListener('focus',function(){this.select();});
window.addEventListener('resize',onWinResize);

function onWinResize(){
	output.style.width = can.clientWidth+"px";
	output.style.height = can.clientHeight+"px";
}
onWinResize();
