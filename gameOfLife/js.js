function update(draw) {
  var start = performance.now();

  requestAnimationFrame(function update(time) {
    var timePassed = time - start;
    draw(timePassed);
    requestAnimationFrame(update);
  });
}

const width = window.innerWidth;
const height = window.innerHeight;

var birthLimit = 1;
var deathLimit = 2;

var dragStartPos;
var dragCamPos;
var targetCamPos = {x:0,y:0};
var camPos = {x:0,y:0};

var selectionPos = 0;
var color = 35;

var selectionMap=0;

var leftDown = false;
var middleDown = false;
var rightDown = false;
var isErasing = false;
var zoomTarget = 32;
var zoom = 16;
var minZoom = 8;
var map = Map(Math.round(width/minZoom),Math.round(height/minZoom));

var stage = new PIXI.Stage(0xFFFFFF);
var graphics = new PIXI.Graphics();
graphics.beginFill(0xFFFFFF);

stage.addChild(graphics);


function Map(sizeX,sizeY,defVal = 0) {
	let array = new Array(sizeX);
	for (var x = 0; x < array.length; x++) {
		array[x] = new Array(sizeY);
		for (var y = 0; y < sizeY; y++) {
			array[x][y] = defVal;
		}
	}
	return array;
}

var renderer = PIXI.autoDetectRenderer(width, height, { transparent: true });
renderer.view.oncontextmenu = function() {return false;}
renderer.view.id="pixiCanvas";
document.body.appendChild(renderer.view);
renderer.render(stage);

function drawGrid() {
	graphics.lineStyle(2, 0x151515)
	for (var x = 0; x < width/minZoom+1; x++) {
		graphics
       	.moveTo(x*zoom+camPos.x, camPos.y)
       	.lineTo(x*zoom+camPos.x, height/minZoom*zoom+camPos.y);
	}
	for (var y = 0; y < height/minZoom+1; y++) {
		graphics
       	.moveTo(camPos.x, y*zoom+camPos.y)
       	.lineTo(width/minZoom*zoom+camPos.x, y*zoom+camPos.y);
	}
}
function drawSelection() {
	if ((selectionPos.x1!=selectionPos.x2 && selectionPos.y1!=selectionPos.y2) || !rightDown) {
		graphics.lineStyle(3, new Color( 'hsl('+color+', 60%, 60%)')._color);
		graphics.beginFill(0xFFFFFF,0);
		graphics.drawRect(camPos.x+selectionPos.x1*zoom, camPos.y+selectionPos.y1*zoom, (selectionPos.x2-selectionPos.x1)*zoom, (selectionPos.y2-selectionPos.y1)*zoom);
		// graphics
  //      	.moveTo(camPos.x*zoom+selectionPos.x1,camPos.y*zoom+selectionPos.xy)
  //      	.lineTo(x*zoom+camPos.x, height/minZoom*zoom+camPos.y);
	}
}
function drawPixels() {
	graphics.lineStyle(0, 0xFFFFFF);
	graphics.beginFill(0xFFFFFF);
	// for (var _x = Math.floor(-camPos.x/zoom); _x < Math.floor(width/zoom-camPos.x)+1; _x++) {
	// 	for (var _y = Math.floor(-camPos.y/zoom); _y < Math.floor(height/zoom-camPos.y)+1; _y++) {
	for (var _x = 0; _x < map.length; _x++) {
		for (var _y = 0; _y < map[0].length; _y++) {
			let x = _x.clamp(0,Math.floor(width/minZoom));
			let y = _y.clamp(0,Math.floor(height/minZoom));
			if(map[x][y]==1){graphics.drawRect(x*zoom+camPos.x, y*zoom+camPos.y, zoom, zoom);}
		}
	}
	graphics.beginFill(0x555555);
	for (var x = 0; x < selectionPos.x2-selectionPos.x1; x++) {
		for (var y = 0; y < selectionPos.y2-selectionPos.y1; y++) {
			map[x+selectionPos.x1][y+selectionPos.y1]=selectionMap[x][y];
		}
	}
}

function addPixel(x,y) {
	if (x>=0 && x<Math.floor(width/minZoom) && y>=0 && y<Math.floor(height/minZoom)) {
		if (!isErasing) {map[x][y] = 1;}else{map[x][y] = 0;}
	}
}
update(function(timePassed) {
	zoom+=(zoomTarget-zoom)/5;
	color+=1;
	if (color>360) color = 0;
	//targetCamPos.x = targetCamPos.x.clamp(0,width-(width/zoom));
	//targetCamPos.y = targetCamPos.y.clamp(0,height-(height/zoom));
	camPos.x += (-targetCamPos.x-camPos.x)/5;
	camPos.y += (-targetCamPos.y-camPos.y)/5;
	graphics.clear();

	drawGrid();
	drawPixels();
	drawSelection();

	renderer.render(stage);
});

$('createButton').on('mouseover',function(e){
	
});

