var loadedCount = 0;
var loaded = false;

function trim(text){
	while(text.indexOf('  ')!=-1){
		text = text.replace(new RegExp('  ', 'gim'), ' ')
	}
	return text;
}

function getHtmlByURL(url, callback){
	//setLoaderState(true);
	var httpRequest = new XMLHttpRequest()
	var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
	httpRequest.onload = function (data) {
		callback(data.target.responseText);
		loadedCount++;
	}
	httpRequest.open('GET', http + '//cors-anywhere.herokuapp.com/' + url)
	httpRequest.send()
}

//parser
function getTextFromHtml(html, regexp){
	var out = html.match(new RegExp(regexp, "im"));
	out.splice(0,1);
	return out;
}

class Site{
	constructor(name, url, template){
		this.name = name;
		this.resp = "";
		getHtmlByURL(url, ((resp)=>{this.resp = trim(resp)}).bind(this))
		this.template = template;
		this.items = {};
	}
	addItem(key, parameters){
		this.items[key] = parameters;
	}
	getItemValues(key){
		return getTextFromHtml(
			this.resp,
			this.template
			.replace(new RegExp("\\{0\\}", "gim"), this.items[key][0])
			.replace(new RegExp("\\{1\\}", "gim"), this.items[key][1])
			.replace(new RegExp("<", "gim"), "[^<]*<")
			.replace(new RegExp(">", "gim"), "[^>]*>")
			.replace(new RegExp("\\{\\?\\}", "gim"), "([^<]*)")
			)
	}
}

var keys = [
"прикладная математика и информатика",
"информатика и вычислительная техника",
"прикладная механика",
"электроника и наноэлектроника",
"мехатроника и робототехника",
"дизайн",
]

var sites = []

sites.push(new Site( "МГТУ им. Баумана",
"www.bmstu.ru/abitur/general/passing_scores/",
'<td>{0}</td><td><div></div></td><td><div></div></td><td><div></div></td><td>{1}</td><td><div></div></td><td><div>{?}</div>'
))

var i=0;
sites[sites.length-1].addItem(keys[i], ["Прикладная математика и информатика", "Теоретическая информатика и компьютерные технологии"]);i++
sites[sites.length-1].addItem(keys[i], ["Информатика и вычислительная техника", "Системы обработки информации и управления"]);i++
sites[sites.length-1].addItem(keys[i], ["Прикладная механика", "Прикладная механика"]);i++
sites[sites.length-1].addItem(keys[i], ["Электроника и наноэлектроника", "Электронные технологии в машиностроении"]);i++
sites[sites.length-1].addItem(keys[i], ["Мехатроника и робототехника", "Робототехнические системы и мехатроника"]);i++
sites[sites.length-1].addItem(keys[i], ["Дизайн", "Промышленный дизайн"]);i++
//



//mpei
sites.push(new Site("НИУ МЭИ",
"https://www.abitura.pro/directory/moskva/niu-mei-moskva",
'<a href=">{0}</a></div></div><div>Бакалавр</div><div><div>{?}</div>'
))

var i=0;
sites[sites.length-1].addItem(keys[i], ["Прикладная математика и информатика"]);i++
sites[sites.length-1].addItem(keys[i], ["Информатика и вычислительная техника"]);i++
sites[sites.length-1].addItem(keys[i], ["Прикладная механика"]);i++
sites[sites.length-1].addItem(keys[i], ["Электроника и наноэлектроника"]);i++
sites[sites.length-1].addItem(keys[i], ["Мехатроника и робототехника"]);i++
sites[sites.length-1].addItem(keys[i], ["Дизайн"]);i++


keys.forEach(function(key){
	document.getElementById('items').innerHTML +=
	`
	<div class="item">${key}
	<svg class="arrow" width="64" height="64" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
	 <g>
	  <title>Layer 1</title>
	  <path stroke="#000000" fill="#ffffff" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" d="m15.78231,1.18061c11.11165,10.76002 19.69153,21.52003 30.80319,32.28005l-32.49103,29.5373c-3.58667,-3.44602 -5.06354,-4.99321 -8.01727,-8.65021l24.0518,-21.09807c-7.38433,-7.52498 -15.19061,-15.04996 -22.57494,-22.57494l8.22825,-9.49413z" id="svg_4" stroke-opacity="0"/>
	 </g>
	</div>
	`
});

for (var i = 0; i < sites.length; i++) {
	document.getElementById('graph').innerHTML+=
	`<div class="bar-container"><div class="name-container"><div class="name">${sites[i].name}</div></div><div class="bar"><span class="score">10</span></div></div>`
}

var labels = document.getElementsByClassName("label")
for (var i = 0; i < labels.length; i++) {
	labels[i].style.top = labels[i].parentNode.getClientRects()[0].y-20+"px";
	labels[i].style.left = labels[i].parentNode.getClientRects()[0].x+14+"px";
}

var bars = document.getElementsByClassName("bar");
var maxHeight = document.getElementsByClassName("bar-container")[0].clientHeight;
var minScore = 139;

document.addEventListener('click', function(e){
	if (e.target.className=="item" || e.target.className=="item active") {
		var active = document.getElementsByClassName("item active")[0]
		if(active!=undefined) active.classList.remove("active")
		e.target.classList.add("active")

		if(e.target.style.transform.indexOf("scaleY(-1)")==-1){
			e.target.style.setProperty("transform", "perspective(1360px) rotate3d(1, 0, 0, 180deg) scaleY(-1)");
		}
		else {
			e.target.style.setProperty("transform", "perspective(1360px) rotate3d(1, 0, 0, 0deg) scaleY(1)");
		}

		for (var i = 0; i < sites.length; i++) {
			bars[i].style.setProperty("height", (maxHeight/(300-minScore))*(parseInt(sites[i].getItemValues(e.target.innerText)[0])-minScore)+"px")
		}
	}
});

function update(){
	if(!loaded){
		if(loadedCount>=sites.length){
			document.getElementById('loading').style.opacity = 0;
			document.getElementById('loading').style.pointerEvents = 'none';
			loaded = true;
			document.getElementsByClassName("item")[0].click();
		}
	}

	for (var i = 0; i < bars.length; i++) {
		var val = Math.round(parseFloat(bars[i].clientHeight)*((300-minScore)/maxHeight)+minScore);
		if(val!=parseInt(bars[i].children[0].innerHTML)) bars[i].children[0].innerHTML = val
	}
}

setInterval(update, 1000/60);