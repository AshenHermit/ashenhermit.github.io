var Loader = {};
Loader.animationTexture = function() {
	let texturesArray;
	console.log(arguments[1].constructor.name);
	if(arguments[1].constructor.name=="String"){texturesArray = new Array(arguments.length);}
	else{texturesArray = new Array(arguments[1]+1);}
	for (var i = 0; i < texturesArray.length; i++) {
		if(arguments[1].constructor.name=="String"){texturesArray[i] = new THREE.TextureLoader().load(arguments[i]);}
		else{texturesArray[i] = new THREE.TextureLoader().load(arguments[0]+"/output-"+i+".png");}
	}
	return texturesArray;
}