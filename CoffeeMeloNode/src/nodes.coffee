window.noteSprite = """
---##-
---#--
-###--
-###--
-###--
"""


class Node
	constructor: (@x, @y, cw, ch, @outputs, @inputType) ->

		# inputTypes:
			# note_array
			# midi
			# synth

		@id = window.lastId
		window.lastId++ 
		@canvas = document.createElement 'CANVAS'
		@canvas.width = cw;
		@canvas.height = ch;
		@canvas.style.width = @canvas.width*2+"px"
		@canvas.style.height = @canvas.height*2+"px"
		@canvas.id = "nodeCanvas_"+@id
		@ctx = @canvas.getContext '2d'

		@inputNodeId = -1
		@inputOutNodeId = -1

		outputElements = ''
		outputCount = 0 

		inputBox = (if @inputType!=null then '<div data-type="'+@inputType+'" class="inputBox"></div>' else '')

		content = """
		<div style="left:"""+@x+"""px;top:"""+@y+"""px;" data-id="""+@id+""" class="window-container" style="left: 0;top: 0;">
			"""+inputBox+"""
			<div class="window">
				<div class="title">"""+@title+"""</div>
				<div class="content"></div>
			</div>
			"""+(if @outputs.length!=0 then '<div class="outputs"></div>' else '')+"""
		</div>
		"""


		$('body').append(content)
		if cw!=0
			$('.content').last().append(@canvas)
		if @addContent!=undefined
			$('.content').last().append(@addContent)




		@outputs.forEach (output) ->
			outputElement="""
			<div data-id='"""+outputCount+"""' class="output-line">
				<div class="output-line-text">"""+output.name+"""</div>
				<div data-type='"""+output.type+"""' class="output-line-box"></div>
			</div>
			"""
			$('.outputs').last().append(outputElement)

			output.dom = $('.output-line').last()
			output.outputNodeIds = []
			output.curves = []
			outputCount++


		@dom = $('.window-container').last()
		@content = $('.content').last()
		@addParameters()

	update: (time) ->


	remove: () ->
		@outputs.forEach (out) ->
			out.outputNodeIds.forEach (outNodeId) ->
				nodes[outNodeId].inputNodeId = -1
			out.curves.forEach (curve) ->
				$(curve).remove()

		$(@dom).remove()
		nodes[@id] = null

	addParameters:() ->
		if @parameters!=undefined
			append = ""
			id = @id
			@parameters.forEach (parameter) ->
				if parameter.type=="dropdown"
					appendTmp = '<div style="display: flex;"><div style="padding-top: 0.5em;">'+parameter.name+':</div><select onchange="getNodeByChild(this).onParametersChange();" data-param-id="'+id+parameter.name+'" class="content-input-line">'
					parameter.values.forEach (value) ->
						appendTmp+='<option '+(if (value==parameter.current) then 'selected' else '')+' value="'+value+'">'+value+'</option>'
					appendTmp+='</select></div>'
					append+=appendTmp

				if parameter.type=="float"
					append+='''
					<div><div data-param-id="'''+id+parameter.name+'''" value="'''+parameter.current+'''" style="transform: rotate('''+(300*parameter.current-300/2)+'''deg);" class="parameter-wheel" onchange="getNodeByChild(this).onParametersChange();">
					    <div class="parameter-wheel-pointer"></div>
					</div>'''+parameter.name+'''</div>
					'''

			@content.append(append)
			@onParametersChange()

	onParametersChange:() ->
		
	getParameterValue:(paramName) ->
		if $('[data-param-id="'+@id+paramName+'"]').val() != ""
			return $('[data-param-id="'+@id+paramName+'"]').val()
		else
			return $('[data-param-id="'+@id+paramName+'"]').attr('value')

########################################
# nodes


########################################
# list of Notes -start
class ListOfNotes extends Node
	constructor: (x, y) ->
		@title = "List Of Notes"

		outputs = [
			{
				name:'notes list'
				type:'note_array'
			}
		]

		@listOfNotes = ['G3','G4','D5','D#4','A#4','D#3','D4','A4'];

		lines = ''
		count = 0
		@listOfNotes.forEach (note) ->
			lines+='<input data-type="note" data-nodeId="'+window.lastId+'" data-listId="'+count+'" class="content-input-line" value="'+note+'">'
			count++

		@addContent = lines+'<div data-nodeId="'+window.lastId+'" onclick="addInputLineBeforeAddButton(this,'+new String("'")+'C4'+new String("'")+')" class="content-add-button">+</div>'

		super x, y, 0, 0, outputs, null

	update: (time) ->

	updateList: () ->
		$(@dom).children(".window").children(".content").html("")
		lines = ''
		count = 0
		@listOfNotes.forEach (note) ->
			lines+='<input data-type="note" data-nodeId="'+window.lastId+'" data-listId="'+count+'" class="content-input-line" value="'+note+'">'
			count++

		@addContent = lines+'<div data-nodeId="'+window.lastId+'" onclick="addInputLineBeforeAddButton(this,'+new String("'")+'C4'+new String("'")+')" class="content-add-button">+</div>'
		$(@dom).children(".window").children(".content").html(@addContent)

	loadJSON: (json)->
		@listOfNotes = JSON.parse(json)
		@updateList()

	updateInputs: () ->
		@listOfNotes = []
		array = $('.content-input-line[data-nodeId="'+@id+'"]').toArray()
		for el in [0...array.length]
			@listOfNotes.push($(array[el]).val())
		updateNodeCurves(@id)

		

