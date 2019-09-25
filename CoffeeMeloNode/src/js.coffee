
window.loading = setInterval () -> 
	if Tone.context.state=="suspended"
		Tone.context.resume()
	if Tone.context.state=="running"
		clearInterval(window.loading)
,1000/60

window.nodes = []
window.lastId = 0;
window.mousePos = {x:0,y:0}

window.bpm = 120


window.Save = () ->
	nodesCopy = JSON.parse(JSON.stringify(window.nodes))

	nodesCopy.forEach (node) ->
		node.dom = null
		


time = 0;
window.update = setInterval () ->
	window.nodes.forEach (node) ->
		if node!=null
			node.update(time)
	time+=1;
,1000/60

