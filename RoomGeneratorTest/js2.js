var scale = 10;
var mapSize = 17;
var map;

var roomDefine = {
	'left': {type:0, addAngle:0},

	'left,right': {type:1, addAngle:0},

	'left,up': {type:2, addAngle:0},
	'left,down': {type:2, addAngle:-90},

	'left,right,up': {type:3, addAngle:0},
	'left,right,down': {type:3, addAngle:180},
	'left,down,up': {type:3, addAngle:-90},
	'left,up,down': {type:3, addAngle:-90},

	'left,right,up,down': {type:4, addAngle:0}
}


PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
var canvasEl = document.getElementById('canvas');
var app = new PIXI.Application({ 
	width:mapSize*scale,
	height:mapSize*scale,
	view:canvasEl,
	transparent: true 
});
var ctx = new PIXI.Graphics();
app.stage.addChild(ctx);
var baseTexture = new PIXI.BaseTexture.from("tiles.png");
var sprites = [];


var ClearSteps = 3;
var ClearTileChance = 0.6;

var SimulationSteps = 8;
var DefChance = 0.4;
var ConnectionChance = 0.1;
var NonDiagConnectionChance = 0.7;
var BinConnectionChance = 0.3;

function Generate(){
	map = Map();
	var center = Math.floor(mapSize/2);
	map[center][center] = 1;
	for (let i = 0; i < SimulationSteps; i++) {
		doSimulationStep();
		//Clear();
	}
	// for (let i = 0; i < ClearSteps; i++) {
	// 	Clear();
	// }
	checkRooms();
	drawMap(true);
}
Generate();


function doSimulationStep(){
	let newMap = Map(1);
	forEachTile(map, function(x,y) {
		if(map[x][y]==null){
			newMap[x][y] = null;
			let nbs = getNeighboursCount(x, y);
			let dnbs = getNeighboursCount(x, y, true);
			if(
				  (Math.random()<DefChance && nbs>0 && dnbs<3 && nbs+dnbs<3)
			 	||(Math.random()<ConnectionChance && nbs==1 && dnbs<3)
			 	||(Math.random()<NonDiagConnectionChance && nbs>0 && dnbs==0)
			 	||(Math.random()<BinConnectionChance && nbs==2 && dnbs==4)
			){
				newMap[x][y] = 1;
			}
		}
	});
	map = newMap;
	//drawMap();
}

function Clear(){
	let newMap = Map(1);
	forEachTile(map, function(x,y) {
		if(map[x][y]!=null){
			newMap[x][y] = map[x][y]; 
			let nbs = getNeighboursCount(x, y)+getNeighboursCount(x, y, true);
			if(Math.random()<ClearTileChance && getNeighboursCount(x, y, false)==1)
				newMap[x][y] = null;
		}else{
			newMap[x][y] = null;
		}
	});
	map = newMap;
	drawMap(true);
}

function checkRooms(){
	forEachTile(map, function(x,y) {
		if(map[x][y]!=null){
			map[x][y] = new Room(x, y);
			map[x][y].check();
		}
	});
}

function Room(x, y){
	this.x = x;
	this.y = y;
	this.doors = [];
	this.doorSides = "";
	this.angle = 0;
	this.type = 0;
	this.variant = Math.floor(Math.random()*2);

	this.check = function(){
		this.doors = getNeighboursCount(this.x, this.y, false, 2);
		this.doorSides = RotateSidesToNormalize(getNeighboursCount(this.x, this.y, false, 1));
		this.angle = (this.doorSides.angle==360)?0:this.doorSides.angle;
		this.doorSides = this.doorSides.names;
		this.type=roomDefine[this.doorSides].type;
		this.angle+=roomDefine[this.doorSides].addAngle;
	}
}

