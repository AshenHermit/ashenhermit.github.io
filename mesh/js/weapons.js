var hand = new THREE.Object3D();
camera.add(hand);
hand.position.set(0.4,-0.1,-0.5);
hand.rotation.y = -Math.PI/2;

var weaponGeometry = new THREE.PlaneGeometry( 0.5, 0.5 ,0.5 , 0.5);
weapon = new THREE.Mesh(weaponGeometry, new THREE.MeshLambertMaterial({map: weapon_texture,side: THREE.DoubleSide}));
weapon.material.transparent = true;
hand.add(weapon);

var frameTime = 0.3/13;
var positionKF = new THREE.VectorKeyframeTrack( '.position', [ 0, frameTime*1, frameTime*8, frameTime*13 ], [0,0,0, 
																											0.2047,-0.0471,0, 
																											0.1043,-0.055,0,
																											0,0,0 ]);
var rotationKF = new THREE.VectorKeyframeTrack( '.quaternion', [ 0, frameTime*1, frameTime*8, frameTime*13 ], [0,0,0,1, 
																											0,0,-0.0772,0.997015, 
																											0,0,-0.1641,0.98643,
																											0,0,0,1,]);
var shootClip = new THREE.AnimationClip('Action', frameTime*13, [positionKF,rotationKF]);

frameTime = 2/16;
var idlePositionKF = new THREE.VectorKeyframeTrack( '.position', [ 0, frameTime*4, frameTime*8, frameTime*12, frameTime*16 ],[0,0,0, 
																															  0,-0.0179,0,
																															  0,-0.0359,0,
																															  0,-0.0179,0,
																															  0,0,0]);
var idleRotationKF = new THREE.VectorKeyframeTrack( '.quaternion', [ 0, frameTime*4, frameTime*8, frameTime*12, frameTime*16 ],[0,0,0,1, 
																																0,0,-0.004673,1,
																																0,0,0,1,
																																0,0,0.009815,1,
																																0,0,0,1]);
var idleClip = new THREE.AnimationClip( 'Action', frameTime*16, [idlePositionKF,idleRotationKF]);
weaponMixer = new THREE.AnimationMixer( weapon );
shootClipAction = weaponMixer.clipAction( shootClip );
idleClipAction = weaponMixer.clipAction( idleClip );
idleClipAction.play();