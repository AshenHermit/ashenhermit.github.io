var can = document.getElementById('view');
var ctx = can.getContext("2d");
var genCan = document.getElementById('gen');
var genCtx = genCan.getContext("2d");
var img = new Image();
var clearImage;

var q = 5;
var noise = 0.02;
var mousePos = {x:0,y:0};
var mouseDown = false;
var isPainting = true;

var depthMap;

function onFileSelected(el){
	var files = el.files; // FileList object
	var file = files[0];

	if(file.type.match('image.*')) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(read){
			if( read.target.readyState == FileReader.DONE) {
				img.src = read.target.result;
				can.width = genCan.width = img.naturalWidth;
				can.height = genCan.height = img.naturalHeight;
				ctx.drawImage(img,0,0);
				setTimeOut(function(){clearImage = ctx.getImageData(0,0,img.naturalWidth,img.naturalHeight).data;},100);

				newDepthMap(img.naturalWidth, img.naturalHeight);
			}
		}
	} else {
		alert("not an image");
	}
}

function newDepthMap(w,h){
	depthMap = new Array(w);
	for (var x = 0; x < w; x++) {
		depthMap[x] = [];
		for (var y = 0; y < h; y++) {
			depthMap[x][y] = 0;
		}
	}
}

newDepthMap(32, 32);

function Generate(){
	if(img.src=="") {img.naturalWidth=32;img.naturalHeight=32}
	q = parseInt(document.getElementById('quality-input').value);
	noise = parseFloat(document.getElementById('noise-input').value);

	genCtx.fillStyle = "rgb(128,128,255)";
	genCtx.fillRect(0,0,img.naturalWidth,img.naturalHeight);

	for (var x = 0; x < depthMap.length; x++) {
		for (var y = 0; y < depthMap[x].length; y++) {
			if(depthMap[x][y]==0){
				n = getNeighbourCount(x, y, 1);
				n.vec.x+=(Math.random()*2-1)*noise;
				n.vec.y+=(Math.random()*2-1)*noise;

				n.vec.x = Math.clamp( 128+(n.vec.x*255), 0,255);
				n.vec.y = Math.clamp( 128-(n.vec.y*255), 0,255);
				genCtx.fillStyle = "rgb("+n.vec.x+","+n.vec.y+","+255+")";
				genCtx.fillRect(x,y,1,1);
			}else{
				let xn = (Math.random()*2-1)*noise;
				let yn = (Math.random()*2-1)*noise;

				xn = Math.clamp( 128+(xn*255), 0,255);
				yn = Math.clamp( 128-(yn*255), 0,255);
				genCtx.fillStyle = "rgb("+xn+","+yn+","+255+")";
				genCtx.fillRect(x,y,1,1);
			}
		}
	}
}

function getNeighbourCount(px,py,size){
	let count = 0;
	let vec = {x:0,y:0};
	for (var x = px-1; x <= px+1; x++) {
		for (var y = py-1; y <= py+1; y++) {
			//console.log("x:"+x+"; y:"+y+";");
			if((x!=px || y!=py) &&
			x>=0 && y>=0 &&
			x<img.naturalWidth && y<img.naturalHeight &&
			depthMap[x][y]==1){
				count++;
				vec.x+=x-px;
				vec.y+=y-py;
			}
		}
	}
	let sum = (Math.pow(3, 2)-1);
	vec.x = Math.round((vec.x/sum)*q)/q;
	vec.y = Math.round((vec.y/sum)*q)/q;

	return {count:count, vec:vec};
}

function updateMousePos(e){
	let rect = can.getBoundingClientRect();
	let x = e.layerX;
	let y = e.layerY;

	mousePos.x = Math.round((can.width/can.clientWidth)*(x-(can.clientWidth/can.width)/2));
	mousePos.y = Math.round((can.height/can.clientHeight)*(y-(can.clientHeight/can.height)/2));
}

can.addEventListener('mousedown', function(e){
	if(e.button==0){
		updateMousePos(e);

		if(depthMap[mousePos.x][mousePos.y]==1)
			isPainting = false;
		else 
			isPainting = true;

		mouseDown = true;
		draw();
	}else if(e.button==2){
		// can.requestFullscreen();
	}
});

document.addEventListener('mouseup', function(e){
	updateMousePos(e);
	mouseDown = false;
});
can.addEventListener('mousemove', function(e){
	updateMousePos(e);
	draw();
});
function draw(){
	if(mouseDown){
		if(isPainting){
			depthMap[mousePos.x][mousePos.y] = 1;
			ctx.fillStyle = "rgb(128,128,255)";
			ctx.fillRect(mousePos.x,mousePos.y,1,1);
		}
		else{
			depthMap[mousePos.x][mousePos.y] = 0;
			if(img.src!="") ctx.fillStyle = getColor(img,mousePos.x,mousePos.y);
			else ctx.fillStyle = "#28262c";
			ctx.fillRect(mousePos.x,mousePos.y,1,1);
		}
	}
}



///////
//Math.atan2(1,1) * (180/Math.PI) * (255/360)

function objCopy(src) {
  return Object.assign({}, src);
}

function getColor(image,x,y){
	let tmpCan = document.createElement('canvas');
	tmpCan.width = image.width;
	tmpCan.height = image.height;
	tmpCan.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
	let data = tmpCan.getContext('2d').getImageData(x,y,1,1).data;

	return "rgba("+data[0]+","+data[1]+","+data[2]+","+data[3]+")";
}

Math.clamp=function(val,min,max){return Math.min(Math.max(min, val), max)}
