var Box = new Phaser.Class({
 
    Extends: Phaser.Physics.Arcade.Image,
 
    initialize:
 
    function Bullet (scene)
    {
        Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'box_0');
 
       this.type = 0
       this.name = "double"
    },
 
    create: function (x, y, type)
    {
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y)
        this.type = type
        this.setTexture('box_'+type)
        var size = Math.max(this.frame.cutWidth, this.frame.cutHeight)
        this.setSize(size, size, true)
        this.rotation = Math.random()*2-1
        this.setScale(globalScale)
        this.name = buffs[type].name
        
        setTimeout((function(){
        	//if(Phaser.Math.Distance.Between(this.x, this.y, bunny.x, bunny.y) > window.innerHeight){
        	this.setActive(false)
            this.setVisible(false)
            this.destroy()
            //}
       }).bind(this), 1000*180)
    },
 
    update: function (time, delta)
    {
        
    }
 
});


function collectBox(player, box){
	if( box.active ){
		bunny.buffs[box.name] = buffs[box.type].time
		let name = box.name
		havarm.log(bunny.buffs)
		box.setActive(false)
		box.setVisible(false)
		talkSynth.triggerAttackRelease(talkNotes.rand(), 0.002)
        
        if (box.name=="bomb") {
            enemies.children.each(function(enemy){
                if(Phaser.Math.Distance.Between(enemy.x,enemy.y, bunny.x,bunny.y)<=1000)
                    if(Math.random()<0.6)
                        enemy.receiveDamage(999, this)
            }, this);
        }

		box.destroy()
	}
}

