var projects = [];

function createProject(name,image,url,delay) {
	this.name = name;
	this.url = url;
	this.delay = delay;
	this.image = image;

	$('#sideBar').append('<div class="listLine" style="transition-delay: '+delay+'s;"><a href="'+url+'"><img id="icon" src="'+image+'"><div id="text"><span>'+name+'</span></div></a></div>');
	//$(elem).css('transition-delay', delay+'s');
	//img/icons/STICKER ICO.png
}

createProject("sticker","img/icons/STICKER ICO.png","",0.1);
createProject("sticker","img/icons/STICKER ICO.png","",0.2);
createProject("sticker","img/icons/STICKER ICO.png","",0.3);
createProject("sticker","img/icons/STICKER ICO.png","",0.4);

var sideBar = false;
var info = false;

function destroy(elem) {
	$(elem).removeAttr("style");
}

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
	}
}

$('body').on('mousedown', '*[data-url="projects"]', function(e) {
	e.preventDefault();
	$(this).css('transform', 'scale(0.9)');

	setTimeout(destroy($(this)), 500);


	// $(this).removeAttr("style");

	if (!sideBar) {
		sideBar = true;
		refresh_UI();

	}else{
		sideBar = false;
		refresh_UI();
	}
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
		$('body').css('background-position-y', '-40px');
		$('#mainBody').css('top', '-54%');
		info = true;
	}else{
		$('body').css('background-position-y', '0px');
		$('#mainBody').css('top', '0%');
		info = false;
		refresh_UI();
	}
});



