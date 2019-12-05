//json days
var days = [
	'[["Феттер Р.А.","206а"],["Боровков С.Е.","204"],["Березин Е.В.","204"],["Клюева Н.А. / Лиганова Е.Н.","204 / 302"],["Лиганова Е.Н. / Пашкова С.В.","204 / 206а"],["Быкова Ю.В.","212"],["Полункина С.Н.","301"]]',
	'[["Клюева Н.А. / Мусина А.А.","204 / 303"],["Ужинкин И.К.","307"],["Полункина С.Н.","301"],["Ужинкин И.К.","305"],["Ужинкин И.К.","204"],["Клюева Н.А. / Лиганова Е.Н.","204 / 202"],["Клюева Н.А. / Половинкина Ю.В.","204 / 306"]]',
	'[["Полункина С.Н.","301"],["Лиганова Е.Н. / Феттер Р.А.","204 / 206а"],["Лиганова Е.Н. / Феттер Р.А.","204 / 206а"],["Ужинкин И.К.","204"],["Ужинкин И.К.","204"],["Клюева Н.А.","204"],["Пашкова С.В. / Половинкина Ю.В.","204 / 205"]]',
	'[["Феттер Р.А. / Мусина А.А.","206а / 204"],["Полункина С.Н.","301"],["Лиганова Е.Н. / Половинкина Ю.В.","207 / 303"],["Клюева Н.А. / Пашкова С.В.","204 / 306"],["Клюева Н.А. / Пашкова С.В.","204 / 302"],["Полункина С.Н.","301"]]',
	'[["пятниса чета слишкам дикая, обновлю в пятнису","гы"]]'
]


var parseExcel = function(file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			var workbook = XLSX.read(data, {
				type: 'binary'
			});
			var sheetName = workbook.SheetNames[0]
			// Here is your object
			var XL_row_object = XLSX.utils.make_csv(workbook.Sheets[sheetName]);
			var json_object = JSON.stringify(XL_row_object);

			var i = 0;
			window.xlsxArr = XL_row_object.split('\n').map((row)=>{
				//return row.split(',').filter((el)=>{if(el!="") return el;})
				return row.split(',');
			})


			var classes = new Array(7);
			window.xlsxArr.forEach((row)=>{
				var lc = 0; //lesson count
				for(var lc=0; lc<7; lc++){
					if(row[1 + lc*2+0]!=undefined){
						if(row[1 + lc*2+0].indexOf('10а')!=-1){
							if(classes[lc]==null) classes[lc] = [row[0], row[1 + lc*2+1]]
							else{
								classes[lc][0] += ' / ' + row[0];
								classes[lc][1] += ' / ' + row[1 + lc*2+1];
							}
						}
					}
				}
			})

			window.outputArray = classes;

			//document.getElementById('day').innerHTML = window.xlsxArr.filter((el)=>{if(el!="") return el;});

			selectDay(-1);
			loadFromArray(classes);

			console.log(classes);
		};
		reader.onerror = function(ex) {
			console.log(ex);
		};
		reader.readAsBinaryString(file);
	};

var rotateState = true;
function loadFromArray(array){
	// var list = document.getElementById('list');
	if(rotateState){
		document.getElementById('list').style.transform = "perspective(1360px) rotate3d(0, 1, 0, 180deg) scaleX(-1)";
	}
	else {
		document.getElementById('list').style.transform = "perspective(1360px) rotate3d(0, 1, 0, 0deg) scaleX(1)";
	}

	rotateState = !rotateState;

	var newHtml = "";

	array.forEach(function(item){
		newHtml+=getItemHtml(item[0], item[1])
	});
	document.getElementById('list').innerHTML = newHtml;
}

function getItemHtml(teacher, cabinet){
	var ts = teacher.split('/')
	var tId = getTeachersId(teacher.split('/')[0]);
	var tId2 = getTeachersId(teacher.split('/')[1]);
	if(tId!=undefined)
	return `
<div class="item">
	<div class="name accent">${teachers[tId].item +((tId2!=undefined) ? ' / '+teachers[tId2].item : '')}</div>
	<div class="cabinet accent">${cabinet}</div>
	<div class="teacher">${teachers[tId].fullName +((tId2!=undefined) ? ' / '+teachers[tId2].fullName : '')}</div>
</div>
`
	else return `
<div class="item">
	<div class="name accent">че</div>
	<div class="cabinet accent">${cabinet}</div>
	<div class="teacher">${teacher}</div>
</div>
`
}


//teachers
var teachers = []
addTeacher('Феттер', 'Инфа/Проект', 'Роман Александрович');
addTeacher('Боровков', 'История', 'Сергей Евгеньевич');
addTeacher('Березин', 'Обжэ', "Обж'шник");
addTeacher('Клюева', 'Физека', "Наталья Алексеевна");
addTeacher('Лиганова', 'Химия', "Елена Николаевна");
addTeacher('Быкова', 'Физическая культура тела суставов круто', "Юлия Викторовна");
addTeacher('Пашкова', 'Биология', "Светлана Викторовна");
addTeacher('Полункина', 'Матеша', "Светлана Николаевна");
addTeacher('Половинкина', 'Angliyskiy yazik', "Юлия Вячеславовна");
addTeacher('Мусина', 'Angliyskiy yazik', "Анастасия Анатольевна");
addTeacher('Ужинкин', 'Русский/Литра', "Илья Константинович");

function addTeacher(key, item, fullName){
	teachers.push({key: key, item: item, fullName: fullName});
}

function getTeachersId(teacher){
	if(teacher!=undefined)
	for(var i=0; i<teachers.length; i++){
		if(teacher.indexOf(teachers[i].key)!=-1){
			return i;
			break;
		}
	}
}
function selectDay(id){
	var dayEls = document.getElementsByClassName("day")
	for (var i = 0; i < dayEls.length; i++) {
		dayEls[i].style.backgroundColor = "rgba(37, 54, 70, 0)"
		if(i==id)dayEls[i].style.backgroundColor = "rgba(37, 54, 70, 1)"
	}
}
selectDay(-1);
//touch
document.addEventListener('touchstart', function(e){
	onDown(e.changedTouches[0])
});
document.addEventListener('touchend', function(e){
	onUp(e.changedTouches[0])
});

//mouse
document.addEventListener('mousedown', function(e){
	onDown(e)
});
document.addEventListener('mouseup', function(e){
	onUp(e)
});

//click
document.addEventListener('click', function(e){
	if(e.target.id=='load-xlsx'){
		document.getElementById('file').click();
	}
	if(e.target.className=='day'){
		var dayId = parseInt(e.target.getAttribute("data-id"));
		selectDay(dayId);
		loadFromArray(JSON.parse(days[dayId]))
	}
});


//handler functions
function onDown(e){
	if(e.target.id=='load-xlsx'){
		document.getElementById('load-xlsx').style.transform = "scale(0.9)";
	}
}
function onUp(e){
	document.getElementById('load-xlsx').style.transform = "scale(1)";
}
