var scene = new THREE.Scene();
var mapSize = 40;
var map = 0;
var weaponMixer,Npcs = [],weapon,shootClipAction,idleClipAction,lastLoopCount=0;
var clock = new THREE.Clock();
var lights = [];

var Level = new THREE.Object3D();
scene.add(Level);

var cameraY = new THREE.Object3D();
scene.add(cameraY);

var cameraContainer = new THREE.Object3D();
cameraY.add(cameraContainer);

var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.2, 1000);
camera.near = 0.01;
cameraContainer.add(camera);

var Player = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
scene.add(Player);
// Player.add(new THREE.WireframeHelper(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)), 0xffffff));
Player.add(cameraY);

var renderer = new THREE.WebGLRenderer({
	alpha: false,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x1a1a1a, 0);
document.body.appendChild(renderer.domElement);

/////sao
var composer = new THREE.EffectComposer( renderer );
var renderPass = new THREE.RenderPass( scene, camera );
composer.addPass( renderPass );
var saoPass = new THREE.SAOPass( scene, camera, false, true );
saoPass.renderToScreen = true;
composer.addPass( saoPass );
/////


Player.getDistance = function(v) {
	var originPoint = this.position.clone();
	originPoint.add(v);
	var collision = false;

	for (var vertexIndex = 0; vertexIndex < this.geometry.vertices.length; vertexIndex++) {
		var localVertex = this.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4(this.matrix);
		var directionVector = globalVertex.sub(this.position);
		var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
		var collisionResults = ray.intersectObjects(Level.children);
		if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) return collisionResults[0].distance-1;
	}
	return 0;
}

var mapCanvas = document.createElement('canvas');
mapCanvas.width = mapCanvas.height = mapSize;
mapCanvas.style = "margin:4vh;position: absolute;top: 0px;right: 0px;height: 16vh;width: 16vh;image-rendering: crisp-edges;image-rendering: pixelated;";
var mapCtx = mapCanvas.getContext('2d');
document.body.appendChild(mapCanvas);

// can.style.height = 

///////////
//textures
var wall_texture = new THREE.TextureLoader().load("src/texture_1.png");
var wall2_texture = new THREE.TextureLoader().load("src/texture_wall.png");
var roof_texture = new THREE.TextureLoader().load("src/texture_roof.png");
var floor_texture = new THREE.TextureLoader().load("src/texture_floor.png");
var torch_texture = new THREE.TextureLoader().load("src/torch.png");

var weapon_texture = new THREE.TextureLoader().load("src/weapons/nail_gun.png");

var morw_texture = Loader.animationTexture("src/npc/morw",7);
///////////

/////////////////////////////////////////////////////////////////////////
var canvas = renderer.domElement;
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

function addLights(lights){
	lights.forEach(function(light){
		scene.add(light);
		console.log(light)
	});
}

canvas.onclick = function() {
	canvas.requestPointerLock();
	// document.body.requestFullscreen();
};
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
	if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
		console.log('The pointer lock status is now locked');
		document.addEventListener("mousemove", updateMousePosition, false);
	} else {
		console.log('The pointer lock status is now unlocked');
		document.removeEventListener("mousemove", updateMousePosition, false);
	}
	onWindowResize();
}

window.performance = window.performance || {};
performance.now = (function() {
    return performance.now    ||
        performance.mozNow    ||
        performance.msNow     ||
        performance.oNow      ||
        performance.webkitNow ||
        Date.now  /*none found - fallback to browser default */
})();
///////////////////////////////////////////////////////////////////////////////////////


// for (var i = 0; i < 0; i++) {
// 	var light2 = new THREE.PointLight(0xFFFFFF, 1, 10);
// 	var distribution = 3
// 	var mapSizeGlobal = mapSize*3
// 	function rpos(){
// 		return mapSizeGlobal/2 + Math.random() * mapSizeGlobal/2
// 	}
// 	light2.position.set( 
// 		rpos(), 
// 		0, 
// 		rpos() );
// 	console.log(light2.position)
// 	scene.add(light2)
// }

var amb = new THREE.AmbientLight(0x000000,0.05);
scene.add(amb);
var light = new THREE.PointLight(0xFFFFFF);
light.position.set(0, 0, 0);
light.intensity = 0;
light.distance = 10;
light.intensityTarget = 1.6;
Player.add(light);

var wallGeometry = new THREE.BoxGeometry(3, 3, 3);
var wallMaterial = new THREE.MeshLambertMaterial({
	map: wall_texture
});
var wall2Material = new THREE.MeshLambertMaterial({
	map: wall2_texture
});


floor_texture.wrapS = floor_texture.wrapT = THREE.RepeatWrapping;
floor_texture.repeat.x = mapSize*3;
floor_texture.repeat.y = mapSize*3;
var floorGeometry = new THREE.PlaneGeometry( mapSize*3, mapSize*3 ,mapSize*3,mapSize*3);
var floorMaterial = new THREE.MeshLambertMaterial({map: floor_texture,side: THREE.DoubleSide});
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI/2;
floor.position.x = mapSize*3/2;
floor.position.y = -3/2;
floor.position.z = mapSize*3/2;

