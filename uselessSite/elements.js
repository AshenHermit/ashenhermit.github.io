var elements = {}
elements["list item"] = `
<div item-id="{0}" class="list-item">{1}</div> 
`

function htmlElement(key, params){
	var text = new String(elements[key])
	for (var i = 0; i < params.length; i++) {
		text = text.replace(new RegExp("\\{"+i+"\\}", "g"), params[i])
	}
	return text
}

function textToHTML(txt){
	return txt
	.replace(new RegExp("\n", "g"), "<br>")

	.replace(new RegExp("\\[{", "g"), '<div class="content-block">')
	.replace(new RegExp("}\\]", "g"), '</div>')

	.replace(new RegExp("<\\*{", "g"), '<span class="content-title">')
	.replace(new RegExp("}>", "g"),  '</span>')
}