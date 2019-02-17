var html = document.getElementsByTagName('html')[0];

var goodsJson = '[ { "name": "чифирчик по-домашнему от дяди Паштета ", "price": "32", "imgUrl": "https://pp.userapi.com/c850432/v850432816/1a6c3/B88Wjoowvlo.jpg", "date": "08.10.2018" }, { "name": "супир вкусная падливка деда", "price": "99.999", "imgUrl": "https://pp.userapi.com/c840530/v840530451/12a1c/vciQqZh91cc.jpg", "date": "14.10.2018" }, { "name": "пездец, бесплатно", "price": "1001", "imgUrl": "https://sun1-11.userapi.com/c543103/v543103656/3c4f1/Siuq6vQdFCU.jpg", "date": "09.11.2018" }, { "name": "личный охранник", "description": "служил", "price": "228", "imgUrl": "https://pp.userapi.com/c849336/v849336916/86062/Wt-1Ok7v68g.jpg", "date": "09.05.2018" }, { "name": "бюджетный обед", "description": "завтрак и ужин", "price": "69", "imgUrl": "https://pp.userapi.com/c636421/v636421273/4fcf0/zve9cPUrNpQ.jpg", "date": "24.09.2018" }, { "name": "подозрительный кабачок", "price": "-3", "imgUrl": "https://pp.userapi.com/c852220/v852220176/1b7a1/lsgWxvzm5RU.jpg", "date": "08.10.2018" }, { "name": "шакаладная доска \\"юличка\\"", "description": "не пытайтесь выебать", "price": "9.9.9", "imgUrl": "https://pp.userapi.com/c834201/v834201906/e31f4/MOviRDOtOww.jpg", "date": "08.10.2018" }, { "name": "♥♥♥ первый альбом молодой группы \\"фаршмак\\" ♥♥♥", "price": "228.9", "imgUrl": "https://pp.userapi.com/c621513/v621513998/79255/vvTl4_noyyM.jpg", "date": "01.56.2018" }, { "name": "♥♥♥ ВТОРОЙ долгожданный альбом всемирно известной группы \\"фаршмак\\" ♥♥♥", "price": "1337.9", "imgUrl": "https://pp.userapi.com/c850436/v850436176/1c522/0W7eARY3rA0.jpg", "date": "02.56.2018" }, { "name": "заказное убийство", "description": "гуфнем вас в подарок", "price": "2", "imgUrl": "https://pp.userapi.com/c840636/v840636523/65bb4/Y5N2JcUzgkE.jpg", "date": "013.08.2007" }, { "name": "соберем краденый пк", "description": "можете не проверять, пашет как миленький", "price": "51", "imgUrl": "https://pp.userapi.com/c824503/v824503643/d698e/PcU17DVIBAg.jpg", "date": "1101.10101.2004" }, { "name": "идеальный шмот для вашей личинки 👌", "price": "1234", "imgUrl": "https://pp.userapi.com/c841134/v841134240/7a2fa/OHIsKwXZ9vA.jpg", "date": "031.02.2007" }, { "name": "журнал \\"как заработать на покупке и продаже криптовалюты\\"", "price": "0", "imgUrl": "https://pp.userapi.com/c824411/v824411074/dce89/k003M1zYLUA.jpg", "date": "0999.015.2010" }, { "name": "балтика семерка по вене дед весь в пене", "price": "19", "imgUrl": "https://pp.userapi.com/c844720/v844720699/db41b/jujVffXYIQc.jpg", "date": "07.07.2007" }, { "name": "чуть больше чем абсолютно надежный замок", "price": "81.0", "imgUrl": "https://pp.userapi.com/c852128/v852128714/1c496/4vwJh4tR8RU.jpg", "date": "13.00.200007" }, { "name": "тетрать по матеше с петерками", "price": "97", "imgUrl": "https://pp.userapi.com/c852128/v852128227/1d4dd/HiFXcUqk24o.jpg", "date": "03.04.2019" }, { "name": "", "price": "", "imgUrl": "https://pp.userapi.com/c834401/v834401976/14a9c1/xfii7eFRCBE.jpg", "date": "00.00.00000" }, { "name": "пропитаная балдежом кукурузная палочка для фантазий ;3", "price": "1", "imgUrl": "https://pp.userapi.com/c852232/v852232176/1b80b/jdtLb47vkyM.jpg", "date": "03.04.2019" }, { "name": "пляжные лапти-скороходы", "description": "если залить кипяток, буит с подогревом", "price": "6", "imgUrl": "https://pp.userapi.com/c845523/v845523112/11bd05/4AVS1QIdnK8.jpg", "date": "12.031.201" }, { "name": "официальный диплом об окончании физико технического института", "description": "магистратура", "price": "9282573", "imgUrl": "https://pp.userapi.com/c845418/v845418101/121b60/1XO7d8DHEHk.jpg", "date": "031.02.2007" } ]';
var picturesJson = '[ { "name": "\\"полуночный зверь\\"", "description":"И.Е. Репин", "imgUrl":"https://pp.userapi.com/c845421/v845421089/1a9e9a/24x-z9aY6KM.jpg" }, { "name": "\\"ветренный пик\\"", "description":"Берси Медовая Рука", "imgUrl":"https://pp.userapi.com/c850032/v850032017/132a5e/HGwACF2MFq4.jpg" } ]';

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
			loadJsonPictures(picturesJson);
			break;
		case "#shop":
			elements[2].className+=" active";
			document.getElementById('mainTitle').innerHTML="Магаз";
			document.getElementById('mainSubTitle').innerHTML="отвественность за последствия от покупок вы несете сами";
			html.style.setProperty("--main-text-color","#ff9e6f");
			document.getElementsByClassName('bg')[0].style.backgroundImage="url(img/shopBg.jpeg)";
			loadJsonGoods(goodsJson);
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
	}
	wow = new WOW({
      boxClass: 'wow', // default
      animateClass: 'animated', // default
      offset: 0, // default
      mobile: true, // default
      live: true // default
    })
    wow.init();
}


