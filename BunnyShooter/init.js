try{
    app.SetScreenMode("Game");
}catch(err){
    window.app = {}
    app.GetScreenWidth  = ()=>{return window.innerWidth*2}
    app.GetScreenHeight = ()=>{return window.innerHeight*2}
}

//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");


function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

var isMobile = detectmob()

var screenDivision = 1;
var globalZoom = 0.8;

function winResize (){
	//canvas.width = window.innerWidth/screenDivision;
	//canvas.height = window.innerHeight/screenDivision;
}

var config = {
    type: Phaser.WEBGL,
    width: app.GetScreenWidth()/2,
    height:  app.GetScreenHeight()/2,
    zoom: 1,
    transparent:true,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug:true,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game
setTimeout(()=>{game = new Phaser.Game(config);}, 500);