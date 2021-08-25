function findObj(name) {
	for (var i = 0; i < Objects.length; i++) {
		if (Objects[i].name==name) {
			return Objects[i];
			break;
		}
	}
}

var can = document.getElementById('display'); //теперь наша переменная can будет отвечать за элемент canvas в html // присвоили по аттрибуту id (' id=="can" ' - в html) 
var ctx = can.getContext('2d');
var keyCan = true;

var obj = findObj($('.select').val());
var isObject = (obj.type=="playerSpawn"||obj.type=="entity"||obj.type=="decor"||obj.type=="wall");

function _Editor() {
	this.cursorImg = new _sprite(_textures.cursor);
	this.grid = new _sprite(_textures.grid);
	this.width  = 320;
	this.height = 240;
	this.cursor = {};
	this.cursor.x = 5;
	this.cursor.y = 5;
	this.selectY=0;

	this.Update = function() {
		var cellWidth = this.cursorImg.width;
		var cellHeight = this.cursorImg.height;

		ctx.clearRect(0, 0, 320, 240);

		// for (var w = 0; w < this.width; w++) {
		// 	for (var h = 0; h < this.height; h++) {
		// 		ctx.drawImage(this.grid.img,w*cellWidth,h*cellHeight,this.cursorImg.width,this.cursorImg.height);
		// 	}
		// }

		for (var o = 0; o < Map.floor.length; o++) {
			if(Map.floor[o].spriteImg == undefined) Map.floor[o].spriteImg = new _sprite(Map.floor[o].sprite)
			ctx.drawImage(Map.floor[o].spriteImg.img,(Map.floor[o].x*cellWidth/2)+Map.floor[o].sprite.offset.x,(Map.floor[o].y*cellHeight/2)+Map.floor[o].sprite.offset.y,Map.floor[o].spriteImg.img.width,Map.floor[o].spriteImg.img.height);
		}
		for (var o = 0; o < Map.objects.length; o++) {
			if(Map.objects[o].spriteImg == undefined) Map.objects[o].spriteImg = new _sprite(Map.objects[o].sprite)
			ctx.drawImage(Map.objects[o].spriteImg.img,(Map.objects[o].x*cellWidth/2)+Map.objects[o].sprite.offset.x,(Map.objects[o].y*cellHeight/2)+Map.objects[o].sprite.offset.y,Map.objects[o].spriteImg.img.width,Map.objects[o].spriteImg.img.height);
		}

		obj = findObj($('.select').val());
		isObject = (obj.type=="playerSpawn"||obj.type=="entity"||obj.type=="decor"||obj.type=="wall");

		if (isObject) {
			ctx.globalAlpha = 0.4;
			var tmp = new _sprite(obj.sprite)

			ctx.drawImage(tmp.img,(this.cursor.x*cellWidth/2)+obj.sprite.offset.x,(this.cursor.y*cellHeight/2)+obj.sprite.offset.y,tmp.img.width,tmp.img.height);
			ctx.globalAlpha = 1;
		}

		ctx.drawImage(this.cursorImg.img,this.cursor.x*cellWidth/2,this.cursor.y*cellHeight/2,this.cursorImg.width,this.cursorImg.height);
	}

	this.Keys = function() {
		var cellWidth = this.cursorImg.width;
		var cellHeight = this.cursorImg.height;

		if (input.isDown('UP')&&!input.isDown('RIGHT')&&!input.isDown('LEFT'))   {this.cursor.y-=2}
			else if (input.isDown('UP')&&input.isDown('RIGHT')&&!input.isDown('LEFT')) {this.cursor.y-=1;this.cursor.x+=1}
			else if (input.isDown('UP')&&!input.isDown('RIGHT')&&input.isDown('LEFT')) {this.cursor.y-=1;this.cursor.x-=1};

		if (input.isDown('DOWN')&&!input.isDown('RIGHT')&&!input.isDown('LEFT')) {this.cursor.y+=2}
			else if (input.isDown('DOWN')&&input.isDown('RIGHT')&&!input.isDown('LEFT')) {this.cursor.y+=1;this.cursor.x+=1}
			else if (input.isDown('DOWN')&&!input.isDown('RIGHT')&&input.isDown('LEFT')) {this.cursor.y+=1;this.cursor.x-=1};

		if (input.isDown('RIGHT')&&!input.isDown('UP')&&!input.isDown('DOWN')){this.cursor.x+=2}

		if (input.isDown('LEFT')&&!input.isDown('UP')&&!input.isDown('DOWN')) {this.cursor.x-=2}
	}
}
_Editor.prototype.moveMap = function(dx,dy) {
	for (var o = 0; o < Map.floor.length; o++) {
		Map.floor[o].x+=dx;
		Map.floor[o].y+=dy;
		saveJson();
	}
	for (var o = 0; o < Map.objects.length; o++) {
		Map.objects[o].x+=dx;
		Map.objects[o].y+=dy;
		saveJson();
	}
}

