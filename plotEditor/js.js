var selectedElement;
var pos = {x:0,y:0};

var middleDown = false;
var fileName = "NodeMap";

var curveStart = {x:0,y:0};
var curve;
var selectedOut;
var curveInt = 128;

var lastId=0;

var nodes = [];

/**
* addNode
*/
function addNode(){
	addLoadNode("node name","content",[],{x:0,y:32});
}
function addComment(){
	addLoadNode("","comment",[],{x:0,y:32},true);
}
function addLoadNode(title,content,inputNodeIds,pos,isComment=false){
	if(!isComment) $("body").append(getDOM_node(title,content,lastId));
	else $("body").append(getDOM_comment(content,lastId));

	$(!isComment ? ".window-container":".comment").last().css({
		left: pos.x,
		top: pos.y
	});
	nodes.push({
		id:lastId,
		title:title,
		content:content,

		visible:true,
		inputNodeIds: inputNodeIds,
		inputOutput: null,
		outputs: [],
		isComment: isComment,

		dom: $(!isComment ? ".window-container":".comment").last()
	});

	lastId++;
}
function addOutputToNode(id,name,outNode=null){
	$(nodes[id].dom).children('.outputs').eq(0).children('.add-output').before(getDOM_output(name,nodes[id].outputs.length));
	nodes[id].outputs.push({
		dom: $(nodes[id].dom).children('.outputs').eq(0).children('.output-line').last(),
		name:name,
		curve:null,
		outputNodeId: outNode
	});
}
function removeOutputFromNode(id,nodeId){
	try{
		let nodeInputs = nodes[nodes[nodeId].outputs[id].outputNodeId].inputNodeIds;
		nodeInputs.splice(nodeInputs.indexOf(id),1)
	}
	catch(err){}
	$(nodes[nodeId].outputs[id].curve).remove();
	nodes[nodeId].outputs.splice(id,1);
	$(nodes[nodeId].dom).children('.outputs').eq(0).children('.output-line').eq(id).remove();
	for (var i = 0; i < nodes[nodeId].outputs.length; i++) {
		$(nodes[nodeId].outputs[i].dom).attr('data-id', i);
	}
	updateNodeCurves(nodeId);
}

function removeNode(id){

}

function updateNode(id){

}

$(document).on('dblclick','.content',function(e) {
	let nodeId = parseInt($(e.target).parent().parent().attr('data-id'));
	let promptOut = sNodePrompt("Node", nodes[nodeId].title, nodes[nodeId].content).then(function(out){
		nodes[nodeId].title = out[0];
		nodes[nodeId].content = out[1];

		$(nodes[nodeId].dom).children(".window").children(".title").html(nodes[nodeId].title);
		$(nodes[nodeId].dom).children(".window").children(".content").html(nodes[nodeId].content);

		if(nodes[nodeId].inputNodeIds.length!=0) nodes[nodeId].inputNodeIds.forEach(function(id){updateNodeCurves(id);});
		updateNodeCurves(nodeId);
	})

});
$(document).on('dblclick','.output-line-text',function(e) {
	let nodeId = getOutBoxNodeId(e.target);
	let outId = getOutBoxId(e.target);

	let promptOut = sPrompt("Output name", nodes[nodeId].outputs[outId].name).then(function(name){
		nodes[nodeId].outputs[outId].name=name;
		$(nodes[nodeId].outputs[outId].dom).children(".output-line-text").html(nodes[nodeId].outputs[outId].name);
	})
});
$(document).on('dblclick','.title',function(e) {
	let nodeId = parseInt($(e.target).parent().parent().attr('data-id'));

	sAsk("Delete this", "Sure?", "yeah", function(){
		for (var i = 0; i < nodes[nodeId].outputs.length; i++) {
			removeOutputFromNode(i,nodeId)
		}
		$(nodes[nodeId].dom).remove();
		nodes[nodeId]=undefined;
	});

});
$(document).on('dblclick','.comment',function(e) {
	let nodeId = parseInt($(e.target).attr('data-id'));

	let promptOut = sCommentPrompt("Comment text", nodes[nodeId].content).then(function(text){
		nodes[nodeId].content=text;
		$(nodes[nodeId].dom).children("#comment-content").html(text);
	});
});
$(document).on('click','.comment-delete-button',function(e) {
	let nodeId = parseInt($(e.target).parent().attr('data-id'));

	$(nodes[nodeId].dom).remove();
	nodes[nodeId]=null;
});

