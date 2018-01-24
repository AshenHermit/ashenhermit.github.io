var r = $('#r').val()

var ras = "";


var glas = [
	"а",
	"э",
	"о",
	"у",
	"ы",
	"я",
	"е",
	"ё",
	"ю"
];

upg=[
	"атор",
	"оид",
	"айзер",
	"ель",
	"акт",
	"ария",
	"ера",
	"ер",
	"ометрия",
	"ия",
	"ебра",
	"едра",
	"тир",
	"олог",
	"орга",
	"окль",
	"ина",
	"ология",
	"онат",
	"опод"
	
];

vesh=[
	"онит",
	"ий",
	"ид",
	"орид",
	"од",
	"оний",
	"онат",
	"идий",
	"он",
	"ол",
	"итиол",
	"алий"
	
];

sogl =[
	"ц",
	"к",
	"н",
	"г",
	"ш",
	"щ",
	"з",
	"х",
	"ф",
	"в",
	"п",
	"р",
	"л",
	"д",
	"ж",
	"ч",
	"с",
	"м",
	"т",
	"б"
];
var sogl_e = [
	"q",
	"w",
	"r",
	"t",
	"y",
	"p",
	"s",
	"d",
	"f",
	"g",
	"h",
	"j",
	"k",
	"l",
	"z",
	"x",
	"c",
	"v",
	"b",
	"n",
	"m"
	
];

var nik1 = [
	"i",
	"ay",
	"er",
	"u",
	"es",
	"ab",
	"ed",
	"erk",
	"o"
];
var nik2 = [
	"er",
	"eld",
	"ix",
	"ex",
	"od",
	"iv",
	"erd",
	"ox",
	"ord",
	"ucker",
	"uckord"

];

var sym = [
	"Ʃ",
	"Թ",
	"Ն",
	"Ø",
	"Œ",
	"Ƣ",
	"Ǣ",
	"ϖ",
	"Ϯ",
	"Ϋ",
	"ʭ",
	"Ɋ",
	"Ֆ",
	"ʄ",
	"Ⱦ",
	"Ʉ",
	"Ƹ",
	"Ǧ",
	"Ǩ",
	"Ǎ",
	"ƛ",
	"Ħ",
	"Ä",
	"Ď"

];

dop  = 1;
text = "";

function gen (b) {
	
if (!$('#ch-3').prop('checked') && !$('#ch-4').prop('checked') && !$('#ch-7').prop('checked')) {
		
	if (Math.round(Math.random())==1) {text=text+sogl[Math.round(Math.random()*(sogl.length-1))]+glas[Math.round(Math.random()*(glas.length-1))]+sogl[Math.round(Math.random()*(sogl.length-1))];};
	if (Math.round(Math.random())==0) {text=text+sogl[Math.round(Math.random()*(glas.length-1))]+glas[Math.round(Math.random()*(glas.length-1))]+sogl[Math.round(Math.random()*(sogl.length-1))];};
	for (b-=1; b > 0; b-=1) {

		
		
			if (b) {
				
				if (dop>0) {
					if (Math.round(Math.random())==1) {
						text=text+sogl[Math.round(Math.random()*(sogl.length-1))]+glas[Math.round(Math.random()*(glas.length-1))];
						dop-=1;

 					};
				}else{
					text=text+glas[Math.round(Math.random()*(glas.length-1))]+sogl[Math.round(Math.random()*(sogl.length-1))];
					console.log();
				};
			};
		};
	if (b == 0 ) {
		if ($('#ch').prop('checked')) {text=text+upg[Math.round(Math.random()*(upg.length-1))]};
		if ($('#ch-2').prop('checked')) {text=text+vesh[Math.round(Math.random()*(vesh.length-1))]};
		
		$('#text').html(text);
		text = "";
	};
}
if ($('#ch-3').prop('checked') && !$('#ch-4').prop('checked')) {
		
	if (Math.round(Math.random()*2)==0) {text=text+"рын"}else if(Math.round(Math.random()*2)==1){text=text+"выкыр"}else{text=text+"врын"}
	for (b-=1; b > 0; b-=1) {

		if (Math.round(Math.random()*3)==0) {text=text+"дын"}
		if (Math.round(Math.random()*3)==1) {text=text+"гын"}
		if (Math.round(Math.random()*3)==2) {text=text+"бдын"}
		if (Math.round(Math.random()*3)==3) {text=text+"бгдын"}

	
};



if (b == 0 ) {
		
		
		$('#text').html(text);
		text = "";
	};
};

if ($('#ch-4').prop('checked') && !$('#ch-3').prop('checked')) {
		
	
	for (b-=1; b > 0; b-=1) {

		if (Math.round(Math.random())==0) {text=text+"0"}
		if (Math.round(Math.random())==1) {text=text+"1"}

	
};
if (b == 0 ) {
		
		
		$('#text').html(text);
		text = "";
	};
}








if ($('#ch-5').prop('checked') && !$('#ch-3').prop('checked') && !$('#ch-4').prop('checked')) {
		var r = $('#r').val();
		
		ras = r;
		
	
	for (var ra=r.length; ra > 0; ra-=1) {
		
		var ran = ras.charAt( Math.round(Math.random()*(ras.length-1)));
		
		text=text+ran;
		var re = new RegExp(ran, 'gi');
		console.log(ras);

		ras=ras.replace(re, '');
		if (Math.round(Math.random())==0) {}
		

	
};

		
		
		$('#text').html(text);
		text = "";
	
};
		


if ($('#ch-6').prop('checked')) {
		var r = $('#r').val();
		
		ras = r;
		
	
	//for (b-=1; b > 0; b-=1) {
	
		text=text+sogl_e[Math.round(Math.random()*(sogl_e.length-1))];
		text=text+nik1[Math.round(Math.random()*(nik1.length-1))];
		text=text+sogl_e[Math.round(Math.random()*(sogl_e.length-1))];
		text=text+nik2[Math.round(Math.random()*(nik2.length-1))];
//};

		
		
		$('#text').html(text);
		text = "";
	
};


if ($('#ch-7').prop('checked') ) {
		
	
	for (b-=0; b > 0; b-=1) {

		text=text+sym[Math.round(Math.random()*(sym.length-1))];

	
};
if (b == 0 ) {
		
		
		$('#text').html(text);
		text = "";
	};
};
		
		


//new here
///////////////////////


};
		













$(document).on('mousedown', '.knop', function(e) {
	e.preventDefault();
	gen ($('#b').val());
	console.log($('#ch-7').prop('checked'));
	$('#b').blur();
	$('#r').blur();
});






function rasd (b){
	var rast = $("text").html();
	for(var rad = 0;rast.charAt(rad*7);rad+=1){
}}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////















// if ($('#ch-4').prop('checked') && !$('#ch-3').prop('checked')) {
		
	
// 	for (b-=1; b > 0; b-=1) {

// 		for (var dvo=1; dvo < 7; dvo+=1) {
			

// 			if (Math.round(Math.random())==0) {text+="0"}
// 			if (Math.round(Math.random())==1) {text+="1"}

				

// };
// if (text.charAt(7*b) != undefined ) {
// 					var re2 = new RegExp(text.charAt(7*b), 'gi');
// 					text=text.replace(re2, text.charAt(7*b)+' ');;
// 				};
	
// };

// if (b == 0 ) {
		
		
// 		$('#text').html(text);
// 		text = "";
// 	};
// };
    