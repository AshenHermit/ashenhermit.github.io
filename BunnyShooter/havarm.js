var havarm = {};
var FirstRun = true;

havarm.log = function(log, title="log"){}
try{
if (!app.FolderExists("/sdcard/Havarm")) {
	app.MakeFolder("/sdcard/Havarm")
	//app.WriteFile("/sdcard/Havarm/bunny-save.log", "{}");
}
FirstRun = true;
if( app.FileExists( "/sdcard/Havarm/bunny-log.log" ) )
FirstRun = false

app.WriteFile("/sdcard/Havarm/bunny-log.log", "");

havarm.log = function(log, title="log"){
	if(typeof log == "object") log = JSON.stringify(log);
	
	let content = app.ReadFile("/sdcard/Havarm/bunny-log.log");
	content += title.toUpperCase()+": "+log+"\n\n";
	//app.WriteFile("/sdcard/Havarm/bunny-log.log", content);
}
}catch(err){}



var ctx
var dlgChar = 0
var dlgTime = 0
var curDlg = ""
var curTxt = 0
var dlgTxtEnd = false
var dlgCallback;
var dlgTimeCount = 3
var dlgEl = document.getElementById('dialogue')
function startDialogue(name, callback){
	dlgCallback = callback
	bunny.isTalking = true
	
	dlgEl.style.opacity = 1
	dlgEl.style.top = "0%"
	dlgEl.innerHTML = ""
	
	dlgTime = 0
	
	curTxt = 0
	curDlg = name
	dlgTime = 6
	dlgChar = 0
	dlgTxtEnd = false
}
function nextDialogueText(){
	if( curDlg!=null ){
		if(dialogues[curDlg]!=undefined && dialogues[curDlg][curTxt+1]!=undefined){
			bunny.isTalking = true
			dlgEl.innerHTML = ""
			dlgChar = 0
			dlgTime = 4
			curTxt++
			dlgTxtEnd = false
		}else{
			dlgEl.style.opacity = 0
			dlgEl.style.top = "-50%"
			if(dlgCallback!=undefined) dlgCallback()
			curDlg = null
		}
	}
}
function updateDialogue(ctx){
	if(dlgTime>dlgTimeCount){
		dlgTime = 0
		if(curDlg != null && dlgChar<dialogues[curDlg][curTxt].length){
			dlgEl.innerHTML+=dialogues[curDlg][curTxt].charAt(dlgChar)
			
			if( dialogues[curDlg][curTxt].charAt(dlgChar)!="." )
talkSynth.triggerAttackRelease(talkNotes.rand(), 0.002)

			ctx.cameras.main.shakeEffect.start(1000/4, 0.005)
			if(dialogues[curDlg][curTxt].charAt(dlgChar)==","){
				dlgTime = -10
				bunny.talkCount = -7
				bunny.mouth = false
			}
			if(dialogues[curDlg][curTxt].charAt(dlgChar)=="." || dialogues[curDlg][curTxt].charAt(dlgChar)=="!"){
				dlgTime = -14
				bunny.talkCount = -10
				bunny.mouth = false
			}
			dlgChar++
		}else{
			bunny.isTalking = false
			bunny.setTexture('bunny')
			dlgTxtEnd = true
		}
	}
	dlgTime++
}

Array.prototype.rand = function(){
	return this[Math.floor(Math.random()*this.length)]
}




function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}