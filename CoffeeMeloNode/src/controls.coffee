





middleDown = false
selectedContainer = null
selectedOut = null
window.selectedNoteInput = null

curve = null
curveStart = {x:0,y:0}

curveInt = 160


selectedWheel = null
wheelStartY = 0
wheelStartValue = 0

window.keyboard = new Tone.PolySynth().toMaster()



################################################################
# HANDLERS


$(document).on 'mousedown', (e)->
	if e.button==1
		middleDown = true
		$('.context-menu').css 'transition-duration', '0s'

$(document).on 'mouseup', (e) ->
	selectedWheel=null

	if selectedOut!=undefined
		$(curve).remove()
		curve = undefined

	if e.button==0
		selectedContainer = null
	if e.button==1
		middleDown = false
		$('.context-menu').css 'transition-duration', '0.1s'

$(document).on 'mousemove', (e)->
	# wheel control and onchange
	if selectedWheel!=null
		value = wheelStartValue + (wheelStartY - e.pageY)/350
		if value>1
			value = 1
		else if value<0
			value = 0
		$(selectedWheel).attr('value', value)
		$(selectedWheel).css('transform', 'rotate('+(300*value-300/2)+'deg)')
		selectedWheel.onchange()

	# drag node
	if selectedContainer!=null
		$(selectedContainer).css
			left: selectedContainer.getClientRects()[0].x+e.originalEvent.movementX/window.devicePixelRatio
			top:  selectedContainer.getClientRects()[0].y+e.originalEvent.movementY/window.devicePixelRatio

		updateNodeCurves(getNodeByChild(selectedContainer).id)
		updateNodeCurves(getNodeByChild(selectedContainer).inputNodeId)

	# drag all
	if middleDown
		$('.window-container, .comment, .context-menu').toArray().forEach (el) ->
			$(el).css 
				left: el.getClientRects()[0].x+e.originalEvent.movementX/window.devicePixelRatio
				top:  el.getClientRects()[0].y+e.originalEvent.movementY/window.devicePixelRatio

		$(document.body).css
			backgroundPositionX: parseFloat($(document.body).css('background-position-x'))+e.originalEvent.movementX/window.devicePixelRatio
			backgroundPositionY:  parseFloat($(document.body).css('background-position-y'))+e.originalEvent.movementY/window.devicePixelRatio


		window.nodes.forEach (node)->
			if(node!=null) 
				updateNodeCurves(node.id)

	if curve!=null
		targetPos = {
			x: if (e.target.className!="inputBox") then e.pageX else e.target.getClientRects()[0].x+e.target.getClientRects()[0].width/2
			y: if (e.target.className!="inputBox") then e.pageY else e.target.getClientRects()[0].y+e.target.getClientRects()[0].height/2
		}
		updateCurve(curve, curveStart.x, curveStart.y, targetPos.x, targetPos.y);



$(document).on 'mousedown', (e)->
	if e.button==2
		window.mousePos.x = e.pageX;
		window.mousePos.y = e.pageY;

$(document).on 'mousedown', '.title', (e)->
	if e.button==0
		selectedContainer = e.target.parentNode.parentNode

# start drag the output
$(document).on 'mousedown', '.output-line-box', (e)->
	if e.button==0
		# if nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].curves.length!=0
		# 	$(nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].curve).remove()
		# 	nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].curve = null
		
		# if nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].outputNodeId!=-1
			# RemoveConnectionFromNodeInput($(nodes[nodes[getOutBoxNodeId(e.target)].outputs[getOutBoxId(e.target)].outputNodeId].dom).children('.inputBox')[0])


		curve = document.createElementNS('http://www.w3.org/2000/svg',"path")
		curveStart.x = e.target.getClientRects()[0].x+e.target.getClientRects()[0].width/2
		curveStart.y = e.target.getClientRects()[0].y+e.target.getClientRects()[0].height/2

		$(curve).attr
			stroke: '#f3ffc7'
			'stroke-width': '4'
			fill: 'transparent'

		document.getElementsByTagName('svg')[0].append(curve)
		selectedOut = e.target

# start drag the output --end--


#on mouse up on input box, for connect to node
$(document).on 'mouseup', '.inputBox', (e) ->
	if ( getNodeByChild(e.target).id != getNodeByChild(selectedOut) and $(selectedOut).attr('data-type') == $(e.target).attr("data-type") )

		RemoveConnectionFromNodeInput(e.target)

		if curve != null
			nodeId = getOutBoxNodeId(selectedOut)
			outId = getOutBoxId(selectedOut)

			if getNodeByChild(e.target).onConnect!=undefined
				getNodeByChild(e.target).onConnect(getOutBoxNodeId(selectedOut))

			nodes[nodeId].outputs[outId].curves.push(curve)
			nodes[nodeId].outputs[outId].outputNodeIds.push(getNodeByChild(e.target).id)
			getNodeByChild(e.target).inputNodeId = nodeId
			getNodeByChild(e.target).inputOutNodeId = outId


		selectedOut = null
		curve = null
	else
		$(curve).remove()
		curve = undefined


