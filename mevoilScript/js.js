window.onload = function() {
	var context = new AudioContext();
	context.resume();
	Tone.start();

	if(location.href.indexOf("?script=")!=-1){
		editor.setValue(location.href.substring(location.href.indexOf("?script=")+"?script=".length)
			.replace(/%-1/g,"\t")
			.replace(/%-2/g,"\n")
			.replace(/%-3/g,'{')
			.replace(/%-4/g,'}')
			.replace(/%-5/g,'"')
			.replace(/%20/g," "));
	}else
	if(location.href.indexOf("?base64script=")!=-1){
		editor.setValue(window.atob(location.href.substring(location.href.indexOf("?base64script=")+"?base64script=".length)));
	}
}

Tone.context.lookAhead = 1;
Tone.Master.volume.value = -8;

var drumInstPreload = new Tone.Sampler({
			"D1" : "samples/kick.wav",
			"D2" : "samples/snare.wav",
			"D3" : "samples/hat.wav",
			"D4" : "samples/ride.wav"
		},function(){})


/////////////
//core

var carret = 0;
var config = {instruments:{}};


function stop() {
	Tone.Transport.stop();
	Tone.Transport.cancel();
	drumInstPreload.disconnect();
	// Tone.context.close();
	// Tone.context = new AudioContext();
}
function run(){
	$(".ev-loading").removeClass('anim');
	setTimeout(function(){
		$(".ev-loading").addClass('anim');
	},100);

	stop();
	let scriptText = editor.getValue();
	scriptText+="\n";
	init(scriptText);
	play();

	history.pushState({}, "Mevoil Script", location.href.substring(0,location.href.indexOf("?base64script="))+"?base64script="+window.btoa(editor.getValue()));
}

function init(st){
	carret = 0;
	config = {
		bpm:120,
		npb:8,
		noteLines:{},
		instruments:{},
		patterns:{},
		play:{}
	}



	let array = [];

	let tic = 0;

	while(carret<st.length){
		let line = st.substring(carret,st.indexOf("\n",carret));

		if(st.charAt(carret)=="#") carret = st.indexOf("\n",carret)+1;
		if(line.trim()=="") carret = st.indexOf("\n",carret)+1;

		//functions
		if(st.charAt(carret)=="/") {
			carret+=1;

			//bpm
			if(st.indexOf("bpm",carret)==carret) init_BPM(st);
			//npb
			if(st.indexOf("npb",carret)==carret) init_NPB(st);
			//note line
			if(st.indexOf("nl",carret)==carret) init_NL(st);
			//instrument
			if(st.indexOf("inst",carret)==carret) init_INST(st);
			//effect
			if(st.indexOf("eff",carret)==carret) init_EFF(st);
			//instrument
			if(st.indexOf("ptrn",carret)==carret) init_PTRN(st);
			//instrument
			if(st.indexOf("play",carret)==carret) init_PLAY(st);

		}


		tic++;
		if(tic>=9999) break;
	}

	let stack = [];
}

//////////////////////

