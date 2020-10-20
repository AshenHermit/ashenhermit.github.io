(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();


document.addEventListener('keyup', function(e) {
	keyCan = true; 
});



function update() {
	Editor.Update();

	requestAnimationFrame(update);
}
//setInterval(update,1000/10);

function controls() {
	Editor.Keys();
}
setInterval(controls,1000/10);


window.addEventListener("load",function(){
    update();
});