$(document).on('mousedown', '.add-output', function(e) {
	if(e.button==0){
		sPrompt("New output name", "").then(function(name){
			addOutputToNode(parseInt($(e.target).parent().parent().attr("data-id")),name);
		});
	}
});

$(document).on('click', '.delete-output', function(e) {
	let nodeId = getOutBoxNodeId(e.target);
	let outId = getOutBoxId(e.target);
	removeOutputFromNode(outId,nodeId);
});

//drag and drop    start
$(document).on('mousedown', function(e) {
	if(e.button==1) middleDown = true;
});

$(document).on('mousedown', '.title', function(e) {
	selectedElement = e.target.parentNode.parentNode;
	pos.x = parseFloat(selectedElement.style.left);
	pos.y = parseFloat(selectedElement.style.top);
});
$(document).on('mousedown', '.comment', function(e) {
	selectedElement = e.target;
	pos.x = parseFloat(selectedElement.style.left);
	pos.y = parseFloat(selectedElement.style.top);
});
$(document).on('mouseup', function(e) {
	selectedElement = undefined;
	
	if(selectedOut!=undefined) {
		$(curve).remove();
		curve = undefined;
	}
	if(e.button==1) middleDown = false;
});

//drag and drop    end


$(document).on('mousemove', function(e) {
	if(middleDown){
		$('.window-container, .comment').toArray().forEach(function(el){
			$(el).css({
				left: el.getClientRects()[0].x+e.originalEvent.movementX/window.devicePixelRatio,
				top:  el.getClientRects()[0].y+e.originalEvent.movementY/window.devicePixelRatio
			});
			let clientRect = el.getClientRects()[0];
			if(clientRect.x>window.innerWidth||
				clientRect.y>window.innerHeight||
				clientRect.x+clientRect.width<0||
				clientRect.y+clientRect.height<0){

				el.style.display = "hidden";
			}else{el.style.visibility = "visible";}
		});
		$(document.body).css({
			backgroundPositionX: parseFloat($(document.body).css('background-position-x'))+e.originalEvent.movementX/window.devicePixelRatio,
			backgroundPositionY:  parseFloat($(document.body).css('background-position-y'))+e.originalEvent.movementY/window.devicePixelRatio
		});
		nodes.forEach(function(node){
			if(node!=null) 
				updateNodeCurves(node.id);
		});
	}

	if(selectedElement!=undefined){
		pos.x += e.originalEvent.movementX/window.devicePixelRatio;
		pos.y += e.originalEvent.movementY/window.devicePixelRatio;
		$(selectedElement).css({
			left: (pos.x!=NaN) ? pos.x : 0,
			top:  (pos.y!=NaN) ? pos.y : 0
		});
		if(selectedElement.className=="window-container"){
			let nodeId = parseInt($(selectedElement).attr('data-id'));
			if(nodes[nodeId].inputNodeIds.length!=0) nodes[nodeId].inputNodeIds.forEach(function(id){updateNodeCurves(id);});
			updateNodeCurves(nodeId);
		}
	}
	if(curve!=undefined){
		var targetPos = {
			x: (e.target.className!="inputBox") ? e.pageX : e.target.getClientRects()[0].x+e.target.getClientRects()[0].width/2,
			y: (e.target.className!="inputBox") ? e.pageY : e.target.getClientRects()[0].y+e.target.getClientRects()[0].height/2
		}
		updateCurve(curve, curveStart.x, curveStart.y, targetPos.x, targetPos.y);
	}
});


$(document).on('click', '.inputBox', function(e) {
	let nodeId = parseInt($(e.target).parent().attr('data-id'));
	let cont = $(nodes[nodeId].dom).children('.window').children('.content');
	let isBlock = (cont.css('display')=="block");

	toggleContentDisplay(nodeId, !isBlock)
});

$(document).on('mousedown', '.output-line-box', function(e) {
	if(e.button==0){
		console.log(nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].curve);
		if(nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].curve!=null)
			$(nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].curve).remove();
			nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].curve = null;

		curve = document.createElementNS('http://www.w3.org/2000/svg',"path");
		curveStart.x = e.target.getClientRects()[0].x+e.target.getClientRects()[0].width/2;
		curveStart.y = e.target.getClientRects()[0].y+e.target.getClientRects()[0].height/2;

		$(curve).attr({
			stroke: '#f3ffc7',
			'stroke-width': '4',
			fill: 'transparent'
		});
		document.getElementsByTagName('svg')[0].append(curve);
		selectedOut = e.target;
	}
});

