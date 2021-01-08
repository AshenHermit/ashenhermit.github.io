var Bullet = new Phaser.Class({
 
    Extends: Phaser.Physics.Arcade.Image,
 
    initialize:
 
    function Bullet (scene)
    {
        Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet_0');
 
        this.dx = 0;
        this.dy = 0;
        this.lifespan = 0;
        
        this.dmg = 1
 
        this.speed = 800
    },
 
    fire: function (x, y, angle)
    {
        this.setActive(true);
        this.setVisible(true);
        this.setDrag(1000)
       
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        
        this.setVelocity(this.dx*this.speed, this.dy*this.speed)
 
        this.lifespan = 450;
        this.dmg = 1
        
        if( bunny.buffs["bullet2"] ){
        	this.lifespan = 1000*10
            this.dmg = 4
            this.setTexture("bullet_1")
            this.speed = 400
        }else{
       	    this.setTexture("bullet_0")
            this.speed = 800
        }
        var size = Math.max(this.frame.cutWidth, this.frame.cutHeight)
        this.setPosition(x+this.dx*size, y+this.dy*size);
        this.setSize(size, size, true)
        // this.setOrigin(0.1, 0.5)
        this.rotation = angle
        this.setScale(globalScale)
        this.setVelocity(this.dx*this.speed, this.dy*this.speed)
    },
 
    update: function (time, delta)
    {
        this.lifespan -= delta;
 
        //this.x += this.dx * (this.speed * delta);
        //this.y += this.dy * (this.speed * delta);
 
        if (this.lifespan <= 0)
        {
            //this.setActive(false);
            //this.setVisible(false);
            this.destroy()
        }
    }
 
});