if (jsonString!="") {
	Map = JSON.parse(jsonString);
	saveJson()
}
var Editor = new _Editor();

document.onmousemove = function(e) {
	var cellWidth = Editor.cursorImg.width;
	var cellHeight = Editor.cursorImg.height;

	if (!input.isDown('SHIFT')) {
		Editor.cursor.x = Math.round((e.pageX/parseInt($('#display').css('width'),10)*20)-1);
		Editor.cursor.y = Math.round((e.pageY/parseInt($('#display').css('height'),10)*29.9)-1);
	}else{
		Editor.cursor.x = Math.round((e.pageX/parseInt($('#display').css('width'),10)*320)-16)/16;
		Editor.cursor.y = Math.round((e.pageY/parseInt($('#display').css('height'),10)*239.2)-8)/8;
	}
}

function saveJson() {
	jsonString = JSON.stringify(Map);
	$('#jsonText').val(jsonString);
}






function CreateObj(obj) {

	if (obj.type=="floor") {
		Map.floor.push(
			{
				x:Editor.cursor.x,
				y:Editor.cursor.y,
				name:obj.name,
				sprite: obj.sprite,
				spriteImg: new _sprite(obj.sprite),
				type:"floor"
			}
		);
	}else if (obj.type!="floor") {
		Map.objects.push(
			{
				x:Editor.cursor.x,
				y:Editor.cursor.y,
				name:obj.name,
				sprite: obj.sprite,
				spriteImg: new _sprite(obj.sprite),
				type:"obj",
				object:obj
			}
		);
	}

	saveJson()
}



document.addEventListener('mousedown', function(e) {
	var cellWidth = Editor.cursorImg.width;
	var cellHeight = Editor.cursorImg.height;

	if (Editor.cursor.x<=19&&Editor.cursor.y<30&&keyCan && e.which==1) {
		if (obj.type=="floor") {
			if (Map.floor.length!=0) {
				for (var o = 0; o < Map.floor.length; o++) {
					if (Editor.cursor.x==Map.floor[o].x && Editor.cursor.y==Map.floor[o].y) {
						break;
				   	}else if (o==Map.floor.length-1) {
				   		CreateObj(obj);
				   	}
				}
		   	}else{CreateObj(obj);}
		}else if (isObject) {
			if (Map.objects.length!=0) {
				for (var o = 0; o < Map.objects.length; o++) {
					if (Editor.cursor.x==Map.objects[o].x && Editor.cursor.y==Map.objects[o].y) {
						break;
				   	}else if (o==Map.objects.length-1) {
				   		CreateObj(obj);
				   	}
			   	}
			}else{CreateObj(obj);}
		}

		// keyCan = false;
	}else if (keyCan && e.which==2) {
		if (obj.type=="floor") {
			for (var o = 0; o < Map.floor.length; o++) {
				if (!input.isDown('SHIFT')) {
					if (Editor.cursor.x==Map.floor[o].x && Editor.cursor.y==Map.floor[o].y) {
						Map.floor.splice(o,1);
						saveJson();
						break;
				   	}
			   	}else{

			   	}
		   	}
		}else if (isObject) {
			for (var o = 0; o < Map.objects.length; o++) {
				if (!input.isDown('SHIFT')) {
					if (Editor.cursor.x==Map.objects[o].x && Editor.cursor.y==Map.objects[o].y) {
						Map.objects.splice(o,1);
						saveJson();
						break;
				   	}
			   	}else{
			   		if (Editor.cursor.x==Map.objects[o].x && Editor.cursor.y==Map.objects[o].y) {
						Map.objects.splice(o,1);
						saveJson();
						break;
				   	}
			   	}	
		   	}
		}
	}
});

document.addEventListener('keydown', function(e) {
	if (e.key.toUpperCase()=="P"||e.key.toUpperCase()=="З") {
		Map = JSON.parse($('#jsonText').val());
	}
});

