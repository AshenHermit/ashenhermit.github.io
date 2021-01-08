var cookie = {
	music: true,
};
function saveCookie(){
	document.cookie = JSON.stringify(cookie)
}
function loadCookie(){
	cookie = JSON.parse(document.cookie)
	document.getElementById('note').style.opacity = 0.1;
}

var buffs = [
{name: "double", time:90*14, chance:0.95},
{name: "triple", time:90*10, chance:0.78},
{name: "speed1", time:90*10, chance:0.64},
{name: "speed2", time:90*2, chance:0.3},
{name: "bullet2", time:90*3, chance:0.24},
{name: "forward", time:90*5, chance:0.3},
{name: "sidegun", time:90*5, chance:0.13},
{name: "bomb", time:90*0, chance:0.13}
]

//tone
//Tone.context.latencyHint = 'playback'
var talkSynth = new Tone.PolySynth().toMaster()
talkSynth.set({
	oscillator:{
		type: "sawtooth100"
	},
	envelope:{
		release: 0.5
	}
})

var talkNotes = "D4/F#4/G4/B4".split("/")

//phaser
var grayscalePipeline

var lightness = 29

var readyToStart = false;
var maxHp = 100
var hp = 100
var enemySpawnCount = 0
var enemySpawnTime = 40
var boxCount = 0
var boxTime = 180
var globalScale = 5
var bullets
var enemies
var boxes

var score = 0
var scoreEl = document.getElementById("score")
var ost
var bunny;
var isPlaying = false;

var dialogues = {
	start:[
	"дарова",
	// "штош, поздавляю тебя с днюхой! в этом году ты была харошей девочкой!1!",
	// "я тоори, кралек-шаман, король дней рождений послал меня к тебе и попросил быть твоим фамильяром...",
	// "я единственный в своем роде, я умею взаимодействовать с патосом нашего мироздания... (со злом)",
	// "...........",
	// "я уже ощущаю ИХ",
	// "не осознавая этого, ты принимаешь на себя все ИХ деяния",
	// "ОНИ готовы приносить неприятности снова и свова, пока от НИХ не избавишься",
	// "к сожалению я слишком слаб для управления своей оболочкой в патосе, что не скажешь о тебе",
	// "давай попробуем ИМ помешать причинять тебе страдания...",
	// "я отвяжу от себя оболочку и зачарую на тебя, а ты постарайся мешать им как можно дольше...",
	"просто тыкни в экран и веди в нужном направлении, как джойстик, еще старайся собирать улучшения",
	"поехали"

	],
	start2:[
	"дарова",
	"тоори к вашим услугам"
	],
	end:[
	"я устал, разбуди снова когда захочешь"
	]
}

