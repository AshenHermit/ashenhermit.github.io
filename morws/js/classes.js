var scene = new THREE.Scene();

var can = document.getElementById('can');
var ctx = can.getContext('2d');
can.width = window.innerWidth;
can.height = window.innerHeight;

var mainFont;

backCtx = document.getElementById('back').getContext('2d');
var image = new Image();   // using optional size for image
image.onload = drawImageActualSize; // draw when image has loaded
image.src = 'src/grain.png';
document.getElementById('back').width = window.innerWidth;
document.getElementById('back').height = window.innerHeight;
function drawImageActualSize() {
  backCtx.drawImage(this, 0, 0, window.innerWidth, window.innerHeight);
}

function init() {
	
}
window.onload = init;

function vector2(x,y) {
	this.x = x;
	this.y = y;
}

function drawGrain() {
	for (var g = 0; g < Math.round(Math.random()*100); g++) {
		rand = Math.random();
		ctx.fillStyle = "rgba(0,0,0,"+rand+")";

		ctx.fillRect(Math.round(Math.random()*window.innerWidth),Math.round(Math.random()*window.innerHeight),2,2);

		ctx.fillRect(window.innerWidth/2-2,window.innerHeight/2-2,4,4);
	}
}
drawGrain();

function setAnchoredPosition(mesh) {
	if (mesh.xAlign=="left") {
		mesh.geometry.applyMatrix( new THREE.Matrix4().setPosition(mesh.initposition.x,0,0));
	}else
	if (mesh.xAlign=="center") {
		mesh.geometry.applyMatrix( new THREE.Matrix4().setPosition(mesh.initposition.x-mesh.geometry.boundingBox.max.x/2,0,0));
	}else
	if (mesh.xAlign=="right") {
		mesh.geometry.applyMatrix( new THREE.Matrix4().setPosition(mesh.initposition.x-mesh.geometry.boundingBox.max.x,0,0));
	}
}

function setParent(mesh1,toMesh2) {
	mesh1.rotation.x = toMesh2.rotation.x;
	mesh1.rotation.y = toMesh2.rotation.y;
	mesh1.rotation.z = toMesh2.rotation.z;

	mesh1.position.y-= mesh1.height;

	mesh1.position.x = toMesh2.position.x;
	mesh1.position.y = toMesh2.position.y;
	mesh1.position.z = toMesh2.position.z;
}

function uiText(textString,x,y) {
	var text;
	var geometry = new THREE.TextGeometry( textString, {
		font: mainFont,
		size: 0.05,
		height: 0.001
	});
	geometry.computeBoundingBox();

	text = new THREE.Mesh( geometry, material );
	scene.add( text );

	text.position.x = x;
	text.initposition = {};
	text.initposition.x = x;
	text.position.y = y;

	text.width = text.geometry.boundingBox.max.x;
	text.height = text.geometry.boundingBox.max.y;

	text.xAlign = "center";
	setAnchoredPosition(text);

	return text;
}

function rectangle(x,y,w,h) {
	var geometry = new THREE.BoxGeometry( h, w, 0.05 );
	geometry.computeBoundingBox();
	var material = new THREE.MeshBasicMaterial( { color: 0x1a1a1a } );
	var rect = new THREE.Mesh( geometry, material );
	scene.add( rect );

	rect.width = rect.geometry.boundingBox.max.x;
	rect.height = rect.geometry.boundingBox.max.y;
	rect.depth = rect.geometry.boundingBox.max.z;

	rect.position.x = x;
	rect.position.y = y;

	return rect;
}

var objloader = new THREE.OBJLoader();

// load a resource
function objModel(src,func) {
	objloader.load(
		src,
		function ( object ) {
			func(object);
		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log( 'An error happened' );
		}
	);
}
