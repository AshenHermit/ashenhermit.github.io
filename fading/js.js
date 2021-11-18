var galleryData = {

	nightStreet:{
		name: "night street",
		src: [
			"https://sun9-21.userapi.com/c204516/v204516839/4924a/BVlQ89-DnI4.jpg",
			"https://sun9-29.userapi.com/c204516/v204516839/49254/GsY5JmycH-g.jpg",
			"https://sun9-55.userapi.com/c204516/v204516839/4925e/uLU5p0-jktQ.jpg",
			"https://sun9-30.userapi.com/c204516/v204516839/49268/Rs4FHPJbt44.jpg",
			"https://sun9-6.userapi.com/c204516/v204516839/49272/xrMZ4ky0R8g.jpg",
			"https://sun9-67.userapi.com/c204516/v204516839/4927c/w_ClKx8jxxQ.jpg",
			"https://sun9-24.userapi.com/c204516/v204516839/49286/WuKaHEGPG-E.jpg",
			"https://sun9-47.userapi.com/c204516/v204516839/49290/7n5mX_7O6oM.jpg",
			"https://sun9-47.userapi.com/c204516/v204516839/492a2/eG7qZaUmMZ0.jpg",
			"https://sun9-62.userapi.com/c204516/v204516839/492ac/Kd89k3clehQ.jpg",
			"https://sun9-63.userapi.com/c204516/v204516839/492b6/_AlGfaV4Azk.jpg",
		]
	}

}



var canvas = document.getElementById('view')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


var buffer = []
var imageCount = 0
var scroll = 0
var startScroll = 0
var mouseStart = 0

var isDown = false

function mod(x, y){
	return x - y * Math.floor(x/y)
}

function initBuffer(imageKey){
	buffer = []
	imageCount = galleryData[imageKey].src.length
	for (var i = 0 ; i < imageCount; i++) {
		buffer.push(new Image())
		buffer[buffer.length-1].src = galleryData[imageKey].src[i]
	}
}

initBuffer("nightStreet")

function update(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	var offset = mod(scroll, 1)
	//first pass
	ctx.globalAlpha = 1
	ctx.drawImage(buffer[Math.floor(scroll)], 0, 0)

	//second pass
	if(scroll<imageCount-1){
		ctx.globalAlpha = offset
		ctx.drawImage(buffer[Math.floor(scroll)+1], 0, 0)
	}
}

//events
function onDown(e) {
	startScroll = new Number(scroll)
	mouseStart = e.pageY
	isDown = true;
}
function onUp(e) {
	isDown = false
}
function onMove(e) {
	if(isDown){
		scroll = startScroll + (e.pageY - mouseStart)/(window.innerHeight/(imageCount-1))
		if( scroll > imageCount-1 ) scroll = imageCount-1
		if( scroll < 0 ) scroll = 0
		update()
	}
}

//event listeners
// mouse
document.addEventListener('mousedown', onDown)
document.addEventListener('mouseup', onUp)
document.addEventListener('mousemove', onMove)

// touch
document.addEventListener('touchstart', function(){
	onDown(e.changedTouches[0])
})
document.addEventListener('touchend', function(){
	onUp(e.changedTouches[0])
})
document.addEventListener('touchmove', function(){
	onMove(e.changedTouches[0])
})

