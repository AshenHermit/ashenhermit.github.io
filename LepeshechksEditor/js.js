


document.addEventListener('keyup', function(e) {
	keyCan = true; 
});



function update() {
	Editor.Update();
}
setInterval(update,1000/10);

function controls() {
	Editor.Keys();
}
setInterval(controls,1000/10);