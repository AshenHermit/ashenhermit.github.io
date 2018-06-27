memeses = memeses.reverse();

var _delay = 0.1;

function createTag(name,url,delay,tSize) {

	$('#sideBar').append('<div class="listLine" style="transition-delay: '+_delay+'s, 0s, 0s;"><div class="listLine-d" style="font-size: '+tSize+'px;" id="text"><span>'+name+'</span></div></div>');
	_delay+=0.05;
	//$(elem).css('transition-delay', delay+'s');
	//img/icons/STICKER ICO.png
}
createTag(
	"все",
	["пошел","пошёл","иди","на","нахуй","нахер","нахрен","хуй",""],
	30);

createTag(
	"пошел нахуй",
	["пошел","пошёл","иди","на","нахуй","нахер","нахрен","хуй",""],
	30);

createTag(
	"сложна",
	["сложна","сложно","надо","не","нинад","нахер",""],
	30);

createTag(
	"грусна",
	["сложна","сложно","надо","не","нинад","нахер",""],
	30);

createTag(
	"поясни",
	["поясни","всм","всмысле","всмычле","как","нахрен",""],
	30);

createTag(
	"ржомба",
	["смишно","очень","смешно","бля","ржомба",""],
	30);

createTag(
	"чо бля?",
	["че","чо","шо","бля","а",""],
	30);

createTag(
	"охуенно!",
	["охуенно","заебись","отлично","хорошо","ура",""],
	30);

createTag(
	"опятьдрочить",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"подозрительно",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"triggered",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"поздравляю",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"suicide",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"ебать",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"уважаемо",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"секс",
	["опять","дрочить","секс","красиво","жара",""],
	30);

createTag(
	"разное",
	["опять","дрочить","секс","красиво","жара",""],
	30);



// createProject("ssticker","img/icons/STICKER ICO.png","",0.3);
// createProject("sticker","img/icons/STICKER ICO.png","",0.4);

var sideBar = false;
var info = false;

function destroy(elem) {
	$(elem).removeAttr("style");
};

function refresh_UI() {
	if (sideBar) {
		$('#sideBar').css('left', '0px');
		$('.listLine').css('left', '0px');

		$('#mainBody').css('left', '53%');
		$('body').css('background-position-x', '16px');
	}else{
		$('#sideBar').css('left', '-258px');
		$('.listLine').css('left', '-267px');
		$('#mainBody').css('left', '50%');
		$('body').css('background-position-x', '0px');
	};
};

function turnSideBar() {
	if (!sideBar) {
		sideBar = true;
		refresh_UI();

	}else{
		sideBar = false;
		refresh_UI();
	};
};

$('body').on('mousedown', '#searchButton', function(e) {
	e.preventDefault();
	showSearchResult();
});


function showSearchResult(){
	var num = 0;
	var text = $('#searchText').val();
	$('.memeCont').html('');
	$('#title').html('memeserv - нихера не найдено');
	var massive = [];
for(var i = 0; i<memeses.length;i++){
		for(var s = 0; s<memeses[i].search.length;s++){
			if(text.includes(memeses[i].search[w])){
				massive[num] = i;
			};
		};
		num+=1;
};

if(massive!=[]){
	$('#title').html('memeserv - чет отрыл');
for(var m = 0; m<massive.length;m++){
	try{
		$('.memeCont').append('<div class="meme"><a target="_blank" href="'+memeses[massive[m]].src+'"><img id="memeImg" src="'+memeses[massive[m]].src+'"></a></div>');
	}catch(error){
		
	};
};
}else{
		$('#title').html('memeserv - нихера не найдено');
	};
};


$('body').on('mousedown', '.listLine', function(e) {
	e.preventDefault();
	// for (var i = 0; i < $('.memeCont').ht; i++) {
	// 	$('.memeCont')[i].
	// }
	$('.memeCont').html('');
	console.log(e);

	if ($(e.target).find('span').html()=="все" || $(e.target).parent().find('span').html()=="все") {
		for (var i = 0; i < memeses.length; i++) {
			if (memeses[i].src!="") {
				$('.memeCont').append('<div class="meme"><a target="_blank" href="'+memeses[i].src+'"><img id="memeImg" src="'+memeses[i].src+'"></a></div>');
				$('#title').html('memeserv - все');
			};
		};
	}else{
		for (var i = 0; i < memeses.length; i++) {

			if (memeses[i].tag == $(e.target).find('span').html() || memeses[i].tag == $(e.target).parent().find('span').html() && memeses[i].src!="") {
				$('.memeCont').append('<div class="meme"><a target="_blank" href="'+memeses[i].src+'"><img id="memeImg" src="'+memeses[i].src+'"></a></div>');
				$('#title').html('memeserv - '+memeses[i].tag);
			};
		};
	};
});


$('body').on('mousedown', '*[data-url="projects"]', function(e) {
	e.preventDefault();
	$(this).css('transform', 'scale(0.9)');

	setTimeout(destroy($(this)), 500);


	// $(this).removeAttr("style");

	if (!sideBar) {
		sideBar = true;
		$('.searchText').removeAttr('autofocus');
		refresh_UI();

	}else{
		sideBar = false;
		refresh_UI();
	};
});

$('body').on('mousedown', '*[data-url="info"]', function(e) {
	e.preventDefault();
	$(this).css('transform', 'scale(0.9)');

	setTimeout(destroy($(this)), 500);


	// $(this).removeAttr("style");
	if (!info) {
		$('#sideBar').css('left', '-258px');
		$('.listLine').css('left', '-267px');
		$('#mainBody').css('left', '50%');
		$('body').css('background-position-x', '0px');
		$('#mainBody').css('top', '-54%');
		info = true;
	}else{
		$('body').css('background-position-y', '0px');
		$('#mainBody').css('top', '0%');
		info = false;
		refresh_UI();
	};
});





$('#title').css('top', '0px');

$('#page-image').css('margin-top', '0px');
$('.page-scrn').css('bottom', '0px');
$('#right-align').css('height', '405px');
$('#backButton').css('left', '0px');

//8px

function update() {
	var y = window.scrollY;
	$('body').css('background-position-y', y+'px');
};
