var width = mapSize;
var height = mapSize;

var birthLimit = 4;
var deathLimit = 3;
var wallsRate = 0.4;

var firstMap = map2();
var newMap = map2();
map = GenerteCave();

var playerPosed = false;
for (var x = 0; x < map.length; x++) {
	for (var y = 0; y < map[0].length; y++) {
		if (map[x][y]==1) {
			if(getNeighboursCount(map,x,y)<7){
				var wall = new THREE.Mesh(wallGeometry, wall2Material);
				Level.add(wall);
				wall.position.x = x*3;
				wall.position.z = y*3;
			}
		}else{
			if(x>6 && y>6 && x<mapSize-3 && y<mapSize-3 && getNeighboursCount(map,x,y)==0 && !playerPosed){
				Player.position.x = x*3;
				Player.position.z = y*3;
			}
			if(Math.random()<0.01){
				let light = new THREE.PointLight(0xFFFFFF);
				light.intensity = 1.0;
				light.distance = 16;
				light.position.x = x*3;
				light.position.z = y*3;
				lights.push(light);
			}

			if(Math.random()<0.15){
				if (getNeighboursCount(map,x,y)>=3) {
					var cube = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 3), wallMaterial);
					scene.add(cube);
					cube.material.map.repeat.y = 1/3;
					cube.position.x = x*3;
					cube.position.y = 3/2-0.5;
					cube.position.z = y*3;
				}
			}

			/*var spriteMap = new THREE.TextureLoader().load( "src/texture_floor.png" );
			var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
			var sprite = new THREE.Sprite( spriteMaterial );
			sprite.position.x = x;
			sprite.position.z = y;
			scene.add( sprite );*/
		}
	}	
}
addLights(lights)

function GenerteCave() {
	GenerateFirst();
	for (var s = 0; s < 6; s++) {
		doSimulationStep(firstMap);
	}

	for (var x = 0; x < width; x++) {
		firstMap[x][0] = 1;
	}
	for (var x = 0; x < width; x++) {
		firstMap[x][height-1] = 1;
	}
	for (var y = 0; y < height; y++) {
		firstMap[0][y] = 1;
	}
	for (var y = 0; y < height; y++) {
		firstMap[width-1][y] = 1;
	}


	return firstMap;
}

function GenerateFirst() {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			if (Math.random()<wallsRate) {
				firstMap[x][y] = 1;
				// ctx.fillRect(x,y,1,1);
			}else{
				firstMap[x][y] = 0;
			}
		}
	}
}

function optimizeMap(oldMap){
    newMap = map2();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var nbs = getNeighboursCount(oldMap,x,y);

            if (oldMap[x][y]==1) {
                if (nbs>=7) {
                    newMap[x][y] = 0;
                }else{
                    newMap[x][y] = 1;
                }
            }else{
                newMap[x][y] = 0;
            }
        }
    }
    //DrawMap(newMap);
    firstMap = newMap;
}

function doSimulationStep(oldMap){
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var nbs = getNeighboursCount(oldMap,x,y);

			if (oldMap[x][y]==1) {
				if (nbs<deathLimit) {
					newMap[x][y] = 0;
				}else{
					newMap[x][y] = 1;
				}
			}else{
				if (nbs>birthLimit) {
					newMap[x][y] = 1;
				}else{
					newMap[x][y] = 0;
				}
			}
		}
	}
	//DrawMap(newMap);
	map = newMap;
}

function getNeighboursCount(array,x,y) {
	var count = 0;
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
			neighbour_x = i+x;
			neighbour_y = j+y;

			if (i==0 && j==0) {

			}else if (neighbour_x<0 || neighbour_y<0 || neighbour_x>width-1 || neighbour_y>height-1) {
				// count++;
			}else if (array[neighbour_x][neighbour_y]==1) {
				count++;
			}
		}
	}
	return count;
}

function get(array,x,y) {
	return array[y*width];
}
function set(array,x,y,value) {
	array[x+y] = value;
}

function map2() {
	let array = new Array(width);
	for (var i = 0; i < array.length; i++) {
		array[i] = [];
	}
	return array;
}