$(document).on('mouseup', '.inputBox', function(e) {
	if(parseInt($(e.target).parent().attr("data-id")) != getOutBoxNodeId(selectedOut)){

		let nodeId = getOutBoxNodeId(selectedOut);
		let outId = getOutBoxId(selectedOut);

		nodes[nodeId].outputs[outId].curve = curve;
		nodes[nodeId].outputs[outId].outputNodeId = parseInt($(e.target).parent().attr("data-id"));
		nodes[parseInt($(e.target).parent().attr("data-id"))].inputNodeIds.push(nodeId);

		selectedOut = undefined;
		curve = undefined;
	}else{
		$(curve).remove();
		curve = undefined;
	}
});


function getOutBoxNodeId(el){
	return parseInt($(el).parent().parent().parent().attr("data-id"))
}
function getOutBoxId(el){
	return parseInt(parseInt($(el).parent().attr("data-id")))
}

function updateCurve(curveEl, x1, y1, x2, y2){
	try{
		$(curveEl).attr("d", 'M ' + x1 + ' ' + y1 + ' C ' + (x1 + curveInt) + ' ' + y1 + ', ' + (x2 - curveInt) + ' ' + y2 + ', ' + x2 + ' ' + y2 + '');
	}catch(err){

	}
}

function updateNodeCurves(nodeId){
	nodes[nodeId].outputs.forEach(function(el){
		try{
			updateCurve(el.curve,
				$(el.dom).children('.output-line-box')[0].getClientRects()[0].x
					+$(el.dom).children('.output-line-box')[0].getClientRects()[0].width/2,

				$(el.dom).children('.output-line-box')[0].getClientRects()[0].y
					+$(el.dom).children('.output-line-box')[0].getClientRects()[0].height/2, 

				nodes[el.outputNodeId].dom[0].children[0].getClientRects()[0].x
					+nodes[el.outputNodeId].dom[0].children[0].getClientRects()[0].width/2,

				nodes[el.outputNodeId].dom[0].children[0].getClientRects()[0].y
					+nodes[el.outputNodeId].dom[0].children[0].getClientRects()[0].height/2
			);
		}catch(err){}
	});
}

function toggleContentDisplay(nodeId,state){
	nodes[nodeId].visible = state;
	if(!nodes[nodeId].isComment){
		if(state){
			$(nodes[nodeId].dom).css('animation','none');
			$(nodes[nodeId].dom).appendTo(document.body);
			$('.comment').css('animation','none');
			$('.comment').appendTo(document.body);
		}

		let cont = $(nodes[nodeId].dom).children('.window').children('.content');

		let rect = $(cont).parent().parent()[0].getClientRects()[0];
		let firstTitleRect = $(cont).parent().children('.title')[0].getClientRects()[0];
		let contRect = cont[0].getClientRects()[0];

		cont.css({
			display: state ? "block":"none"
		});

		let secondTitleRect = $(cont).parent().children('.title')[0].getClientRects()[0];
		/*$(cont).parent().parent().css({
			left: state ? (rect.x-(firstTitleRect.width)/2) : (rect.x+(secondTitleRect.width)/2)
		});*/

		$(nodes[nodeId].dom).css('width', state ? "auto" : contRect.width);
		
		if(nodes[nodeId].inputNodeIds.length!=0) nodes[nodeId].inputNodeIds.forEach(function(id){updateNodeCurves(id);});
		updateNodeCurves(nodeId);
	}
}


async function sPrompt(title,out=""){
	let {value: text} = await Swal.fire({
		title: title,
		input: 'text',
		inputValue: out,
		inputPlaceholder: "?"
	})

	if(text!=undefined) out = text;
	return out;
}

async function sNodePrompt(title,outTitle="",outContent=""){
	let {value: formValues} = await Swal.fire({
	  title: title,
	  html:
	    '<input id="swal-input1" class="swal2-input" value="'+outTitle+'">' +
	    '<textarea style="height: calc(100vh / 2); resize: none;" id="swal-input2" class="swal2-textarea">'+html2t(outContent)+'</textarea>',
	  focusConfirm: false,
	  preConfirm: () => {
	    return [
	      document.getElementById('swal-input1').value,
	      document.getElementById('swal-input2').value
	    ]
	  }
	})

	if(formValues[0]!=undefined) outTitle = formValues[0];
	if(formValues[1]!=undefined) outContent = t2html(formValues[1])
	return [outTitle,outContent];
}

async function sCommentPrompt(title,outContent=""){
	let {value: formValue} = await Swal.fire({
	  title: title,
	  html:
	    '<textarea style="height: calc(100vh / 2); resize: none;" id="swal-input2" class="swal2-textarea">'+html2t(outContent)+'</textarea>',
	  focusConfirm: false,
	  preConfirm: () => {
		return t2html(document.getElementById('swal-input2').value);
	  }
	})

	return formValue;
}

