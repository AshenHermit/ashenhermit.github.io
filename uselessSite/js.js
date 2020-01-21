var contentJsonUrl = "https://dl.dropboxusercontent.com/s/cumzhh838e2z0co/content.json"

var mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

var isMobile = mobilecheck()


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
	menu.setTitle("useless site")
})


var menu = {}
menu.state = true;
menu.selected = 0;
menu.selectedTarget = 0;
menu.title = document.getElementById('menu-title')
menu.container = document.getElementById('items-container')
menu.items = menu.container.children
menu.setTitle = function(title){
	this.title.innerHTML = title
	document.title = title
}
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
			this.items[i].style.top = (window.innerHeight/2 + x*getRect(this.items[i]).height*0.7) + "px"
			this.items[i].style.transform = "scale("+ (1 - Math.abs(x)/4) +") perspective(200px) rotate3d(1, 0, 0, "+ (-x*45) +"deg)"
			this.items[i].style.opacity = 1-Math.abs(x)/1.09
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
			this.items[i].style.marginLeft = -114/2 + "px"
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
	menu.setTitle(content[menu.selectedTarget]["name"])


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
	menu.setTitle("useless site")
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
	//console.log(e.keyCode);

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
})

document.addEventListener('mousedown', function(e){
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