#end ListOfNotes
#############################

########################################
# generates RandomMIDI -start
class RandomMIDI extends Node
	constructor: (x, y) ->
		@title = "Random MIDI"

		outputs = [
			{
				name:'midi out'
				type:'midi'
				value: 'C2'
			}
		]
		@parameters = [
			{
				name:"duration"
				current: 0.1
				type: "float"
				hasInput: false
			},
			{
				name:"speed"
				current: 0.75
				type: "float"
				hasInput: false
			}
		]

		@speed = 0

		@currentMidi = {note:"-", duration: 0.2}
		super x, y, 16, 64, outputs, "note_array"


	update: (time) ->
		try
			scale = 16
			@ctx.fillStyle = $('.window').css('backgroundColor')
			@ctx.globalAlpha = 0.1
			@ctx.fillRect 0, 0, @canvas.width, @canvas.height 
			rand = Math.floor(Math.random()*nodes[@inputNodeId].listOfNotes.length)

			if time % @speed == 0
				@ctx.fillStyle = "#fff"
				@ctx.globalAlpha = 1
				@ctx.fillRect 0,
					Math.round((64/nodes[@inputNodeId].listOfNotes.length)*rand),
					scale,
					Math.round(64/nodes[@inputNodeId].listOfNotes.length)

				@currentMidi.note = nodes[@inputNodeId].listOfNotes[rand]

				for outId in [0...@outputs[0].outputNodeIds.length]
					nodes[@outputs[0].outputNodeIds[outId]].sendMIDI(@currentMidi)

		catch err

	onParametersChange:() ->
		@speed = (40-parseInt(@getParameterValue('speed')*40)+1)
		@currentMidi.duration = @getParameterValue('duration')*2

#end RandomMIDI
#############################

########################################
# Arpegio MIDI -start
class ArpegioMIDI extends Node
	constructor: (x, y) ->
		@title = "Arpegio MIDI"

		outputs = [
			{
				name:'midi out'
				type:'midi'
				value: 'C2'
			}
		]

		@parameters = [
			{
				name:"type"
				values:["down", "up"]
				current: "down"
				type: "dropdown"
				hasInput: false
			},
			{
				name:"duration"
				current: 0.1
				type: "float"
				hasInput: false
			},
			{
				name:"speed"
				current: 0.75
				type: "float"
				hasInput: false
			}
		]

		@currentMidi = {note:"C3", duration: 0.2}
		@speed = 0
		@count = 0
		@type = "down"

		super x, y, 16, 64, outputs, "note_array"


	update: (time) ->
		try
			scale = 16
			@ctx.fillStyle = $('.window').css('backgroundColor')
			@ctx.globalAlpha = 0.1
			@ctx.fillRect 0, 0, @canvas.width, @canvas.height


			if time % @speed == 0
				if @type == "down"
					@count++
					if @count>nodes[@inputNodeId].listOfNotes.length-1
						@count=0
				else if @type == "up"
					@count--
					if @count<0
						@count=nodes[@inputNodeId].listOfNotes.length-1


				@ctx.fillStyle = "#fff"
				@ctx.globalAlpha = 1
				@ctx.fillRect 0,
					Math.round((64/nodes[@inputNodeId].listOfNotes.length)*@count),
					scale,
					Math.round(64/nodes[@inputNodeId].listOfNotes.length)

				@currentMidi.note = nodes[@inputNodeId].listOfNotes[@count]

				# @outputs[0].outputNodeIds.forEach (outId) ->
				# 	nodes[outId].sendMIDI(@currentMidi)

				for outId in [0...@outputs[0].outputNodeIds.length]
					nodes[@outputs[0].outputNodeIds[outId]].sendMIDI(@currentMidi)
					

		catch err

	onParametersChange: () ->
		@speed = (40-parseInt(@getParameterValue('speed')*40)+1)
		@type = @getParameterValue('type')
		@currentMidi.duration = @getParameterValue('duration')*2

#end Arpegio MIDI
#############################



