var Enemy = new Phaser.Class({
 
        Extends: Phaser.Physics.Arcade.Sprite,
 
        initialize:
 
        function Enemy (scene)
        {
            Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'enemy_1');
            
            this.hp = 3
            this.dmg = 0.1
            this.type = 1
            this.speed = 30
        },
        create: function(x, y, type){
            this.type = type
            this.play('enemy_'+this.type)
            var size = Math.max(this.frame.cutWidth, this.frame.cutHeight)
            this.setSize(size, size, true)
        	this.dmg = 0.3
        	this.speed = 120
        	if( type==0 ) this.hp=1
            if( type==1 ) {
            	this.hp=4
                this.speed = 60
                this.dmg = 0.5
            }
            if( type==2 ) {
            	this.hp=16
                this.speed = 30
                this.dmg = 0.8
            }
            if( type==3 ) {
                this.hp=2
                this.speed = 180
                this.dmg = 0.9
            }
            
        	this.setPosition(x, y)

            this.setActive(true)
            this.setVisible(true)
            this.setScale(globalScale)
       },
        receiveDamage: function(damage, ctx) {
            this.hp -= damage;           
            
            // if hp drops below 0 we deactivate this enemy
            if(this.hp <= 0) {
            	ctx.sound.play("explosion_"+(Math.round(Math.random()*2)+1), {volume:0.6})
                var particles = ctx.add.particles('enemy_particle');

    var pe = particles.createEmitter({
        x: this.x,
        y: this.y,
        speed: {min: 10, max: 300},
        accelerationY: -500,
        lifespan: 1000,
        scale: {start: globalScale+5, end: 0}
    })
pe.explode(23, this.x, this.y)
ctx.time.delayedCall(5000, function() {
    particles.destroy();
});
                ctx.cameras.main.shakeEffect.start(1000/4, 0.015)
                this.setActive(false);
                this.setVisible(false);
                enemySpawnTime+=0.15
                boxTime/=1.00
                score+=(this.type+1)
                scoreEl.innerHTML = score
                
                this.destroy()
                addBox()
                lightness+=4
            }else{
            	ctx.sound.play("hit_"+(Math.round(Math.random()*2)+1))
           }
        },
        
        update: function (time, delta)
        {
            this.rotation = Math.atan2(
            bunny.y-this.y,
            bunny.x-this.x
            )
            if(this.rotation>Math.PI/2 || this.rotation<-Math.PI/2) this.flipY = true;
            else this.flipY = false
            
            this.setVelocity(
            this.body.velocity.x/2+Math.cos(this.rotation)*this.speed,
            this.body.velocity.y/2+Math.sin(this.rotation)*this.speed
            )
        }
});

function damageEnemy(enemy, bullet) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);    
        
        var particles = this.add.particles('enemy_particle');

    particles.createEmitter({
        x: bullet.x,
        y: bullet.y,
        speed: {min: 10, max: 400},
        accelerationY: 0,
        lifespan: 500,
        scale: {start: globalScale+2, end: 0}
    }).explode(6, bullet.x, bullet.y)
    
    this.time.delayedCall(3000, function() {
        particles.destroy();
    });
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(bullet.dmg, this);
        bullet.destroy()
    }
}