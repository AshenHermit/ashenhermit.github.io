$(document).ready(function() {
	var uiObj = {
		"#1": "#space",

		"ClearSteps": "clear steps",
		"ClearTileChance": "clear tile chance",
		"#2": "#space",

		"SimulationSteps": "simulation steps",
		"DefChance": "default chance (nbs>0 && dnbs<3 && nbs+dnbs<3)",
		"ConnectionChance": "connection chance (nbs==1 && dnbs<3)",
		"NonDiagConnectionChance": "non diagonal connection chance (nbs>0 && dnbs==0)",
		"BinConnectionChance": "binary connection chance (nbs==2 && dnbs==4)"
	}

	Object.keys(uiObj).forEach(function(key){
		if(uiObj[key]!="#space"){
			console.log('#'+uiObj[key]);
			$("#par").append('<div id="input">'+uiObj[key]+': <input type="number" id="'+key+'Input" name="'+key+'" value="'+window[key]+'"></div>')

			$('#'+key+'Input')
			.change(function(e) {
				let val = $(this).val();
				if ( val!="" ) val = parseFloat(val);
				else val = 0;
				window[key] = val;
			});
		}else{
			$("#par").append('<div id="input" style="height: 30px;"></div>')
		}
	});
});