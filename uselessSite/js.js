var contentJsonUrl = "https://dl.dropboxusercontent.com/s/cumzhh838e2z0co/content.json"

var isMobile = false

if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)
){
	isMobile = true;
}
else {
	isMobile = false;
}

var Edit = false

var contentIndx = 0
if(Edit) contentIndx = 1
else{
	document.getElementById('save-button').style.display = 'none'
	contentIndx = 0
}
document.getElementsByClassName('storage-text')[contentIndx].id = "storage-text"



function readFile(url, callback){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			var data = JSON.parse(this.response);
			callback(data)
		} else {
			
		}
	};

	request.onerror = function() {

	};

	request.send();
}

function getRect(el) {
	return el.getClientRects()[0]
}


var content = null
readFile(contentJsonUrl, function(data){
	content = data
	menu.title.innerHTML = "useless site"
})


var menu = {}
menu.state = true;
menu.selected = 0;
menu.selectedTarget = 0;
menu.title = document.getElementById('menu-title')
menu.container = document.getElementById('items-container')
menu.items = menu.container.children
menu.enter = function(){
	store.initContent()
	menu.state = false
	document.getElementById('back-button').style.opacity = 1
	animateContent()
}
menu.clampSelected = function(){
	if(menu.selectedTarget>menu.items.length-1) menu.selectedTarget = 0
	if(menu.selectedTarget<0) menu.selectedTarget = menu.items.length-1
}
menu.update = function(){
	var op = parseFloat(this.container.style.opacity)
	if(menu.state && content!=null){
		this.container.style.opacity = op+(1-op)/3
		this.selected+=(this.selectedTarget-this.selected) / 5

		for (var i = 0; i < this.items.length; i++) {
			var x = i-this.selected

			this.items[i].style.left= (window.innerWidth/2 ) + "px"
			this.items[i].style.top = (window.innerHeight/2 + x*(getRect(this.items[i]).height)*1.1) + "px"
			this.items[i].style.transform = "scale("+ (1 - Math.abs(x)/4) +") perspective(200px) rotate3d(1, 0, 0, "+ (-x*45) +"deg)"
			this.items[i].style.opacity = 1-Math.abs(x)/1.06
		}
	}else{
		this.container.style.opacity = op - op/3
	}
}

menu.init = function(){
	setTimeout(()=>{
		this.container.style.opacity = 1
		for (var i = 0; i < this.items.length; i++) {
			var rect = getRect(this.items[i])
			this.items[i].style.marginLeft = ( -rect.width/2 ) + "px"
			this.items[i].style.marginTop  = ( -rect.height/2 ) + "px"
		}
	}, 200)
}


var store = {}
store.selected = 0
store.itemContainer = document.getElementById('storage-list')
store.content = document.getElementById('storage-text')
store.container = document.getElementById('storage-container')
store.items = document.getElementsByClassName('list-item')
store.animState = true
store.update = function() {
	var active = document.getElementsByClassName('hovered')[0]
	if(active!=null) active.classList.remove('hovered')

	document.querySelector('[item-id="'+this.selected+'"]').classList.add('hovered')

	if(!Edit) this.content.innerHTML = textToHTML(content[menu.selectedTarget]["content"][store.selected].content)
	else      this.content.value = content[menu.selectedTarget]["content"][this.selected].content
}
store.init = function() {
	this.container.style.opacity = 0
	this.content.style.display = 'block'

	if(isMobile)
		this.container.style.gridTemplateColumns = "1fr";
}

store.initContent = function() {
	this.container.style.opacity = 1
	menu.title.innerHTML = content[menu.selectedTarget]["name"]

	if(content[menu.selectedTarget]["content"][0].type=="item"){
		this.itemContainer.innerHTML = "";
		var count = 0
		content[menu.selectedTarget]["content"].forEach((function(item){
			this.itemContainer.innerHTML += htmlElement("list item", [count, item.name])
			count++
		}).bind(this));
	}

	this.update()
}

function onBackButton(){
	animateContent()
	menu.title.innerHTML = "useless site"
	menu.selected = 0;
	menu.state = true;
	store.selected = 0;
	store.container.style.opacity = 0
	document.getElementById('back-button').style.opacity = 0
}


function animateContent(){
	if(store.animState) store.container.style.transform = "scaleY( -1) perspective(1000px) rotate3d(1, 0, 0, 180deg)"
	else				store.container.style.transform = "scaleY( -1) perspective(1000px) rotate3d(1, 0, 0, 0deg)"

	store.animState = !store.animState;		
}



store.init()
menu.init()

function update(){
	requestAnimationFrame(update)

	menu.update()
}
update()




//event listeners

document.addEventListener('keydown', function(e){
	console.log(e.keyCode);

	// 40 // 38
	// 90 - z
	// 88 - x

	if(menu.state){

		if(e.keyCode==40){ // down
			menu.selectedTarget += 1;
			menu.clampSelected()

		}
		if(e.keyCode==38){ // up
			menu.selectedTarget -= 1;
			menu.clampSelected()
		}
		//menu.selectedTarget = Math.max(0, Math.min( menu.items.length-1, menu.selectedTarget))

		// enter
		if(e.keyCode==13 || e.keyCode==90){
			menu.enter()
		}

	}else{

		if(!Edit){
			if(e.keyCode==40){ // down
				store.selected += 1
				if(store.selected>store.items.length-1) store.selected = 0
				store.update()
			}
			if(e.keyCode==38){ // up
				store.selected -= 1
				if(store.selected<0) store.selected = store.items.length-1
				store.update()
			}
			if(e.keyCode==8 || e.keyCode==88){ // back
				onBackButton()
			}
		}

		// enter
		if(e.keyCode==13 || e.keyCode==90){		
			//menu.state = false
		}

	}

});


document.addEventListener('click', function(e){
	if (e.target.classList.contains('list-item')) {
		store.selected = parseInt(e.target.getAttribute('item-id'))
		store.update()
	}
	if (e.target.classList.contains('back-button')) {
		onBackButton()
	}

	//for mobile
	if(menu.state && !e.target.classList.contains('back-button')){
		if(e.pageY<window.innerHeight/2-32){// up
			menu.selectedTarget -= 1;
			menu.clampSelected()
		}
		if(e.pageY>window.innerHeight/2+32){// down
			menu.selectedTarget += 1;
			menu.clampSelected()
		}
		if(e.pageY>=window.innerHeight/2-32 && e.pageY<=window.innerHeight/2+32){// center (enter)
			menu.enter()
		}
	}
})