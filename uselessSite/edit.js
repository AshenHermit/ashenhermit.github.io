
var dbx 

readFile("useless_site_dropbox_data.json", function(data){
	console.log(data);
	dbx = new Dropbox.Dropbox({
		accessToken:  data.accessToken, 
		clientSecret: data.clientSecret, 
		clientId:     data.clientId, 
		fetch:fetch
	});
})

document.getElementById('save-button').addEventListener('click', function(e){
	saveContent()
});
store.content.addEventListener('input', function(e){
	content[menu.selectedTarget]["content"][store.selected].content = store.content.value
});

function saveContent(){
	dbx.filesUpload({
	    "path": "/content.json",
	    "contents": JSON.stringify(content, null, 2),
		"mode": {".tag": "overwrite"},
		"autorename": false,
		"mute": true,
		"strict_conflict": false
	}).then(function(req){
		console.log("saved");
	})
}


var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init () {
    function resize () {
        store.content.style.height = 'auto';
        store.content.style.height = store.content.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed store.content */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    observe(store.content, 'change',  resize);
    observe(store.content, 'cut',     delayedResize);
    observe(store.content, 'paste',   delayedResize);
    observe(store.content, 'drop',    delayedResize);
    observe(store.content, 'keydown', delayedResize);

    store.content.focus();
    store.content.select();
    resize();
}
init()