########################################
# Oscillator -start
class Oscillator extends Node
	constructor: (x, y) ->
		@title = "Oscillator"
		outputs = [
			{
				name:'synth out'
				type:'synth'
			}
		]
		inputs = [
			{
				name:'osc type'
				type:'osc type'
			}
		]
		@parameters = [
			{
				name:"osc type"
				values:["sine0", "sine8", "triangle100", "square100", "sawtooth100"]
				current: "triangle100"
				type: "dropdown"
				hasInput: false
			},
			{
				name:"env attack"
				current: 0.005
				type: "float"
				hasInput: false
			},
			{
				name:"env decay"
				current: 0.1
				type: "float"
				hasInput: false
			},
			{
				name:"env sustain"
				current: 0.3
				type: "float"
				hasInput: false
			},
			{
				name:"env release"
				current: 0.1
				type: "float"
				hasInput: false
			}
		]

		@synth = new Tone.PolySynth()
		super x, y, 0, 0, outputs, "midi"


	update: (time) ->

	sendMIDI: (midi) ->
		if midi.note!="-"
			@synth.triggerAttackRelease(midi.note, midi.duration)
		

	onParametersChange: () ->
		@synth.set({
			oscillator:{
				type: @getParameterValue('osc type')
			}
			envelope:{
				attack: @getParameterValue('env attack')
				decay: @getParameterValue('env decay')
				sustain: @getParameterValue('env sustain')
				release: @getParameterValue('env release')*10
			}
		})
		

#end Oscillator
#############################



########################################
# Reverb -start
class Reverb extends Node
	constructor: (x, y) ->
		@title = "Reverb"
		outputs = [
			{
				name:'synth out'
				type:'synth'
			}
		]

		@parameters = [
			{
				name:"room size"
				current: 0.84
				type: "float"
				hasInput: false
			},
			{
				name:"wet"
				current: 0.12
				type: "float"
				hasInput: false
			}
		]

		@synth = new Tone.Freeverb()

		super x, y, 0, 0, outputs, "synth"

	update: (time) ->

	onConnect: (id) ->
		console.log nodes[id].title + " connected to " + @title
		nodes[id].synth.connect(@synth)

	onDisconnect: (id) ->
		console.log nodes[id].title + " disconnected from " + @title
		nodes[id].synth.disconnect(@synth)
		
	onParametersChange:() ->
		@synth.set({
			roomSize: @getParameterValue('room size')
			wet: @getParameterValue('wet')
		})

#end Reverb
#############################


########################################
# Delay -start
class Delay extends Node
	constructor: (x, y) ->
		@title = "Delay"
		outputs = [
			{
				name:'synth out'
				type:'synth'
			}
		]

		@parameters = [
			{
				name:"time"
				current: 0.25
				type: "float"
				hasInput: false
			},
			{
				name:"feedback"
				current: 0.3
				type: "float"
				hasInput: false
			}
		]

		@synth = new Tone.FeedbackDelay()

		super x, y, 0, 0, outputs, "synth"

	update: (time) ->

	onConnect: (id) ->
		console.log nodes[id].title + " connected to " + @title
		nodes[id].synth.connect(@synth)

	onDisconnect: (id) ->
		console.log nodes[id].title + " disconnected from " + @title
		nodes[id].synth.disconnect(@synth)
		
	onParametersChange:() ->
		@synth.set({
			delayTime: parseFloat(@getParameterValue('time'))*5
			feedback: @getParameterValue('feedback')
		})

#end Delay
#############################


########################################
# Distortion -start
class Distortion extends Node
	constructor: (x, y) ->
		@title = "Distortion"
		outputs = [
			{
				name:'synth out'
				type:'synth'
			}
		]

		@parameters = [
			{
				name:"distortion"
				current: 0.4
				type: "float"
				hasInput: false
			}
		]

		@synth = new Tone.Distortion(0.8)

		super x, y, 0, 0, outputs, "synth"

	update: (time) ->

	onConnect: (id) ->
		console.log nodes[id].title + " connected to " + @title
		nodes[id].synth.connect(@synth)

	onDisconnect: (id) ->
		console.log nodes[id].title + " disconnected from " + @title
		nodes[id].synth.disconnect(@synth)
		
	onParametersChange:() ->
		@synth.set({
			distortion: @getParameterValue('distortion')
		})

#end Distortion
#############################


########################################
# Mix -start
class Mix extends Node
	constructor: (x, y) ->
		@title = "Mix"

		@volume = new Tone.Volume()
		@volume.connect(Tone.Master)

		@parameters = [
			{
				name:"volume"
				current: 0.74
				type: "float"
				hasInput: false
			}
		]

		super x, y, 0, 64, [], "synth"


	update: (time) ->

	sendMIDI: (midi) ->

	onConnect: (id) ->
		console.log nodes[id].title + " connected to " + @title
		nodes[id].synth.connect(@volume)

	onDisconnect: (id) ->
		console.log nodes[id].title + " disconnected from " + @title
		nodes[id].synth.disconnect(@volume)

	onParametersChange:() ->
		@volume.set({volume:parseFloat(@getParameterValue('volume')*80)-80/1.2})

#end Mix
#############################


addNode = (node) ->
	window.nodes.push(node)


addNodeFromContenxt = (constructor) ->
	rect = document.getElementsByClassName('context-menu')[0].getClientRects()[0]
	window.nodes.push(new constructor(rect.x, rect.y))
	closeContextMenu();

window.addNode = addNode
window.addNodeFromContenxt = addNodeFromContenxt

window.ListOfNotes = ListOfNotes

window.RandomMIDI = RandomMIDI
window.ArpegioMIDI = ArpegioMIDI

window.Oscillator = Oscillator

window.Reverb = Reverb
window.Delay = Delay
window.Distortion = Distortion

window.Mix = Mix
