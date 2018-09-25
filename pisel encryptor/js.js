var transText = "";
var initText = "";
var data = [];
var canvas = document.getElementById('cText');
var ctx = canvas.getContext('2d');
var file = document.getElementById('load');


$('body').on('mousedown',"#translateButton", function (e) {
	e.preventDefault();
	initText = $('#jsText').val();
	translate();
});

$('body').on('mousedown',"#updateImage", function (e) {
	e.preventDefault();
	canvasLoadImage();
});

$('body').on('mousedown',"#translateBackButton", function (e) {
	e.preventDefault();
	translateBack();
});

document.addEventListener('keydown', function(e) {
	if (e.code=="Enter" && !$('#jsText').is(':focus') && !$('#cText').is(':focus')) {
		translate();
	console.log(e);
	}
});

function translate() {
	var line = $('#line').val();
	line = parseInt(line);
	ctx.clearRect(0,line,1920,1);
	for (var char = 0; char < initText.length; char++) {
		ctx.fillStyle = "rgb(255, 255, "+initText.charAt(char).charCodeAt()+")";

		ctx.fillRect(char,line,1,1);
	}
}
function translateBack() {
	var line = $('#line').val();
	line = parseInt(line);
	transText = "";
	for (var pix = 0; pix < getLineLength(); pix++) {
		data = ctx.getImageData(pix,line,1,1).data;
		var hsl = data;
		transText += String.fromCharCode(hsl[2]);
	}
	$('#jsText').val(transText);
}




function getLineLength() {
	var line = $('#line').val();
	line = parseInt(line);
	var xPos = 0;
	data = ctx.getImageData(xPos,line,1,1).data;
	while(data[0]!=0&&data[1]!=0&&data[2]!=0){
		xPos++;
		data = ctx.getImageData(xPos,line,1,1).data;
	}
	return xPos;
}

function canvasLoadImage() {
	var curFiles = file.files;

	var mapImg = new Image();
	mapImg.src = window.URL.createObjectURL(curFiles[0]);
	console.log(curFiles[0]);

	ctx.drawImage(mapImg,0,0);
}
//file.addEventListener('change', canvasLoadImage);


function rgb2hsl(rgbArr){
    var r1 = rgbArr[0] / 255;
    var g1 = rgbArr[1] / 255;
    var b1 = rgbArr[2] / 255;
 
    var maxColor = Math.max(r1,g1,b1);
    var minColor = Math.min(r1,g1,b1);
    //Calculate L:
    var L = (maxColor + minColor) / 2 ;
    var S = 0;
    var H = 0;
    if(maxColor != minColor){
        //Calculate S:
        if(L < 0.5){
            S = (maxColor - minColor) / (maxColor + minColor);
        }else{
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if(r1 == maxColor){
            H = (g1-b1) / (maxColor - minColor);
        }else if(g1 == maxColor){
            H = 2.0 + (b1 - r1) / (maxColor - minColor);
        }else{
            H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
    }
 
    L = L * 100;
    S = S * 100;
    H = H * 60;
    if(H<0){
        H += 360;
    }
    var result = [H, S, L];
    return result;
}