roof_texture.wrapS = roof_texture.wrapT = THREE.RepeatWrapping;
roof_texture.repeat.x = mapSize*3;
roof_texture.repeat.y = mapSize*3;
var roofMaterial = new THREE.MeshLambertMaterial({map: roof_texture,side: THREE.DoubleSide});
var roof = new THREE.Mesh(floorGeometry, roofMaterial);
roof.rotation.x = Math.PI/2;
roof.position.x = mapSize*3/2;
roof.position.z = mapSize*3/2;
roof.position.y = 3/2;
scene.add(floor);
scene.add(roof);

var camRotTarget = {
	x: 0,
	y: 0
};

function updateMousePosition(e) {
	let movX = (Math.PI / 180) * e.movementY / 6;

	camRotTarget.y -= (Math.PI / 180) * e.movementX / 6;
	if(camRotTarget.x-movX > -Math.PI/2 && camRotTarget.x-movX < Math.PI/2) camRotTarget.x -= movX;
}
var controls = {
	forward: false,
	backward: false,
	right: false,
	left: false,
	run: false,
	sneak: false,
	mouseLeft: false
}

function setControlState(e, state) {
	switch (e.keyCode) {
		case 87:controls.forward = state;break;
		case 83:controls.backward = state;break;
		case 68:controls.right = state;break;
		case 65:controls.left = state;break;
		case 16:controls.run = state;break;
		case 67:controls.sneak = state;break;
		case 27:
			document.webkitExitFullscreen();
			document.exitPointerLock();
			break;
	}
	switch(e.button){
		case 0:controls.mouseLeft = state;break;
	}
}
document.addEventListener("mousedown",function(e){setControlState(e, true);shootClipAction.repetitions = Infinity;shootClipAction.enabled = true;});
document.addEventListener("mouseup",function(e){setControlState(e, false);shootClipAction.repetitions = 1;});
document.addEventListener("keydown", function(e) {setControlState(e, true);});
document.addEventListener("keyup", function(e) {setControlState(e, false);});
let dir = {
	z: 0,
	x: 0,
	zs:0,
	xs:0
};

var lastTime = performance.now();
var move = 0;
var cameraContainerRotationZ = 90;

var speed = 0;

var dirTarget1 = 0;
var dirTarget2 = 0;
var dirTarget = Math.PI;

var PlayerYtarget = 0;

var fovTarget = 90;
var shakeAmount = 0;
var update = function() {
	requestAnimationFrame(update);
	/////////map
	mapCtx.fillStyle = "rgba(255,255,255,0.2)";
	mapCtx.clearRect(0,0,mapSize,mapSize);
	for (var x = 0; x < map.length; x++) {
		for (var y = 0; y < map[0].length; y++) {
			if(map[x][y]==1) mapCtx.fillRect(x,y,1,1);
		}
	}
	mapCtx.fillStyle = "#fff";
	mapCtx.fillRect(Math.round(Player.position.x/3),Math.round(Player.position.z/3),1,1);
	mapCanvas.style.MozTransform = "rotate("+cameraY.rotation.y+"rad)";
	mapCanvas.style.WebkitTransform = "rotate("+cameraY.rotation.y+"rad)";
	/////////map
	light.intensity += (light.intensityTarget-light.intensity)/5;

	let now = performance.now();
	let delta = 1/((now-lastTime)/20);

	let walkSpeed = 1;
	let runSpeed  = 2;

	let speedTarget = (controls.run) ? runSpeed : walkSpeed;
	if (controls.sneak) {speedTarget = 0.3;PlayerYtarget= -0.7;}else{PlayerYtarget=0;}
	Player.position.y += (PlayerYtarget-Player.position.y)/10;

	if (controls.run && !controls.sneak || controls.mouseLeft) {
		fovTarget = 110;
	}else{
		fovTarget = 90;
	}

	camera.position.set(Math.random()*shakeAmount,Math.random()*shakeAmount,Math.random()*shakeAmount);
	if(shakeAmount>0.005) shakeAmount-=0.005;
	camera.fov += (fovTarget-camera.fov)/20;
	camera.updateProjectionMatrix();

	checkControls()

	if (!controls.left && !controls.right) {
		cameraContainerRotationZ += (90-cameraContainerRotationZ)/10;
	}
	cameraContainer.rotation.z = cameraContainerRotationZ-90;
	let isInMove = false;
	if(!controls.forward && !controls.backward && !controls.left && !controls.right){
		move+=0.1;
		speedTarget = 0;
	}else{
		isInMove = true;
		move+=speed;
	}

	cameraContainer.rotation.x = (Math.cos(move/5+10))/46;
	cameraContainer.position.y = (Math.sin(move/5))/10;
	cameraContainer.position.x = (Math.cos(move/10))/10;

	speed+=(speedTarget-speed)/10;
	let FinalDirection = {
		z:((Math.cos(cameraY.rotation.y+dirTarget) / 16))*speed/delta,
		x:((Math.sin(cameraY.rotation.y+dirTarget) / 16))*speed/delta
	}

	Player.position.z+=FinalDirection.z;
	Player.position.x+=FinalDirection.x;

	checkCollisions(FinalDirection,Player);

	cameraY.rotation.y += (camRotTarget.y - cameraY.rotation.y) / 3;
	camera.rotation.x += (camRotTarget.x - camera.rotation.x) / 3;
	// composer.render();
	try{
		if (controls.mouseLeft) {//weapon animation
			idleClipAction.stop();
			shootClipAction.play();

			if(shootClipAction._loopCount!=lastLoopCount){//fire
				shakeAmount = 0.05;
				light.intensity=2.2;
				lastLoopCount=shootClipAction._loopCount;
				dirTarget = Math.PI;
				speed = (isInMove) ? 1 : -1;
			}
		}
		else{
			idleClipAction.play();//idle
		}
	}catch{}
	if ( weaponMixer ) {
		weaponMixer.update( clock.getDelta() );
	}
	// composer.render();
	updateNpcs();
	renderer.render(scene, camera);
	lastTime = now;
};
update();

