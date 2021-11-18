// var torchGeometry = new THREE.PlaneGeometry( 0.5, 0.5 ,0.5 , 0.5);
// var torch = new THREE.Mesh(torchGeometry, new THREE.MeshLambertMaterial({map: weapon_texture,side: THREE.DoubleSide}));
// weapon.material.transparent = true;
// hand.add(weapon);


///morv
var morwGeometry = new THREE.PlaneGeometry( 2,2, 2,2 );
var morw = new THREE.Mesh(morwGeometry, new THREE.MeshLambertMaterial({map: morw_texture[0],side: THREE.DoubleSide}));
morw.material.transparent = true;
morw.position.set(Player.position.x,-0.5,Player.position.z);
scene.add(morw);

var framesCount = 7;
var frameTime = 0.3/framesCount;
var frames = [0]; for (var f = 1; f < framesCount; f++) {frames.push(frameTime*f)}
var spritesKF = new THREE.VectorKeyframeTrack( '.material', frames, morw_texture);

addNpc(morw,morw_texture,1000/17);
