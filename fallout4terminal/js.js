var wordLength = 8;
var attempts = 4;
var accesed = false; 
var enteredPass = "";

updateAttempts();

var sym = [
	"{",
	"[",
	"]",
	"}",
	"'",
	"/",
	"%",
	"&",
	"@",
	";",
	"."
]

var sogl = [
	"s",
	"d",
	"r",
	"t",
	"p",
	"c",
	"k",
	"n",
	"x",
	"w"
];
var glas = [
	"a",
	"e",
	"u",
	"o",
	"i"
];

var words = [];

update();

var password = words[Math.round(Math.random()*(words.length-1))];




function Generate() {
	var newWord="";
	var gen = Math.round(Math.random());
	var soglCount=0;
	var glasCount=0; 
	for (var i = 0; i < wordLength; i++) {
		if (gen==0) {
			if (soglCount>=2) {
				newWord = newWord+glas[Math.round(Math.random()*(glas.length-1))];
				glasCount++;
				soglCount = 0;
			}else{
				newWord = newWord+sogl[Math.round(Math.random()*(sogl.length-1))];
				soglCount++;
			}
		}else if(gen==1){
			if (glasCount>=2) {
				newWord = newWord+sogl[Math.round(Math.random()*(sogl.length-1))];
				soglCount++;
				glasCount = 0;
			}else{
				newWord = newWord+glas[Math.round(Math.random()*(glas.length-1))];
				glasCount++;
			}
		}	
	}

	return newWord;
}



$('body').on('mousedown', '#word', function(e) {//обработчик клика по слову
	e.preventDefault();
	
	enteredPass = $(e.target).html();
	check($(e.target).html());
});

function updateAttempts() {
	$('#attempts').html("remaining attempts:");
	for (var a = 0; a < attempts; a++) {
		$('#attempts').html($('#attempts').html()+"#");
	}
}
function updateInfo(initText) {
	$('#info').append('<br>> '+enteredPass);
	$('#info').append("<br>> "+getLetterCount(password,initText)+" /"+wordLength+" is true");
	$('#info').append('<br>');
}

function getLetterCount(compText,initText) {
	var count = 0;
	var countExtends = [];

	for (var i = 0; i < initText.length; i++) {
		thisLoop:
		for (var c = 0; c < compText.length; c++) {
			if (initText.charAt(i)==compText.charAt(c)) {
				console.log(initText);
				//i++;
				countExtends[count]=i;
				count++;
				break thisLoop;
			}
		}
	}

	return count;
}


function check(entered) {
	if (attempts>0 && !accesed) {
		updateInfo(entered);
	  	attempts-=1;

	  	updateAttempts();

		if (entered==password) {
			$('#info').css('color', '#dfffa0');
			$('#info').html('accesed');
			accesed = true;
		}

		if (attempts<=0&&!accesed) {
	  		$('#info').append('<br>> terminal blocked');
	  		$('body').css('background-color', '#520e0e');
	  	}

	}else if (!accesed){
		$('#info').append('<br>> terminal blocked');
	}
}

function symbolGen(length) {
	var text = "";
	for (var i = 0; i < length; i++) {
		text = text+sym[Math.round(Math.random()*(sym.length-1))];
	}

	return text;
}

function hexGen() {
	var text = "0xf";

	for (var g = 0; g < 3; g++) {
		var gen = Math.round(Math.random()*16);
		if (gen<10) {
			text = text+gen;
		}else{
			switch (gen){
				case 10:
					text = text+"a";
					break;
				case 11:
					text = text+"b";
					break;
				case 12:
					text = text+"c";
					break;
				case 13:
					text = text+"d";
					break;
				case 14:
					text = text+"e";
					break;
				case 15:
					text = text+"f";
					break;
			}
		}
	}
	text = text+" ";

	return text;
}

function update() {
	words = [];
	$('#info').html('');

	for (var e = 0; e < 8; e++) {
		words[e] = Generate();
	}

	$('.line').remove();

	for (var w = 0; w < words.length-1; w++) {
	var gen = Math.round(Math.random());
		if (gen==0) {
			$('body').append('<div class="line">'+hexGen()+symbolGen(Math.round(Math.random()*24))+'<span id="word">'+words[w]+'</span>'+symbolGen(Math.round(Math.random()*24))+'</div>');
		}else if(gen==1){
			$('body').append('<div class="line">'+hexGen()+symbolGen(Math.round(Math.random()*48))+'</div>');
			w--;
		}
	}
}