function checkControls() {
	if (controls.forward) {
		dirTarget = Math.PI;
		if (controls.left) {
			dirTarget= Math.PI+Math.PI/4;
		}else
		if (controls.right) {
			dirTarget= Math.PI-Math.PI/4;
		}
	}
	if (controls.backward) {
		dirTarget = 0;
		if (controls.left) {
			dirTarget= -Math.PI/4;
		}else
		if (controls.right) {
			dirTarget= Math.PI/4;
		}
	}
	if (controls.left) {
		dirTarget = -Math.PI/2;
		if (controls.forward) {
			dirTarget= Math.PI+Math.PI/4;
		}else
		if (controls.backward) {
			dirTarget= -Math.PI/4;
		}
		cameraContainerRotationZ += ((Math.PI/40+90)-cameraContainerRotationZ)/10;
	}
	if (controls.right) {
		dirTarget = Math.PI/2;
		if (controls.forward) {
			dirTarget= Math.PI-Math.PI/4;
		}else
		if (controls.backward) {
			dirTarget= Math.PI/4;
		}
		cameraContainerRotationZ += ((-Math.PI/40+90)-cameraContainerRotationZ)/10;
	}}
function checkCollisions(FinalDirection,collider) {
	if(collider.isCollision(new THREE.Vector3( FinalDirection.x,0,0))){collider.position.x -= FinalDirection.x;}
	if(collider.isCollision(new THREE.Vector3(-FinalDirection.x,0,0))){collider.position.x += FinalDirection.x;}
	if(collider.isCollision(new THREE.Vector3(0,0, FinalDirection.z))){collider.position.z -= FinalDirection.z;}
	if(collider.isCollision(new THREE.Vector3(0,0,-FinalDirection.z))){collider.position.z += FinalDirection.z;}}

function updateNpcs() {
	for (var n = 0; n < Npcs.length; n++) {let npcSpeed = 0.02;
		if (Player.position.x+npcSpeed>Npcs[n].npc.position.x) {Npcs[n].npc.position.x+=npcSpeed;}else if(Player.position.x-npcSpeed<Npcs[n].npc.position.x){Npcs[n].npc.position.x-=npcSpeed;}
		if (Player.position.z+npcSpeed>Npcs[n].npc.position.z) {Npcs[n].npc.position.z+=npcSpeed;}else if(Player.position.z-npcSpeed<Npcs[n].npc.position.z){Npcs[n].npc.position.z-=npcSpeed;}
		Npcs[n].npc.lookAt(Player.position.x,Npcs[n].npc.position.y,Player.position.z);

		if (clock.elapsedTime*1000>=Npcs[n].nextChange) {
			Npcs[n].frame+=1;
			if (Npcs[n].frame>Npcs[n].sprites.length-1) {Npcs[n].frame = 0;}
			Npcs[n].npc.material.map = Npcs[n].sprites[Npcs[n].frame];
			Npcs[n].nextChange = clock.elapsedTime*1000+Npcs[n].animSpeed;
		}
	}}
function addNpc(npc,textureSheet,animSpeed) {
	Npcs.push({npc:npc,sprites:textureSheet,animSpeed:animSpeed,nextChange:clock.elapsedTime*1000+animSpeed,frame:0});
}
function createEnemy(size=2,sprites=morw_texture,position={x:Player.position.x,y:Player.position.z},fps=17){
	var npcGeometry = THREE.PlaneGeometry( size,size, size,size );
	var enemy = new THREE.Mesh(npcGeometry, new THREE.MeshLambertMaterial({map: sprites[0],side: THREE.DoubleSide}));
	enemy.material.transparent = true;
	enemy.position.set(position.x,-0.5,position.z);
	scene.add(enemy);
}

window.addEventListener( 'resize', onWindowResize );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}