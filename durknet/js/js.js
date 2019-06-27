var html = document.getElementsByTagName('html')[0];

function checkPage() {
	console.log("ыыы");
  	var elements = document.getElementsByClassName('navMenuButton');
  	for (var el = 0; el < elements.length; el++) {
  		elements[el].className = elements[el].className.replace(/ active/,"");
  	}
	if(window.location.hash!="") document.getElementsByClassName('content')[0].innerHTML="";
	switch(window.location.hash){
		case "":
			elements[0].className+=" active";
			// document.getElementById('mainTitle').innerHTML="Галлерея";
			// document.getElementById('mainSubTitle').innerHTML="здесь собранны картины великих художников";
			document.getElementsByClassName('bg')[0].style.backgroundImage="url(img/mainBg.jpeg)";
			html.style.setProperty("--main-text-color","#a5d649");
			break;
		case "#gallery":
			document.getElementsByClassName('content')[0].style.display = "";
			elements[1].className+=" active";
			document.getElementById('mainTitle').innerHTML="Галлерея";
			document.getElementById('mainSubTitle').innerHTML="здесь собранны картины великих художников";
			html.style.setProperty("--main-text-color","#ff9081");
			document.getElementsByClassName('bg')[0].style.backgroundImage="url(img/galleryBg.jpeg)";
			document.title="Дурькнет.ru - галлерея";
			loadJsonPictures();
			break;
		case "#shop":
			elements[2].className+=" active";
			document.getElementById('mainTitle').innerHTML="Магаз";
			document.getElementById('mainSubTitle').innerHTML="отвественность за последствия от покупок вы несете сами";
			html.style.setProperty("--main-text-color","#ff9e6f");
			document.getElementsByClassName('bg')[0].style.backgroundImage="url(img/shopBg.jpeg)";
			loadJsonGoods();
			document.title="Дурькнет.ru - магаз";
			break;
		case "#news":
			elements[3].className+=" active";
			document.getElementById('mainTitle').innerHTML="Новостная лента";
			document.getElementById('mainSubTitle').innerHTML="утро начинается с дури";
			html.style.setProperty("--main-text-color","#bebcff");
			document.getElementsByClassName('bg')[0].style.backgroundImage="url(img/newsBg.jpeg)";
			document.title="Дурькнет.ru - новости";
			break;
		case "#projects":
			elements[3].className+=" active";
			document.getElementById('mainTitle').innerHTML="Проектики";
			document.getElementById('mainSubTitle').innerHTML="кульные";
			html.style.setProperty("--main-text-color","#ff5290");
			document.getElementsByClassName('bg')[0].style.backgroundImage="url(https://pp.userapi.com/c853420/v853420150/584b/xQQt20YBu8g.jpg)";
			loadJsonProjects();
			document.title="Дурькнет.ru - проектики";
			break;
	}
	// wow = new WOW({
 //      boxClass: 'wow', // default
 //      animateClass: 'animated', // default
 //      offset: 0, // default
 //      mobile: true, // default
 //      live: true // default
 //    })
 //    wow.init();
}

function loadJsonGoods() {
	getJson("json/goods.json",function(goods) {
	    goods.forEach(function(item) {
	    	document.getElementsByClassName('content')[0].innerHTML+=
			'<div class="wow animated fast flex-center fadeInUp shopItem">'+ ((item.name!=undefined) ? '<h2 class="flex-center animated fadeInDown mb-8 white-text shopItemName">'+item.name+'</h2>' : "") +((item.description!=undefined) ? '<h6 class="flex-center animated fadeInDown mb-8 white-text text-muted" style="color: rgba(255, 255, 255, 0.5) !important;">'+item.description+'</h6>' : "")+((item.price!=undefined) ? '<div class="d-flex flex-row shopItemBuyBlock"><h5 class="flex-center animated fadeInDown mb-8 white-text text-muted shopItemPrice">'+item.price+'<span style="text-decoration: line-through;">щ</span></h5><div style="margin-left: 5%;" class="animated fadeInDown waves-effect waves-light black-text shopItemButton">заказать</div></div>' : "")+'<img class="shopItemImg" alt="'+ ((item.name!=undefined) ? item.name : "параша какая т")+'" src="'+item.imgUrl+'"></img>'+((item.date!=undefined) ? '<h6 class=" animated fadeInDown mb-8 white-text text-muted shopItemDate">'+item.date+'</h6>' : "")+'</div>'
		});
	});
}
function loadJsonPictures() {
	getJson("json/pictures.json",function(pics) {
	    pics.forEach(function(item) {
	    document.getElementsByClassName('content')[0].innerHTML+=
			'<div class="wow animated fast flex-center fadeInUp pictureItem">'+'<img alt="'+ ((item.name!=undefined) ? item.name : "параша какая т")+'" style="max-height: 85vh !important; max-width: -webkit-fill-available !important;" class="shopItemImg" src="'+item.imgUrl+'"></img>'+ ((item.name!=undefined) ? '<h2 class="flex-center animated fadeInDown mb-8 white-text shopItemName ">'+item.name+'</h2>' : "") +((item.description!=undefined) ? '<h6 class="flex-center animated fadeInDown mb-8 white-text text-muted" style="color: rgba(255, 255, 255, 0.5) !important;">'+item.description+'</h6>' : "")+((item.price!=undefined) ? '<div class="d-flex flex-row shopItemBuyBlock"><h5 class="flex-center animated fadeInDown mb-8 white-text text-muted shopItemPrice">'+item.price+'<span style="text-decoration: line-through;">щ</span></h5><div class="animated fadeInDown waves-effect waves-light black-text shopItemButton">заказать</div></div>' : "")+((item.date!=undefined) ? '<h6 class=" animated fadeInDown mb-8 white-text text-muted shopItemDate">'+item.date+'</h6>' : "")+'</div>'
		});
	});
}
function loadJsonProjects() {
	getJson("json/projects.json",function(projects) {
	    projects.forEach(function(item) {
	    	document.getElementsByClassName('content')[0].innerHTML+=
			`<div class="wow animated fast flex-center fadeInUp shopItem">`+ ((item.name!=undefined) ? `
				<h2 class="flex-center animated fadeInDown mb-8 white-text shopItemName">`+item.name+`</h2>` : "") 
				+((item.description!=undefined) ? `
					<h6 class="flex-center animated fadeInDown mb-8 white-text text-muted" style="color: rgba(255, 255, 255, 0.5) !important;">`
					+item.description+`</h6>` : "")+`
				<a target="_blank" href="`+item.url+`">
				<img class="shopItemImg clickable" alt="`+ ((item.name!=undefined) ? item.name : "параша какая т")+`" src="`+item.preview+`"></img></a></div>`
		});
	});
}

function getJson(filePath,callback) {
	var j = $.getJSON(filePath);
	var waiting = setInterval(function(){
		if(j.readyState>3){
			let data = JSON.parse(j.responseText);
		    callback(data);
			clearInterval(waiting);
		}
	},100)
}


$(document).ready(function() {
  	checkPage();
});
window.onpopstate = function(event) {
	checkPage();
};