function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet && isPlaying)
    {
        bullet.fire(x, y, angle);
    }
}
function getRandPlace(){
	let angle = Math.random()*(Math.PI*2)
	let dist = Math.max(window.innerWidth, window.innerHeight)*1.1
	let x = Math.cos(angle)*dist+bunny.x
	let y = Math.sin(angle)*dist+bunny.y
	return {x:x, y:y}
}
function addEnemy(){
	var enemy = enemies.get();
	if(enemy){
		let pos = getRandPlace()
		let rand = Math.random()
		let type = 0
		if( rand<=0.05 ) type = 3
		else if( rand<=0.1 ) type = 2
		else if( rand<=0.6 ) type = 1
		
		enemy.create(pos.x, pos.y, type)
	}
}
function addBox(){
	let rand = Math.floor(Math.random()*buffs.length)
	if( Math.random()<=buffs[rand].chance ){
		let pos = getRandPlace()
		let box = boxes.get()
		box.create(pos.x, pos.y, rand)
	}
}
function damageBunny(player, enemy){
	hp-=enemy.dmg
	
if( hp<=0 ){
	if(isPlaying){
    isPlaying = false;
//ctx.cameras.main.stopFollow();
		ost.stop()
		enemies.children.each(function(enemy) {
	    	enemy.receiveDamage(999, this)
	  	}, this);
        //bunny.setVelocityY(-1000)
        //bunny.setGravity(5000);
        bunny.setTexture('bunny')
        bunny.rotation = 0
        bunny.setDepth(9999)
        dlgTimeCount = 2
        //bunny.setCollideWorldBounds(true);
        this.cameras.main.shakeEffect.start(1000/2, 0.1)

        startDialogue("end", (function(){
        	this.cameras.main.stopFollow();
        	bunny.setGravityY(-5000);
        }).bind(this))
}
        
        }
}

    function preload (){
    	this.grayscalePipeline = this.game.renderer.addPipeline('Grayscale', new GrayscalePipeline(this.game));
    	this.grayscalePipeline.setFloat1('strength', 1)
    	this.grayscalePipeline.setFloat2('resolution', app.GetScreenWidth()/2, app.GetScreenHeight()/2)
    	// this.grayscalePipeline.setFloat1('strength', 1)
    	this.cameras.main.setRenderToTexture(this.grayscalePipeline);
    
    
        //this.load.setBaseURL('http://labs.phaser.io');

        //this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('bunny', 'sprites/bunny.png');
        this.load.image('bunny_t', 'sprites/bunny_t.png');
        this.load.image('bunny_act', 'sprites/bunny_act.png');
        this.load.image('bunny_act_fire', 'sprites/bunny_act_fire.png');
        
        this.load.image('bullet_0', 'sprites/bullet_0.png');
        this.load.image('bullet_1', 'sprites/bullet_1.png');
        
        this.load.image('enemy_particle', 'sprites/particle.png');
        
        for(var i=0; i<=7; i++)
        this.load.image('box_'+i, 'sprites/box_'+i+'.png');
        
        
        this.load.spritesheet('enemy_0', 'sprites/enemy_0.png', {frameWidth:11, frameHeight:7});
        this.load.spritesheet('enemy_1', 'sprites/enemy_1.png', {frameWidth:16, frameHeight:16});
        this.load.spritesheet('enemy_2', 'sprites/enemy_2.png', {frameWidth:24, frameHeight:21});
        this.load.spritesheet('enemy_3', 'sprites/enemy_3.png', {frameWidth:32, frameHeight:16});
        
        this.load.audio('ost', 'ost.mp3');
        
        this.load.audio('explosion_1', 'sounds/explosion_1.ogg');
        this.load.audio('explosion_2', 'sounds/explosion_2.ogg');
        this.load.audio('explosion_3', 'sounds/explosion_3.ogg');
        
        this.load.audio('hit_1', 'sounds/hit_1.ogg');
        this.load.audio('hit_2', 'sounds/hit_2.ogg');
        this.load.audio('hit_3', 'sounds/hit_3.ogg');
        
        this.load.audio('shoot', 'sounds/shoot.mp3');
       
        //this.load.image('red', 'assets/particles/red.png');
    }

    function create ()
    {
    	try {
        	loadCookie();
			document.getElementById('note').style.opacity = (cookie.music) ? 0.8 : 0.1
	    } catch (e) {
	        saveCookie();
	    }

    	this.anims.create({
    	    key: 'enemy_0',
            frames: this.anims.generateFrameNumbers('enemy_0'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
    	    key: 'enemy_1',
            frames: this.anims.generateFrameNumbers('enemy_1'),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
    	    key: 'enemy_2',
            frames: this.anims.generateFrameNumbers('enemy_2'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
    	    key: 'enemy_3',
            frames: this.anims.generateFrameNumbers('enemy_3'),
            frameRate: 10,
            repeat: -1
        });
    
    
    	document.getElementById("loading").style.opacity = 0;
    	initControls()
        //this.add.image(400, 300, 'sky');
        

        bunny = this.physics.add.image(app.GetScreenWidth()/2/2/globalZoom, 0, 'bunny');
    
        bunny.setScale(globalScale)
        bunny.setBounce(0.5, 0.5);
        bunny.setCollideWorldBounds(true);
        bunny.setFriction(10,10)
        bunny.setGravityY(5000)
        
        bunny.talkCount = 0
        bunny.fireCount = 0
        bunny.mouth = false
        bunny.isTalking = false
        bunny.setDrag(1500)
        bunny.buffs = {}

        //emitter.startFollow(logo);
      
        setTimeout((function(){
        	startDialogue(FirstRun ? "start" : "start2", (function(){
	        	readyToStart = true
	            scoreEl.style.opacity = 0.5
			    bunny.setVelocityY(-window.innerHeight*2)
			    bunny.setGravity(0);
			    bunny.setTexture('bunny_act')
			    this.sound.play('shoot')
			    bunny.setCollideWorldBounds(false);
        	}).bind(this))
        }).bind(this), 2000)
        //this.cameras.main.shake()
        
        bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
        boxes = this.physics.add.group({ classType: Box, runChildUpdate: false });

        this.physics.add.overlap(enemies, bullets, damageEnemy.bind(this));
        this.physics.add.overlap(bunny, enemies, damageBunny.bind(this), null, this);
        this.physics.add.overlap(bunny, boxes, collectBox.bind(this), null, this);

        this.cameras.main.zoom = globalZoom
        this.cameras.main.setSize(app.GetScreenWidth()/2/globalZoom, app.GetScreenHeight()/2/globalZoom)

        this.physics.world.bounds.y = 0;
		this.physics.world.bounds.height = app.GetScreenHeight()/2/globalZoom/0.89;

        //window.mainCam = this.cameras.main;
        //window.mainPhys = this.physics;
    }
//create
//////////////////
    
    
    
//update
function update(){
	try{updateGamepad();}catch(err){}
	if( pressing && isPlaying ){
		let speed = 10
		if( bunny.buffs["speed1"] ) speed=5
		if( bunny.buffs["speed2"] ) speed=2
		if( bunny.fireCount>speed ){
			bunny.fireCount = 0
			let speed = 400
			bunny.setVelocity(
			Math.cos(bunny.rotation-Math.PI/2)*speed,
			Math.sin(bunny.rotation-Math.PI/2)*speed
			)
			//this.cameras.main.shakeEffect.start(1000/5, 0.01)
			//buff check
			let angle = bunny.rotation+Math.PI/2
			if( bunny.buffs["sidegun"] ){
				addBullet(bunny.x, bunny.y, angle+Math.PI/2)
				addBullet(bunny.x, bunny.y, angle+Math.PI/2-0.22)
				addBullet(bunny.x, bunny.y, angle-Math.PI/2)
				addBullet(bunny.x, bunny.y, angle-Math.PI/2+0.22)
			}else
			if( bunny.buffs["forward"] ){
				addBullet(bunny.x, bunny.y, angle)
				angle+=Math.PI
				addBullet(bunny.x, bunny.y, angle+Math.PI/10)
				addBullet(bunny.x, bunny.y, angle-Math.PI/10)
			}else
			if( bunny.buffs["triple"] ){
				addBullet(bunny.x, bunny.y, angle+Math.PI/10)
				addBullet(bunny.x, bunny.y, angle)
				addBullet(bunny.x, bunny.y, angle-Math.PI/10)
			}else
			if( bunny.buffs["double"] ){
				addBullet(bunny.x, bunny.y, angle+Math.PI/14)
				addBullet(bunny.x, bunny.y, angle-Math.PI/14)
			}else{
				addBullet(bunny.x, bunny.y, angle)
			}
			
			
			this.sound.play('shoot')
			bunny.setTexture('bunny_act_fire')
			setTimeout((function(){
				bunny.setTexture('bunny_act')
			}).bind(this),1000/8)
		}
		bunny.fireCount++
	}
	if( bunny.isTalking ){
		if(bunny.talkCount>6){
			bunny.talkCount = 0
			bunny.mouth = !bunny.mouth
		}
		
		if( bunny.mouth ) bunny.setTexture('bunny_t')
		else bunny.setTexture('bunny')
		bunny.talkCount++;
		updateDialogue(this)
	}
	if(readyToStart){
		if(bunny.y<=app.GetScreenHeight()/2/2/globalZoom){
			readyToStart = false;
			isPlaying = true;
			this.cameras.main.startFollow(bunny);
			ost = this.sound.add('ost', {loop: true, volume:0.8})
            ost.play()
            if(!cookie.music) ost.pause()
		}
	}
	
	if(isPlaying){
		if( boxCount > boxTime ){
			boxCount = 0
			//addBox()
		}
		boxCount++
		
		Object.keys(bunny.buffs).forEach(function(key){
			bunny.buffs[key]-=1
			if( bunny.buffs[key] <= 0 )
			delete bunny.buffs[key]
		})
		
		if( enemySpawnCount>enemySpawnTime ){
			enemySpawnCount = 0
			addEnemy()
			enemySpawnTime/=1.014
			
		}
		
		hp+=0.05
		if(hp<0) hp = 0
		if(hp>maxHp) hp = maxHp
		this.grayscalePipeline.setFloat1('strength', (maxHp-hp)/10)
		this.cameras.main.shakeEffect.start(1000/4, 0.001*((maxHp-hp)/6)-0.001)
		enemySpawnCount++

		lightness-=(lightness-29)/10

		var rgb = hslToRgb( 287/360, 12/100, lightness/100 )

		// document.getElementsByTagName('canvas')[0].style.backgroundColor = "rgba("+rgb[0]+", "+rgb[1]+", "+rgb[2]+", 1)"
		document.getElementsByTagName('canvas')[0].style.backgroundColor = "hsla(287, 12%, "+lightness+"%, 1)"
		//if(bunny.body.velocity.x>200) bunny.flipX= false;
		//if(bunny.body.velocity.x<-200) bunny.flipX= true;
	}
}