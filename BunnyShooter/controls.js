var gamepadConnected = false;
var gpInteract = false;

var joyContainer = document.getElementById("joyContainer");
var joyController = document.getElementById("joyController");

joyContainer.style.marginLeft = -joyContainer.clientWidth/2+"px"
joyContainer.style.marginTop = -joyContainer.clientHeight/2+"px"

var ongoingTouches = new Array();
var dragDir = {x:0,y:0}
var dragStart = {x:0,y:0}
var pressing = false


function onDown(x, y) {
	dragStart.x = x
	dragStart.y = y
	bunny.fireCount = 11
	pressing = true
	if(isMobile) joyContainer.style.opacity = 0.5
	joyContainer.style.left = dragStart.x+"px"
	joyContainer.style.top = dragStart.y+"px"
}
function onMove(x, y) {	
	if(isMobile){
		dragDir.x = x - dragStart.x;
		dragDir.y = y - dragStart.y;
	}else{
		dragDir.x = x - window.innerWidth/2
		dragDir.y = y - window.innerHeight/2
	}
	if( isPlaying ){
		/*bunny.rotation = Math.atan2(
		window.innerHeight/2 - touches[0].pageY,
		window.innerWidth/2 - touches[0].pageX)-Math.PI/2*/
		bunny.rotation = Math.atan2(
			dragDir.y,
			dragDir.x
		)+Math.PI/2		
	}
}
function onUp(x, y) {
	dragDir = {x:0,y:0}
    pressing = false
    joyContainer.style.opacity = 0
}


function initControls(){
document.addEventListener("touchstart", function(e){
	var touches = e.changedTouches;
	onDown(touches[0].pageX, touches[0].pageY)
});
document.addEventListener("mousedown", function(e){
	onDown(e.pageX, e.pageY)
});

document.addEventListener('click', function(e){
	nextDialogueText()
})

document.addEventListener('touchmove', function(e){
	var touches = e.changedTouches;
	onMove(touches[0].pageX, touches[0].pageY)
})
document.addEventListener('mousemove', function(e){
	onMove(e.pageX, e.pageY)
})

document.addEventListener('touchend', function(e){
	onUp()
})
document.addEventListener('mouseup', function(e){
	onUp()
})


document.getElementById('note').addEventListener('click', function(e){
	cookie.music = !cookie.music;
	saveCookie()
	if(!cookie.music) {
		document.getElementById('note').style.opacity = 0.1
		window.ost.pause()
	}
	else {
		document.getElementById('note').style.opacity = 0.8
		window.ost.resume()
	}
});

//new listener here
}

function updateGamepad() {
	if(gamepadConnected){
		let gamepad = navigator.getGamepads()[0];

		dragDir.x = parseFloat(gamepad.axes[0].toFixed(2))
		dragDir.y = parseFloat(gamepad.axes[1].toFixed(2))

		if(dragDir.x!=0 || dragDir.y!=0) pressing = true
		else pressing = false

		if( isPlaying && pressing ){
			bunny.rotation = Math.atan2(
				dragDir.y,
				dragDir.x
			)+Math.PI/2
		}

		if(!gpInteract && gamepad.buttons[3].pressed){
			gpInteract = true;
			nextDialogueText()
			console.log(dragDir);
		}
		if(!gamepad.buttons[3].pressed){
			gpInteract = false;
		}
	}
}

window.addEventListener("gamepadconnected", function(e) {
	/*
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
	e.gamepad.index, e.gamepad.id,
	e.gamepad.buttons.length, e.gamepad.axes.length);

	gamepadConnected = true;
	*/
});