function loadJsonGoods(json) {
	var j = $.getJSON("json/goods.json");
	var waiting = setInterval(function(){
		if(j.readyState>3){
			let goods = JSON.parse(j.responseText);
 
		    goods.forEach(function(item) {
		    	document.getElementsByClassName('content')[0].innerHTML+=
				'<div class="wow animated fast flex-center fadeInUp shopItem">'+ ((item.name!=undefined) ? '<h2 class="flex-center animated fadeInDown mb-8 white-text shopItemName">'+item.name+'</h2>' : "") +((item.description!=undefined) ? '<h6 class="flex-center animated fadeInDown mb-8 white-text text-muted" style="color: rgba(255, 255, 255, 0.5) !important;">'+item.description+'</h6>' : "")+((item.price!=undefined) ? '<div class="d-flex flex-row shopItemBuyBlock"><h5 class="flex-center animated fadeInDown mb-8 white-text text-muted shopItemPrice">'+item.price+'<span style="text-decoration: line-through;">щ</span></h5><div class="animated fadeInDown waves-effect waves-light black-text shopItemButton">заказать</div></div>' : "")+'<img class="shopItemImg" alt="'+ ((item.name!=undefined) ? item.name : "параша какая т")+'" src="'+item.imgUrl+'"></img>'+((item.date!=undefined) ? '<h6 class=" animated fadeInDown mb-8 white-text text-muted shopItemDate">'+item.date+'</h6>' : "")+'</div>'
			});
			clearInterval(waiting);
		}
	},100);
}
function loadJsonPictures(json) {
	var j = $.getJSON("json/goods.json");
	var waiting = setInterval(function(){
		if(j.readyState>3){
			let goods = JSON.parse(j.responseText);
 
		    goods.forEach(function(item) {
		    document.getElementsByClassName('content')[0].innerHTML+=
				'<div class="wow animated fast flex-center fadeInUp pictureItem">'+'<img alt="'+ ((item.name!=undefined) ? item.name : "параша какая т")+'" style="height: 100%;width: auto;" class="shopItemImg" src="'+item.imgUrl+'"></img>'+ ((item.name!=undefined) ? '<h2 class="flex-center animated fadeInDown mb-8 white-text shopItemName ">'+item.name+'</h2>' : "") +((item.description!=undefined) ? '<h6 class="flex-center animated fadeInDown mb-8 white-text text-muted" style="color: rgba(255, 255, 255, 0.5) !important;">'+item.description+'</h6>' : "")+((item.price!=undefined) ? '<div class="d-flex flex-row shopItemBuyBlock"><h5 class="flex-center animated fadeInDown mb-8 white-text text-muted shopItemPrice">'+item.price+'<span style="text-decoration: line-through;">щ</span></h5><div class="animated fadeInDown waves-effect waves-light black-text shopItemButton">заказать</div></div>' : "")+((item.date!=undefined) ? '<h6 class=" animated fadeInDown mb-8 white-text text-muted shopItemDate">'+item.date+'</h6>' : "")+'</div>'
			});
			clearInterval(waiting);
		}
	},100);
}


$(document).ready(function() {
  	checkPage();
});
window.onpopstate = function(event) {
	checkPage();
  	//location.reload();
  	// checkPage();
};
