var $window = $(window);
var $canvas = $("#canvas");
var canvas  = $canvas[0];
var context = canvas.getContext('2d');
var target  = {x:0.0, y:0.0};
var mouse   = {x:0.0, y:0.0};
var chain   = null;

var dots    = [];

/* IK Segment */

var IKSegment = function( size, head, tail ) {
    
    this.size = size;
    this.head = head || {x:0.0, y:0.0};
    this.tail = tail || {
        x:this.head.x + size,
        y:this.head.y + size
    };
    
    this.update = function() {
        
      // Position derivitives
      var dx = this.head.x - this.tail.x;  
      var dy = this.head.y - this.tail.y;
      
      var dist = Math.sqrt(dx*dx + dy*dy);
      var force = 0.5 - this.size / dist * 0.5;
      var strength = 0.998; // No springiness
      
      force *= 0.99;
      
      var fx = force * dx;
      var fy = force * dy;
      
      this.tail.x += fx * strength * 2.0;
      this.tail.y += fy * strength * 2.0;
      this.head.x -= fx * (1.0-strength) * 2.0;
      this.head.y -= fy * (1.0-strength) * 2.0;
    };
};

/* IK Chain */

var IKChain = function( size, interval ) {
    
    this.links = new Array(size);
    
    this.update = function( target ) {
        
        var link = this.links[0];
        
        link.head.x = target.x;
        link.head.y = target.y;
        
        for(var i = 0, n = this.links.length; i < n; ++i) {
            link = this.links[i];
            link.update();
        }
    };
    
    var point = {x:0, y:0};
    
    for(var i = 0, n = this.links.length; i < n; ++i) {
        link = this.links[i] = new IKSegment(interval,point);
        link.head.x = Math.random() * 500;
        link.head.y = Math.random() * 500;
        link.tail.x = Math.random() * 500;
        link.tail.y = Math.random() * 500;
        point = link.tail;
    }
};

/* Test */

function circle(ctx,x,y,r,c) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    if(c) {
        ctx.fillStyle = c;
        ctx.fill();
    } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.stroke();
    }
}

function line(ctx,x1,y1,x2,y2) {
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.stroke();
}

function update() {
    
    // Ease target towards mouse
    target.x += (mouse.x - target.x) * 0.3;
    target.y += (mouse.y - target.y) * 0.3;
    
    // Update IK chain
    chain.update( target );
}

function draw() {
    
    canvas.width = canvas.width;
    
    circle(context, mouse.x, mouse.y, 5, 'rgba(255,255,255,0.1)');
    circle(context, target.x, target.y, 5, 'rgba(255,255,255,0.1)');
    
    var link = chain.links[0];
    var p1 = link.head, p2 = link.tail;
  
    //context.beginPath();
  	context.moveTo(p1.x, p1.y);
		context.strokeStyle = '#fff';
		context.lineWidth = 15;
  context.lineJoin = 'round';
  context.lineCap = 'round';
    
    for(var i = 0, n = chain.links.length; i < n; ++i) {
        context.beginPath();
        context.strokeStyle = 'hsl('+(360/chain.links.length)*i+',100%,75%)'
        link = chain.links[i];
        p1 = link.head;
        p2 = link.tail;
      	context.lineTo(p1.x, p1.y);
				context.lineTo(p2.x, p2.y);
        context.stroke();
    }
    //context.stroke();
}

function resize() {
    canvas.width = $window.width();
    canvas.height = $window.height();
}

function init() {
    
    chain = new IKChain( 250, 2 );
    
    setInterval(function(){
        update();
        draw();
        for(var d; d<=dots.lenght-1; d++){
          dots[d].update();
        }
    }, 1000/40);
    
    resize();
}

$canvas.mousemove(function(e){
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});

$window.resize(resize);

/* Init */

init();



var dot = (x,y,lenght) => {
  this.pos = {x:x,y:y};
  this.lenght = lenght;
  
  this.update = () => {
    circle(context, this.pos.x, this.pos.y, this.lenght, 'rgba(255,255,255,0.1)');
  }
}





