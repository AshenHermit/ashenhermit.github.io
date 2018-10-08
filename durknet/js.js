function buttonUpd() {
	$("#enter").css('marginLeft', -parseInt($("#enter").css('width'))/2);
	$("#enter").css('marginTop', -parseInt($("#enter").css('height'))/2);
	$("#enter").css('fontSize', (200/960)*parseInt($("#enter").css('width')));
}
$(window).resize(function(event) {
	buttonUpd();
});

$(document).ready(function() {
	buttonUpd();
});