//bpm
var init_BPM = function(st) {
	config.bpm = +st.substring(st.indexOf(" ",carret),st.indexOf("\n",carret));
	moveCarret(1,st);
}
//npb
var init_NPB = function(st) {
	config.npb = +st.substring(st.indexOf(" ",carret),st.indexOf("\n",carret));
	moveCarret(1,st);
}
//note line
var init_NL = function(st) {
	let obj = {name:"",notes:{}};
	obj.name = st.substring(st.indexOf(" ",carret),st.indexOf("\n",carret)).trim();

	let line = st.substring(st.indexOf("\n",carret)+1,st.indexOf("\n",st.indexOf("\n",carret)+1));
	line = line.replace(new RegExp('"','g'),'')
	line.split(',').forEach(function(el){
		//key/note
		let kn = el.split(':');
		obj.notes[kn[0]] = kn[1];
	});
	moveCarret(2,st);

	config.noteLines[obj.name] = obj.notes;
}
//instrument
var init_INST = function(st) {
	let comm = st.substring(carret+1,st.indexOf("\n",carret)).split(" ");
	let inst = {type:comm[2].trim(),
				envelope:{
						attack:0.01,
						decay:0.1,
						sustain:0.5,
						release:1
				}};
	//
	inst.volume = new Tone.Volume().toMaster();
	inst.reverb = new Tone.Freeverb(0).connect(inst.volume);inst.reverb.wet = 0.2;
	inst.filter = new Tone.Filter(0, "highpass").connect(inst.reverb);
	inst.distortion = new Tone.Distortion(0).connect(inst.filter);
	//
	if(comm[2].trim()=="8bit") {
		inst.tone = new Tone.PolySynth({envelope: inst.envelope});
		inst.synth = inst.tone.connect(inst.filter);
	}
	if(comm[2].trim()=="drum") {
		inst.tone = drumInstPreload;
		inst.synth = inst.tone.connect(inst.filter);
	}

	//
	config.instruments[comm[1].trim()] = inst;
	moveCarret(1,st);
}
//eff
var init_EFF = function(st) {
	let comm = st.substring(carret+1,st.indexOf("\n",carret)).split(" ");

	if(comm[2].trim()=="reverb")
		config.instruments[comm[1].trim()].reverb.set({roomSize: +comm[3].trim()});
	if(comm[2].trim()=="reverbWet")
		config.instruments[comm[1].trim()].reverb.wet.value = +comm[3].trim();

	if(comm[2].trim()=="volume")
		config.instruments[comm[1].trim()].volume.set({volume: +comm[3].trim()});


	if(comm[2].trim()=="osc"){
		config.instruments[comm[1].trim()].tone.set({oscillator:{type:comm[3].trim()}});
	}
	if(comm[2].trim()=="release"){
		config.instruments[comm[1].trim()].tone.set({envelope:{release: +comm[3].trim()}});
	}
	if(comm[2].trim()=="attack"){
		config.instruments[comm[1].trim()].tone.set({envelope:{attack: +comm[3].trim()}});
	}


	if(comm[2].trim()=="lowpass"){
		config.instruments[comm[1].trim()].filter.set({type:"lowpass", frequency: +comm[3].trim()});
	}
	if(comm[2].trim()=="highpass"){
		config.instruments[comm[1].trim()].filter.set({type:"highpass", frequency: +comm[3].trim()});
	}
	if(comm[2].trim()=="filterRolloff"){
		config.instruments[comm[1].trim()].filter.set({rolloff: +comm[3].trim()});
	}

	if(comm[2].trim()=="distortion"){
		let inst = config.instruments[comm[1].trim()];
		inst.synth = inst.tone.connect(inst.distortion);
		config.instruments[comm[1].trim()].distortion.set({distortion: +comm[3].trim()});
	}

	moveCarret(1,st);
}
//pattern
var init_PTRN = function(st) {
	let comm = st.substring(carret+1,st.indexOf("\n",carret)).split(" ");
	let inner = st.substring(st.indexOf("{",carret)+1,st.indexOf("}",carret));
	let obj = {instruments:[]};
	let name = comm[1].trim();
	obj.nl   = comm[2].trim().replace("{","");

	inner.split("\n").forEach(function(line){
		if(line.trim()!="" && line.trim().charAt(0)!="#"){
			let lineComm = line.split(":");
			let instPat = {};
			instPat.inst = lineComm[0].trim();
			instPat.sheet= lineComm[1].trim().split('');
			obj.instruments.push(instPat);
		}
	});

	config.patterns[name] = obj;
	setCarretAfterBracket(st);
}
//play
var init_PLAY = function(st) {
	let inner = st.substring(st.indexOf("{",carret)+1,st.indexOf("}",carret));
	let array = [];

	inner.split("\n").forEach(function(line){
		line = line.trim();
		console.log(line);
		if(line!="" && line.charAt(0)!="#"){
			let rowArray = [];
			line.replace(new RegExp(" ", "g"),"").split("][").forEach(function(col){
				col = col.replace("[","").replace("]","").trim();
				rowArray.push(col);
			});
			array.push(rowArray);
		}
	});

	config.play = array;
	setCarretAfterBracket(st);
}
///////////////////////////
var play = function() {
	var currentCol = 0;
	var currentNote = 0;

	Tone.Transport.bpm.value = config.bpm;
	Tone.Transport.scheduleRepeat(function(time){
		config.play[currentCol].forEach(function(pat){
			config.patterns[pat].instruments.forEach(function(inst){
				let note = inst.sheet[currentNote];
				if(note!="-"){
					if(note=="?") {
						let rand = Math.floor(Math.random()*Object.keys(config.noteLines[config.patterns[pat].nl]).length);
						note = Object.keys(config.noteLines[config.patterns[pat].nl])[rand];
					}
					note = config.noteLines[config.patterns[pat].nl][note]
					if(config.instruments[inst.inst].type=="drum") config.instruments[inst.inst].synth.triggerAttackRelease(note);
					else config.instruments[inst.inst].synth.triggerAttackRelease(note,0.1);
				}
			});
		});
		currentNote++;

		if (currentNote>=config.npb) {
			currentCol++;
			currentNote=0;
		}
		if(currentCol>=config.play.length) currentCol=0;
	}, "8n");
	Tone.Transport.start();
}
///////////////////////////




function moveCarret(lines,st){
	for(var i=0;i<lines;i++) carret = st.indexOf("\n",carret)+1;
}
function setCarretAfterBracket(st){
	carret = st.indexOf("\n",st.indexOf("}",carret))+1;
}