async function sAsk(txt,txt2,ans,callback){
	Swal.fire({
		title: txt,
		text: txt2,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: ans
	}).then((result) => {
		if (result.value)
			callback();
	})
}

function Save() {
	sPrompt("file name",fileName).then(function(filename){
		nodes.forEach(function(node){if(node!=null){
			node.position={};
			node.position.x = node.dom[0].getClientRects()[0].x;
			node.position.y = node.dom[0].getClientRects()[0].y;
		}});

		let nodesCopy = JSON.parse(JSON.stringify(nodes));

		nodesCopy.forEach(function(node){if(node!=null){
			node.dom = null;
			node.outputs.forEach(function(out){
				out.dom = null;
			});
		}});

		var filename = filename+".enm";
		var blob = new Blob([JSON.stringify(nodesCopy)], {
			type: "text/plain;charset=utf-8"
		});

		saveAs(blob, filename);
	})
}

function onFileSelected(files){
	var reader = new FileReader();
	// Closure to capture the file information.
	reader.onload = (function(theFile) {
		return function(e) {
			fileName = $('#file-upload')[0].files[0].name.replace(".enm","");
			Open(e.target.result);
		};
	})(files[0]);
	// Read in the image file as a data URL.
	reader.readAsText(files[0]);
}

function Open(jsonText) {
	let json = '[{"id":0,"title":"title","content":"content","inputNodeIds":[],"inputOutput":null,"outputs":[{"dom":null,"name":"dfgjdfgj","curve":{},"outputNodeId":null},{"dom":null,"name":"hjkhkj;","curve":{},"outputNodeId":1}],"dom":null,"position":{"x":490,"y":299}},{"id":1,"title":"title","content":"content","inputNodeIds":[0],"inputOutput":null,"outputs":[],"dom":null,"position":{"x":871,"y":307}}]';
	$('.window-container, .comment').remove();
	$('path').remove();
	lastId = 0;
	nodes = [];

	json = JSON.parse(jsonText);
	json.forEach(function(node){
		if(node==null) {nodes.push(null);lastId++}
		else{
			if(!node.isComment){
				addLoadNode(node.title, node.content, node.inputNodeIds, node.position);

				let outCount = 0;
				node.outputs.forEach(function(out){

					addOutputToNode(lastId-1, out.name, out.outputNodeId);
					nodes[lastId-1].outputs[outCount].curve = document.createElementNS('http://www.w3.org/2000/svg',"path");
					$('svg')[0].append(nodes[lastId-1].outputs[outCount].curve);
					$(nodes[lastId-1].outputs[outCount].curve).attr({
						stroke: '#f3ffc7',
						'stroke-width': '4',
						fill: 'transparent'
					});

					outCount++;
				});

				nodes[lastId-1].visible = (node.visible!=undefined) ? node.visible : true;

				let rect = $(nodes[lastId-1].dom).children('.window').children('.content')[0].getClientRects()[0];
				$(nodes[lastId-1].dom).children('.window').children('.content')
					.css('display', nodes[lastId-1].visible ? "block" : "none");
				$(nodes[lastId-1].dom).css('width', nodes[lastId-1].visible ? "auto" : rect.width);
			}else{
				addLoadNode("", node.content, node.inputNodeIds, node.position, true);
			}
		}
	});

	setTimeout(function(){
		nodes.forEach(function(node){
			if(node!=null)
				updateNodeCurves(node.id);
		});
	},300);
}


var slashSpan = '<span style="padding: 2px;background-color: rgba(255, 255, 255, 0.11);">';
var slashLine = '<div class="slashLine">-</div>';
function html2t(text){
	while(text.indexOf(slashSpan)!=-1){
		text = text.replace(slashSpan,"/*");
	}
	while(text.indexOf(slashLine)!=-1){
		text = text.replace(slashLine,"///");
	}

	return text
			.replace(/<br>/g,"\n")

			.replace(/&#8194;/g," ")
			.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g,"--")

			.replace(new RegExp('</span>',"g"),"*/")
}
function t2html(text){
	return text
			.replace(/\n/g,"<br>")

			.replace(new RegExp(" ", "g"),"&#8194;")
			.replace(/--/g,"&nbsp;&nbsp;&nbsp;&nbsp;")

			.replace(/\/\*/g,slashSpan)
			.replace(/\*\//g,'</span>')

			.replace(/\/\/\//g, slashLine)
}


//TODO: ???
