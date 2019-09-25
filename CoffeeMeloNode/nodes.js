function MeloNode(){
	this.id = lastId;
	this.title = title;

	this.canvas = document.createElement('CANVAS');
	this.canvas.id = "nodeCanvas_"+this.id;
	this.ctx = this.canvas.getContext('2d');


	this.content = '<canvas id="nodeCanvas_'+this.id+'">';

	this.visible = true;
	this.inputNodeIds = inputNodeIds;
	this.inputOutput = null;
	this.outputs = [];
	this.isComment = isComment;

	this.Update = function(){
		
	}

	this.GetValues = function(){
		
	}

}