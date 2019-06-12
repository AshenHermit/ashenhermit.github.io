/**
* get DOM node
*/
var getDOM_node = function(title,content,id){return (`
<div data-id="`+id+`" class="window-container" style="left: 0;top: 0;">
	<div class="inputBox"></div>
	<div class="window">
		<div class="title">`+title+`</div>
		<div class="content">`+content+`</div>
	</div>
	<div class="outputs">
		<div class="add-output">+</div>
	</div>
</div>
`);
}

/**
* get DOM output
*/
var getDOM_output = function(name,id){return (`
<div data-id="`+id+`" class="output-line">
	<div class="delete-output"></div>
	<div class="output-line-text">`+name+`</div>
	<div class="output-line-box"></div>
</div>
`);
}


/**
* get comment element
*/
var getDOM_comment = function(text,id){return (`
<div data-id="`+id+`" class="comment" style="left: 0px;top: 0px;"><div class="comment-delete-button"></div>
	<span id="comment-content">`+text+`</span>
</div>
`);
}