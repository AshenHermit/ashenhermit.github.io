var menuState = false;
var targetX=0, targetY=0;

function checkPage(){
	let hash = window.location.hash;
	if(hash=='' && window.location.href.indexOf(".html")==-1) $('.content').html("");
	if(hash=='#home'){
		checkLink("#");
		$('.contact').css('display', 'block');
		$('.content').html(`
			<div id="center-element" style="position: initial;padding: 3em;max-width: 393px;">
				/////////////////////////<br><br>
				Драсте,<br>
				Я *<<"evoil">>*, мне 15.<br>
				Я не надеюсь на случай и не верю в уют жизни,
				так как это слишком пустые утешения и трата времени,
				которого у человека и так нет.<br>
				Стараюсь развиваться как можно интенсивнее с надеждой когда-нибудь
				создать по истине стоющую вещь как минимум для моих родных...<br>
				<br>
				Этот сайт всего лишь свалка моих проектов и интересных статей.
				<br>
				<br>
				<span style="color: #fff;">Ремесла которых я придерживаюсь:</span><br>
				кодинг, радиоэлектроника, музычка, геймдев, моделирование, графический / ux / звуко дизайн.<br><br>
				/////////////////////////
			</div>
		`)
	}else{
		$('.contact').css('display', 'none');
	}
	if(hash=='#articles'){
		checkLink("#articles");
		loadArticles();
	}
}


window.onpopstate = function(){
	checkPage();
}

function toggleMenuState(){
	menuState = !menuState;
	if(menuState)
		$('.menu-bar').css('transform', 'scaleY(1)');
	else
		$('.menu-bar').css('transform', 'scaleY(0)');
}
function checkLink(href) {
	$('.menu-line').removeClass('checked').removeClass('clickable');
	$('.menu-line').each(function(index) {
		if($(this).parent().attr('href')==href) $(this).addClass('checked').addClass('clickable');
	});
}

function loadArticles(){
	getJson('pages/articles.json', function(articles){
		articles.forEach(function(article){
			$('.content').append(`
			<a href="`+article.url+`"><div class="list-element underline clickable left-underline">
				<div class="list-name">`+article.name+`</div>
			</div></a>
			`)
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
	},100);
}


$(document).ready(function() {
	if(window.location.href.indexOf("#")==-1) window.location.href = window.location.href+"#";
	checkPage();	


	if(window.location.href.indexOf("index")==-1){
		let html = document.getElementsByClassName('content')[0].innerHTML
		// .replace(/\n/gim,"<br>")
		// .replace(/\t/gim,"&nbsp;&nbsp;&nbsp;&nbsp;")
		// .replace(/  /gim,"&#8194;")
		.replace(/\/\*/gim,'<span style="background-color: #ffffff38;color: #e6e6e6;padding: 10px;padding-top: 0px;padding-bottom: 1px;">')
		.replace(/\*\//gim,'</span>')

		.replace(/\/\^/gim,'<span style="font-style: italic;">')
		.replace(/\^\//gim,'</span>')

		.replace(/\/-/gim,'<span style="text-decoration: line-through;opacity: 0.5;">')
		.replace(/-\//gim,'</span>')

		.replace(/\/!/gim,'<h2>')
		.replace(/!\//gim,'</h2>')

		// .replace(new RegExp("\n", flags?),'<pre class="script"><code class="javascript">')
		.replace(/\n\/\[s\]\n/gim,'<pre class="script"><code class="javascript">')
		.replace(/\n\[s\]\/\n/gim,'</code></pre>')
		document.getElementsByClassName('content')[0].innerHTML = html;


		var z = "";
		for (var i = 0; i < Math.floor(Math.random()*666); i++) {
			z+=String.fromCharCode(Math.floor(Math.random()*65534));
		}
		$('.content').append(z);
		$('a').not('#nl').addClass('link').attr('target', '_blank');
		hljs.initHighlighting();
	}
});

$('.menu-line').on('click', function(event) {
	toggleMenuState();
});

document.addEventListener('mousemove', function(e){
	targetX = e.pageX/Math.min(window.innerHeight,window.innerWidth)*40;
	targetY = e.pageY/Math.min(window.innerHeight,window.innerWidth)*40;
});

setInterval(function(){
	let x = parseFloat($('body').css('background-position-x'));
	let y = parseFloat($('body').css('background-position-y'));

	$('body').css({
		backgroundPositionX: x+(targetX-x)/10,
		backgroundPositionY: y+(targetY-y)/10
	});
},1000/60);
