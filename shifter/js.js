var transText = "";

$('body').on('mousedown',"#translateButton", function (e) {
	e.preventDefault();
	translate();
});

document.addEventListener('keydown', function(e) {
	if (e.code=="Enter" && !$('#jsText').is(':focus') && !$('#cText').is(':focus')) {
		translate();
	console.log(e);
	}
});

function translate() {
	var transText = "";
	var charText = $('#jsText').val();
	var shift = parseInt($('#shift').val());
	for(var ch = 0; ch<charText.length;ch++){
		transText = transText+String.fromCharCode(charText.charCodeAt(ch)+shift);
	}
	$('#cText').val(transText);
}