$(document).on 'click', '.inputBox', (e) ->
	RemoveConnectionFromNodeInput(e.target)

$(document).on 'dblclick', '.title', (e)->
	if $(e.target).parent().parent().children('.inputBox').length!=0
		RemoveConnectionFromNodeInput($(e.target).parent().parent().children('.inputBox')[0])

	getNodeByChild(e.target).remove()


$(document).on 'mousedown', '.parameter-wheel', (e) ->
	selectedWheel = e.target
	wheelStartY = e.pageY
	wheelStartValue = parseFloat($(e.target).attr('value'))

$(document).on 'mousedown', '.keyboard-key', (e) ->
	e.preventDefault()
	note = e.target.innerText+$('[name="octave"]').val()
	keyboard.triggerAttackRelease(note, 0.1)
	if selectedNoteInput!=null
		$(selectedNoteInput).val(note)
		window.selectedNoteInput.focus()
		getNodeByChild(selectedNoteInput).updateInputs()
	

$(document).on 'focus', 'input[data-type="note"]', (e) ->
	window.selectedNoteInput = e.target

$(document).on 'blur', 'input[data-type="note"]', (e) ->
	window.selectedNoteInput = null

########################################################
# METHODS

window.RemoveConnectionFromNodeInput = (el)->
	node = getNodeByChild(el)
	if node.inputNodeId!=-1
		nodeId = node.inputNodeId
		outId  = node.inputOutNodeId

		if node.onDisconnect!=undefined
			try
				node.onDisconnect(nodeId)
			catch err

		$(nodes[nodeId].outputs[outId].curves[nodes[nodeId].outputs[outId].outputNodeIds.indexOf(node.id)]).remove()
		nodes[nodeId].outputs[outId].curves.splice(nodes[nodeId].outputs[outId].outputNodeIds.indexOf(node.id),1)
		nodes[nodeId].outputs[outId].outputNodeIds.splice(nodes[nodeId].outputs[outId].outputNodeIds.indexOf(node.id),1)


		getNodeByChild(el).inputNodeId = -1

window.getOutBoxNodeId = (el)->
	return parseInt $(el).parent().parent().parent().attr("data-id")

window.getOutBoxId = (el)->
	return parseInt parseInt($(el).parent().attr("data-id"))



onContextMenu = () ->
	$('.context-menu').css
		"pointer-events": 'auto'
		"opacity": '1'
		"left": mousePos.x-document.getElementsByClassName('context-menu')[0].clientWidth/2
		"top": mousePos.y

	return false;

document.oncontextmenu = onContextMenu

closeContextMenu = () -> 
	$('.context-menu').css
		pointerEvents: 'none'
		opacity: '0'
window.closeContextMenu = closeContextMenu;


# Update Curve
window.updateCurve = (curveEl, x1, y1, x2, y2)->
	$(curveEl).attr("d",('M '+(x1)+' '+(y1)+' C '+(x1+curveInt)+' '+(y1)+', '+(x2-curveInt)+' '+(y2)+', '+(x2)+' '+(y2)+''))


window.updateNodeCurves = (nodeId)->
	# try
		nodes[nodeId].outputs.forEach (out) ->
			count = 0
			out.outputNodeIds.forEach (outNodeId) ->
				updateCurve(out.curves[count],
					$(out.dom).children('.output-line-box')[0].getClientRects()[0].x+$(out.dom).children('.output-line-box')[0].getClientRects()[0].width/2,

					$(out.dom).children('.output-line-box')[0].getClientRects()[0].y+$(out.dom).children('.output-line-box')[0].getClientRects()[0].height/2, 

					nodes[outNodeId].dom[0].children[0].getClientRects()[0].x+nodes[outNodeId].dom[0].children[0].getClientRects()[0].width/2,

					nodes[outNodeId].dom[0].children[0].getClientRects()[0].y+nodes[outNodeId].dom[0].children[0].getClientRects()[0].height/2
				)
				count++
			
	# catch err


$('*').on 'click', (e)->
	if e.button!=2 and e.target.className != "context-menuline-img"
		closeContextMenu()

window.addInputLineBeforeAddButton = (el, value) ->
	$(el).before('<input data-type="note" data-nodeId="'+$(el).attr('data-nodeId')+'" class="content-input-line" value="'+value+'">')
	nodes[parseInt($(el).parent().parent().parent().attr('data-id'))].updateInputs()



window.getNodeByChild = (el) ->
	curEl = el
	for [0...20]
		if $(curEl).attr('data-id')==undefined 
			curEl = $(curEl).parent()

	if $(curEl).attr('data-id')==undefined
		console.log "this element trying to search his node id:"
		console.log el

	return nodes[parseInt($(curEl).attr('data-id'))]








#############################
# KEY BINDINGS

$(document).on 'keydown', (e) ->
	node = getNodeByChild($(':focus'))
	if e.originalEvent.keyCode==13
		if $(':focus')[0].tagName=="INPUT"
			if $(':focus').val() == ""
				$(':focus').remove()
		node.updateInputs()


			
	
	








######################################################	
# OTHER

$('#bpmInput').change (e)->
	window.bpm = parseInt($(this).val())