function drawMap(tiled = false){
	ctx.clear();
	for (let s = 0; s < sprites.length; s++) {
		sprites[s].parent.removeChild(sprites[s]);
	}
	sprites = [];
	forEachTile(map, function(x,y){
		if(map[x][y]!=null){
			if(map[x][y].constructor.name=="Room"){
				if(tiled){
					let texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(map[x][y].type*scale, map[x][y].variant*scale, scale, scale));
					sprites.push(PIXI.Sprite.from(texture));
					sprites[sprites.length-1].x = x*scale+scale/2;
					sprites[sprites.length-1].y = y*scale+scale/2;
					sprites[sprites.length-1].rotation = map[x][y].angle*(Math.PI/180);
					sprites[sprites.length-1].pivot.x = scale/2;
					sprites[sprites.length-1].pivot.y = scale/2;
					app.stage.addChild(sprites[sprites.length-1]);
				}else{
					DrawRect(x*scale,y*scale,1*scale,1*scale, 0xFFFFFF);
					map[x][y].doors.forEach(function(door){
						let dx = Math.round(scale/2+door[0]*scale/2.5);
						let dy = Math.round(scale/2+door[1]*scale/2.5);
						let ds = 2;
						DrawRect(x*scale+dx-ds/2,y*scale+dy-ds/2,ds,ds, 0x2c2c2c);
					});
				}
			}
			else{
				DrawRect(x*scale,y*scale,1*scale,1*scale, 0xFFFFFF);
			} 
		}
	});
}

function getNeighboursCount(x, y, diagonal=false, getSides=0){
	let count = 0;
	let posArray = (!diagonal) ? [[-1,0] , [+1,0] , [0,-1] , [0,+1]] : [[-1,-1] , [+1,-1] , [-1,+1] , [+1,+1]];
	let sideNames = (!diagonal) ? ["left" , "right" , "up" , "down"] : ["left-up" , "right-up" , "left-down" , "right-down"];
	let sides = (getSides==2)? [] : ""; //list of sides
	let existCount=0;//for names
	for (var p = 0; p < posArray.length; p++) {
		if(map[x+posArray[p][0]]!=null && map[x+posArray[p][0]][y+posArray[p][1]]!=null ){
			if(getSides==2) sides.push(posArray[p])
			if(getSides==1) sides+=(((existCount>0)?",":"")+sideNames[p]);
			else count++;
			existCount++;
		}
	}
	if(getSides>0) return sides;
	else 	  return count;
}

//get map array
function Map(defeult, w=mapSize, h=mapSize) {
	let array = new Array(w);
	for (var x = 0; x < w; x++) {
		array[x] = [];
		for (var y = 0; y < h; y++) {
			array[x][y] = defeult;
		}
	}
	return array;
}

function forEachTile(array, callback){
	for (var x = 0; x < array.length; x++) {
		for (var y = 0; y < array[x].length; y++) {
			callback(x,y);
		}
	}
}


//cursor debug
canvasEl.addEventListener('mousedown', function(e) {
	let rect = canvasEl.getClientRects()[0];
	let mouseX = Math.round(mapSize/canvas.clientWidth*(e.pageX-rect.x-scale*1.5));
	let mouseY = Math.round(mapSize/canvas.clientHeight*(e.pageY-rect.y-scale*1.5));
	console.log(map[mouseX][mouseY]);
});

function onResize(){
	$(canvasEl).css('background-size', canvasEl.clientWidth/mapSize*4);
}
onResize();
$(window).resize(onResize);


function DrawRect(x,y,w,h,color){
	ctx.beginFill(color);
	ctx.drawRect(x, y, w, h);
	ctx.endFill();
}

function RotateSidesToNormalize(sn){
	let sides = sn;
	let count = 0;
	while(sides.indexOf("left")!=0){
	    sides = sides.replace("right","do#wn").replace("up","ri#ght").replace("down","le#ft").replace("left","u#p");
	    sides = sides.replace(/#/g,"");
	    count++;
	}
	return {names:sides, angle:360-count*90};
}


// impasse
// corridor
// corner
// corridor-corner
// crossway