$('body').on('mousewheel', function(e) {
	if (e.originalEvent.deltaY<0) {
		zoomTarget+=1;
		targetCamPos.x+=(width/minZoom/zoom)*2;
		targetCamPos.y+=(height/minZoom/zoom)*2;
	}else
	if (e.originalEvent.deltaY>0 && zoomTarget>minZoom) {
		zoomTarget-=1;
		targetCamPos.x-=(width/minZoom/zoom)*2;
		targetCamPos.y-=(height/minZoom/zoom)*2;
	}
});
$('body').on('mousedown', function(e) {
	let pixelPos = {x:Math.round((e.pageX-camPos.x)/zoom-0.5),y:Math.round((e.pageY-camPos.y)/zoom-0.5)};
	if (e.button==0) {
		leftDown = true;
		isErasing = (map[pixelPos.x][pixelPos.y]==1);
		addPixel(pixelPos.x,pixelPos.y);
	}
	if (e.button==1) {
		middleDown = true;
		dragStartPos = {x:e.pageX,y:e.pageY};
		dragCamPos = targetCamPos;
	}
	if (e.button==2) {
		for (var x = 0; x < selectionPos.x2-selectionPos.x1; x++) {
			for (var y = 0; y < selectionPos.y2-selectionPos.y1; y++) {
				map[x+selectionPos.x1][y+selectionPos.y1]=selectionMap[x][y];
			}
		}
		selectionPos = {x1:pixelPos.x,y1:pixelPos.y,x2:pixelPos.x,y2:pixelPos.y};
		rightDown = true;
	}
});
$('body').on('mouseup', function(e) {
	if (e.button==0) {leftDown = false;isMovingPixels=false;}
	if (e.button==1) {middleDown = false;}
	if (e.button==2) {
		rightDown = false;
		if (selectionPos.x1!=selectionPos.x2 && selectionPos.y1!=selectionPos.y2) {
			let tmpSelection = selectionPos;
			selectionPos.x1=(tmpSelection.x2<tmpSelection.x1) ? tmpSelection.x2 : tmpSelection.x1;
			selectionPos.x2=(tmpSelection.x2<tmpSelection.x1) ? tmpSelection.x1 : tmpSelection.x2;
			selectionPos.y1=(tmpSelection.y2<tmpSelection.y1) ? tmpSelection.y2 : tmpSelection.y1;
			selectionPos.y2=(tmpSelection.y2<tmpSelection.y1) ? tmpSelection.y1 : tmpSelection.y2;

			selectionMap = Map(selectionPos.x2-selectionPos.x1,selectionPos.y2-selectionPos.y1);

			for (var x = 0; x < selectionPos.x2-selectionPos.x1; x++) {
				for (var y = 0; y < selectionPos.y2-selectionPos.y1; y++) {
					selectionMap[x][y] = map[x+selectionPos.x1][y+selectionPos.y1];
					map[x+selectionPos.x1][y+selectionPos.y1]=0;
				}
			}
		}
	}
});
$('body').on('mousemove', function(e) {
	let pixelPos = {x:Math.round((e.pageX-camPos.x)/zoom-0.5),y:Math.round((e.pageY-camPos.y)/zoom-0.5)};
	if (leftDown) addPixel(pixelPos.x,pixelPos.y);
	if (middleDown) {
		targetCamPos.x = dragCamPos.x-e.originalEvent.movementX;
		targetCamPos.y = dragCamPos.y-e.originalEvent.movementY;
	}
	if (rightDown) {
		selectionPos.x2 = pixelPos.x;
		selectionPos.y2 = pixelPos.y;
	}
});



function doSimulationStep(oldMap){
	var newMap = Map(Math.round(width/minZoom),Math.round(height/minZoom));
	for (var x = 0; x < oldMap.length-1; x++) {
		for (var y = 0; y < oldMap[0].length-1; y++) {
			var nbs = getNeighboursCount(oldMap,x,y);

			if (oldMap[x][y]==1){
				if (nbs<=1 || nbs>=4) {
					newMap[x][y] = 0;
				}else{
					newMap[x][y] = 1;
				}
			}else{
				if (nbs==3){
					newMap[x][y] = 1;
				}
			}
		}
	}
	map = newMap;
	drawPixels();
}

function getNeighboursCount(array,x,y) {
	var count = 0;
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
			neighbour_x = i+x;
			neighbour_y = j+y;

			if (i==0 && j==0) {

			}else if (neighbour_x<0 || neighbour_y<0 || neighbour_x>array.length || neighbour_y>array[0].length) {
				//count++;
			}else if (array[neighbour_x][neighbour_y]==1) {
				count++;
			}
		}
	}
	return count;
}

document.addEventListener('keydown', function(e) {
    if(e.keyCode==88){
		doSimulationStep(map);
	}
	if (e.keyCode==67) {
		if (selectionPos.x1!=selectionPos.x2 && selectionPos.y1!=selectionPos.y2) {
			for (var x = selectionPos.x1; x < selectionPos.x2; x++) {
				for (var y = selectionPos.y1; y < selectionPos.y2; y++) {
					map[x][y]=0;
				}
			}
		}else{
			map = Map(Math.round(width/minZoom),Math.round(height/minZoom));
		}
	}
	if (e.keyCode==37 || e.keyCode==38 || e.keyCode==39 || e.keyCode==40) {
		let dragPos = {x:0,y:0};
		switch(e.keyCode){
			case 37: dragPos.x = -1;break;
			case 38: dragPos.y = -1;break;
			case 39: dragPos.x =  1;break;
			case 40: dragPos.y =  1;break;
		}

		selectionPos.x1+=dragPos.x;selectionPos.x2+=dragPos.x;
		selectionPos.y1+=dragPos.y;selectionPos.y2+=dragPos.y;
		for (var x = selectionPos.x1; x < selectionPos.x2; x++) {
			for (var y = selectionPos.y1; y < selectionPos.y2; y++) {
				if (map[x-dragPos.x][y-dragPos.y]==1) {
					map[x-dragPos.x][y-dragPos.y]=0;
					map[x][y]=1;
				}
			}
		}
	}
});


Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};