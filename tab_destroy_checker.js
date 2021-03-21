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

function includeScript(url){
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = url;

    document.body.appendChild(js);
}

function includeFont(font_family_name, url){
    var new_font = new FontFace(font_family_name, `url(${url})`)
    new_font.load().then(function(loaded_face) {
        // use font here
        document.fonts.add(loaded_face)
    }).catch(function(error) {
        console.error(error)
    });
}

function createImage(url){
    var img = new Image()
    img.src = url
    return img
}

function createStyle(css){
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    }
}

function destroy_all_audio(){
    [].forEach.call(document.querySelectorAll("*"), function(x){if(x.tagName=="AUDIO" || x.tagName=="SOURCE"){try{x.parentNode.parentNode.remove();}catch(e){}}})
}

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

function Destroy_Page_With_VideoBG(audio_url, video_search_tags, is_video, pages_count, video_change_factor, content_inner_html, creation_callback, update_callback){
    destroy_all_audio()

    document.title = "?"

    includeScript("https://cdn.jsdelivr.net/npm/curtainsjs@8.1.0/dist/curtains.umd.min.js")
    includeFont("congress", "https://dl.dropboxusercontent.com/s/geosla34jgrxqw7/Arvo-Bold.ttf")

    var time = 0
    var videos = []
    if(is_video){
        for(var i=0; i<video_search_tags.length; i++){
            for(var p=0; p<pages_count; p++){
                fetch(
                    `https://api.pexels.com/videos/search?query=${video_search_tags[i]}&page=${(p+1)}`
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
        }
    }else{
        videos = shuffle(video_search_tags)
    }
    
    var last_video = 0

    var music = new Audio(audio_url)
    music.loop = true
    music.play()

    createStyle(`
        .crt-text { 
            text-shadow: 0.06rem 0 0.06rem #ff3870, -0.125rem 0 0.06rem #62ffff;
            animation-duration: 0.007s;
            animation-name: textflicker;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }
        @keyframes textflicker {
            from {
              text-shadow: 3px -0.8px 0 #ff3870, -5px 0.8px 0 #62ffff;
            }
            to {
              text-shadow: 5px 0.8px 2px #ff3870, -3px -0.8px 2px #62ffff;
            }
          }
    `)

    var main_content_setup = false

    var animation_interval = ()=>{
        if(time<24){
            document.body.style.filter = `grayscale(${time/10}) contrast(${1+time/10}) blur(${time/2}px)`
        }else
        if(time>24 && !main_content_setup){
            document.body.style.fontFamily = "congress"
            document.body.style.overflowY = "hidden"
            document.body.style.filter = ``
            document.body.style.background = "#000"
            document.body.innerHTML = ""
            var lifetime = "00:00:00"
            document.body.innerHTML = `
            ${
                is_video ? 
                `<video id="bg_video" style="user-select: none; z-index: -1; position: absolute; width:100%; filter: grayscale(0.9) brightness(0.4) contrast(1.5);" autoplay muted loop id="myVideo">
                    <source id="bg_video_source" src="${videos[0]}" type="video/mp4">
                </video>`
                :
                `<img id="bg_video_source" style="user-select: none; z-index: -1; position: absolute; width:100%; filter: grayscale(0.9) brightness(0.4) contrast(1.5);">
                    
                </img>`
            }
            <div style="user-select: none; display: flex; position: absolute; width: 100%; height: 100%; align-items: center; justify-content: center;">
                <div style="user-select: none; display: block; text-align: center;">
                    ${content_inner_html}
                </div>
            </div>
            `
            creation_callback()
            main_content_setup = true
        }else if(time>24){
            try{
                update_callback(time-24)
            }catch(e){
                console.error(e)
            }
            
            var current_video = Math.floor((time-24)*video_change_factor) % videos.length
            if(last_video != current_video){
                last_video = current_video
                var video_el = document.getElementById("bg_video")
                //video_el.pause()
                document.getElementById("bg_video_source").src = videos[current_video]

                try{
                    video_el.load()
                    video_el.play()
                }catch(e){}
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
    function update(){
        document.body.innerHTML = ""
        for(var t=0; t<50; t++){
            var dots = ""
            for(var i=0; i<Math.round((Math.sin((timer+t/3))+1)*5); i++) dots += "."
            var super_word = super_words[Math.floor(t*1)%super_words.length]
            document.body.innerHTML += `<h1 style="${(t%2==0 ? "" : "text-align:right;")} color: #ff3232; padding-left:2em;">${("Go "+super_word+" Yourself").split("").map((x, i)=> i>0 ? (dots+x) : x).join("")}</h1>`
        }
        timer += 0.04
        requestAnimationFrame(update)
    }
    update()
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
            function get_text_time_from_now_to(to_date){
                const now = new Date();
                var diffTime = Math.abs((to_date - now)*5000);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                diffTime -= diffDays * (1000 * 60 * 60 * 24)
                const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                diffTime -= diffHours * (1000 * 60 * 60)
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                diffTime -= diffMinutes * (1000 * 60)
                const diffSeconds = Math.floor(diffTime / (1000));

                return `${diffDays}d ${fixed_zeros_num(diffHours, 2)}h ${fixed_zeros_num(diffMinutes, 2)}m ${fixed_zeros_num(diffSeconds, 2)}s`
            }
            
            var today = new Date()
            var death_date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()+1)
            
            function get_lifetime_text(){
                var life_time = get_text_time_from_now_to(death_date)
                return life_time
            }

            var strings = [
                "You are All Disgusting.", 
                "You don't even want to think", 
                "That You are Making Predators for Yourself,", 
                "And That You are All Perfect Victims.", 
                "Your Decisions Has No Meaning Anymore.", 
                "Get the Fuck Off This Board.", 
                "Or Pray That Your Last Thoughts...", 
                "Will Not Be Full of Taste of Your Liver.", 
            ]
            var current_string = 0
            var print_timer = 10
            var text_is_deleting = false
            var wait_timeout = null

            Destroy_Page_With_VideoBG(
                "https://t4.bcbits.com/stream/edb7076d22ba1e03e79b8c06ffb9dca1/mp3-128/776737745?p=0&ts=1616249791&t=6933124e242c0362e31fdcc816516d6aabbf4169&token=1616249791_b9bfd12c86ad852236f4d31d8ac6ee53abe46d0d",
                ["abandoned -dancing", "meat", "rain", "macro -lightbulb"],
                true,
                1,
                1/30,
                `
                <div class="crt-text" style="height: 1.3em; font-size: 8em; color: rgb(255 255 255); opacity: 0.5; font-family: congress;" id="printing_text_1"></div>
                <div class="crt-text" style="font-size: 2.4em; color: rgb(255 255 255); opacity: 0.2; font-family: congress">your remaining lifetime is:</div>
                <div class="crt-text" style="filter:blur(100px); font-size: 7em; color: rgb(255 255 255); opacity: 0.3; font-family: congress;" id="lifetime_text">${get_lifetime_text()}</div>
                `,
                function (){
                    
                },
                function (time){
                    document.getElementById("lifetime_text").innerHTML = get_lifetime_text()
                    if(print_timer<=0){
                        var text_el = document.getElementById("printing_text_1")
                        var target_text = strings[current_string]
                        if(!text_is_deleting){
                            if(text_el.innerHTML.length < target_text.length){
                                if(Math.random()<1){
                                    var char = target_text.charAt(text_el.innerHTML.length)
                                    text_el.innerHTML += char
                                    if(char == " ") text_el.innerHTML += target_text.charAt(text_el.innerHTML.length)
                                }
                            }else{
                                if(wait_timeout==null) wait_timeout = setTimeout(()=>{
                                    text_is_deleting = true
                                    wait_timeout = null
                                }, 1000)
                            }
                            print_timer = 4
                        }else{
                            if(text_el.innerHTML.length > 0){
                                if(Math.random()<1){
                                    r = Math.floor(Math.random()*text_el.innerHTML.length)
                                    text_el.innerHTML = text_el.innerHTML.substring(0, r)+text_el.innerHTML.substring(r+1)
                                    // if(text_el.innerHTML.charAt(text_el.innerHTML.length-1) == " ")
                                    //     text_el.innerHTML = text_el.innerHTML.substring(0, )
                                    // else
                                    //     text_el.innerHTML = text_el.innerHTML.substring(2)
                                }
                            }else{
                                if(wait_timeout==null) wait_timeout = setTimeout(()=>{
                                    text_is_deleting = false
                                    current_string = (current_string+1)%strings.length
                                    wait_timeout = null
                                }, 1000)
                            }
                            print_timer = 15
                        }
                    }
                    print_timer -= 1
                    document.getElementById("lifetime_text").style.filter = `blur(${(10/(time/20))**2+(Math.sin(time/4)+1)}px)`
                }
            )
        }
    },
    math: {
        destroy_page: ()=>{

            var canvas = null
            var ctx = null
            var textures = {
                'polunium': {frames_count: 80, sheet_size: 9, frame_size: 256, source: createImage("https://dl.dropboxusercontent.com/s/xbht5kvjdkl4nju/polunium.png")},
            }

            var sprites = []

            var pointers = []
            for (let i = 0; i < 5; i++) {
                pointers.push({
                    position: {x:0, y:0},
                    offset: {x:0, y:0},
                })
            }
            var next_sprite_id = 0

            function Sprite(tex){
                this.id = next_sprite_id
                next_sprite_id+=1

                this.is_dragging = false
                this.revert_animation = false
                if(Math.random()<0.5) this.revert_animation = true
                this.texture = tex
                this.scale = 1.5+(Math.random()-0.5)
                this.frame = 0
                this.position = {x:0, y:0}
                this.velocity = {x:0, y:0}
                this.animation_timer = 0
                this.animation_speed = 1
                this.can_spawn = false

                if(Math.random()<0.05){
                    this.animation_speed = 2
                    this.scale = 5.0
                }

                this.origin = this.texture.frame_size*this.scale/2

                this.draw_self = function(){
                    let frame_x = (this.frame%this.texture.sheet_size)*this.texture.frame_size
                    let frame_y = Math.floor(this.frame/this.texture.sheet_size)*this.texture.frame_size
                    ctx.drawImage(
                        this.texture.source, 
                        frame_x, frame_y, this.texture.frame_size, this.texture.frame_size,
                        this.position.x-this.origin,
                        this.position.y-this.origin,
                        this.texture.frame_size*this.scale, this.texture.frame_size*this.scale)
                }

                this.update_animation = function(){
                    if(this.animation_timer<=0){
                        this.frame = (this.frame+(this.revert_animation ? -this.animation_speed : this.animation_speed))%this.texture.frames_count
                        if(this.frame<0) this.frame = this.texture.frames_count-this.animation_speed

                        this.animation_timer = 1
                    }
                    this.animation_timer-=1
                }

                this.update_physics = function(){
                    this.velocity.y += 0.2

                    this.position.x += this.velocity.x
                    this.position.y += this.velocity.y

                    if(this.position.x-this.origin < 0){
                        this.velocity.x += (((0+this.origin)-this.position.x)/4 - this.velocity.x)/20
                    }else 
                    if(this.position.x+this.origin > canvas.width){
                        this.velocity.x += (((canvas.width-this.origin)-this.position.x)/4 - this.velocity.x)/20
                    }

                    if(this.position.y+this.origin > canvas.height){
                        this.velocity.y += (((canvas.height-this.origin)-this.position.y)/4 - this.velocity.y)/20
                    }else{
                        if(!this.is_dragging)
                            this.velocity.y += 0.2
                    }

                    if(this.position.y < -512){
                        if(this.can_spawn){
                            sprites.push(new Sprite(this.texture))
                            sprites[sprites.length-1].position.x = this.position.x
                            sprites[sprites.length-1].position.y = this.position.y
                            this.can_spawn = false
                        }
                    }else if(this.position.y>0){
                        this.can_spawn = true
                    }
                    this.velocity.x /= 1.01

                    for (let i = 0; i < sprites.length; i++) {
                        const other = sprites[i];
                        if(other!=this){
                            let dx = (other.position.x - this.position.x)
                            let dy = (other.position.y - this.position.y)
                            let dist =  (dx**2
                                        +dy**2)**0.5
                            
                            if(dist < this.origin){
                                this.velocity.x += (-dx/4 - this.velocity.x)/20
                                this.velocity.y += (-dy/4 - this.velocity.y)/20
                            }
                        }
                    }
                }

                this.update = function(){
                    this.update_physics()
                    this.update_animation()
                    this.draw_self()
                }
            }

            function resize_canvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            function get_sprite_under_cursor(x, y){
                var finded = null
                for (let i = 0; i < sprites.length; i++) {
                    const sprite = sprites[i];
                    let dist = ((x-sprite.position.x)**2
                                +(y-sprite.position.y)**2)**0.5
                    if(dist < sprite.origin*1){
                        finded = sprite
                    }
                }
                return finded
            }

            // event handlers
            function handle_touch_start(e, touch_id){
                var sprite = get_sprite_under_cursor(e.pageX, e.pageY)
                pointers[touch_id].position = {x: e.pageX, y: e.pageY}
                if(sprite){
                    sprite.is_dragging = true
                    pointers[touch_id].sprite = sprite
                    pointers[touch_id].offset.x = pointers[touch_id].position.x-pointers[touch_id].sprite.position.x
                    pointers[touch_id].offset.y = pointers[touch_id].position.y-pointers[touch_id].sprite.position.y
                }
            }
            function handle_touch_end(e, touch_id){
                if(pointers[touch_id].sprite){
                    pointers[touch_id].sprite.is_dragging = false
                }
                pointers[touch_id].sprite = null
            }
            function handle_touch_move(e, touch_id){
                pointers[touch_id].position.x = e.pageX
                pointers[touch_id].position.y = e.pageY
            }
            //

            function iterate_touches(touches, handler){
                for (var i = 0; i < Math.min(touches.length, pointers.length); i++) {
                    handler(touches[i], i)
                }
            }
            function on_canvas_touch_start(e){
                iterate_touches(e.changedTouches, handle_touch_start)
            }
            function on_canvas_touch_end(e){
                iterate_touches(e.changedTouches, handle_touch_end)
            }
            function on_canvas_touch_move(e){
                iterate_touches(e.changedTouches, handle_touch_move)
            }

            function update_pointers(){
                for (let i = 0; i < pointers.length; i++) {
                    const pointer = pointers[i];
                    if(pointer.sprite){
                        pointer.sprite.velocity.x += ((pointer.position.x - pointer.offset.x - pointer.sprite.position.x)/5 - pointer.sprite.velocity.x)/5
                        pointer.sprite.velocity.y += ((pointer.position.y - pointer.offset.y - pointer.sprite.position.y)/5 - pointer.sprite.velocity.y)/5
                    }
                }
            }

            function init(){
                sprites.push(new Sprite(textures['polunium']))
                sprites[sprites.length-1].position.x = 64
                sprites[sprites.length-1].position.y = 32
                sprites.push(new Sprite(textures['polunium']))
                sprites[sprites.length-1].position.x = canvas.width-64
                sprites[sprites.length-1].position.y = 32
            }
            function update(time){
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                update_pointers()

                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].update()
                }
            }

            Destroy_Page_With_VideoBG(
                "https://t4.bcbits.com/stream/91de046255a1a280ece358e29157a2ed/mp3-128/2415482906?p=0&ts=1616271214&t=bf6f4b535aa74e974f61a602c19e9b442d05003e&token=1616271214_c4ad524080a836011f913f9755de4fc5326de17c",
                [
                    "https://sun9-73.userapi.com/impg/NhVnJ1tkJt2YMeGj61N2YeWpbgh5VbZGEJp3VQ/DEyuW0olFIs.jpg?size=1024x825&quality=96&sign=8b533f9e0a96889ec1bc19bed8f438de&type=album",
                    "https://sun9-20.userapi.com/impg/r88UH1Yggq8koATkb6_T03AIkyqSd6AdMJg1sw/cqmJm0dqUBw.jpg?size=1024x724&quality=96&sign=e2abb92c5e0bfe2fdad8624b0e1c1408&type=album",
                    "https://sun9-60.userapi.com/impg/3jnukwp4A3etMGZzLgp6O3iYRI8FJmGO5IMwyw/BI9z2V_ffUY.jpg?size=1024x724&quality=96&sign=e0070bc819ec885c2b97223b80c6b587&type=album",
                    "https://sun9-74.userapi.com/impg/LT9ZWLuF42i5ltKf73zFAEBURTLS6q0kmblu2A/z1tw8kTtG2s.jpg?size=672x484&quality=96&sign=bf73af4628cfaf503f31f29f0b7a5230&type=album",
                    "https://sun9-61.userapi.com/impg/WfpcMFl149rs9QrUZOwVTQ0e-3rXqVgEjz33vg/veF4E6gAijE.jpg?size=555x498&quality=96&sign=b53dc87a02f9d5ab940e92007b312101&type=album",
                    "https://sun9-25.userapi.com/impg/5c3vsO1WcJG2mnOiTOywXqmEXk8H94WdDDjavQ/1UJ4UTh_j4Q.jpg?size=686x511&quality=96&sign=859266d782e06b80dcfc8efbab6a743a&type=album",
                    "https://sun9-71.userapi.com/impg/P0rhMlzBBw1MoizfodSxDFrMIQm7yMwJ0YrLKQ/rfR0Tp5rkhM.jpg?size=683x960&quality=96&sign=cc33154d185c0425053a2052ebf557f4&type=album",
                    "https://sun9-37.userapi.com/impg/jSpNOORWQPK_lJCaZyZPfiWLxEHFZVGRvGS9lQ/ubjtrr3arMc.jpg?size=780x1024&quality=96&sign=137407cb4c27d72878ace8d4e0e3467c&type=album",
                    "https://sun9-22.userapi.com/impg/8YL7201xjiQuyXkwqjJlUkorY4cCqFY4pjfqOQ/H3OpwQ960qE.jpg?size=730x1024&quality=96&sign=4d094bc97628d11ee71daf3efad46b9a&type=album",
                    "https://sun9-62.userapi.com/impg/A8Df-qmltkVFQ2z6m16gI45lGzqYTO9fQZHPlA/Kz1hgTB2gvs.jpg?size=520x492&quality=96&sign=5b447cd1338a2bb0cc6462452ff7d377&type=album",
                    "https://sun9-73.userapi.com/impg/b283kZ3bQxZfkD-S3uu-3ZTFCmkTdXac1di3NQ/mzGHiEv5lhY.jpg?size=1024x720&quality=96&sign=cf2da75343eed65b1982cfdb75ece4b1&type=album",
                    "https://sun9-17.userapi.com/impg/l2gbxElmSLsnUMR2p0r5jTZ2o6qLJnKTMUdyVg/Q_IUwpi-hfY.jpg?size=685x500&quality=96&sign=e45099d3740f354b58ace0bebd45b7b4&type=album",
                    "https://sun9-31.userapi.com/impg/sQWyDDIkhH1E3kOuRdOJOzRchdVZYzDtfJDOTg/QJGvI8Tew4Q.jpg?size=429x604&quality=96&sign=cbf7b13021d40dad743f7f4ed3b1dc72&type=album",
                    "https://sun9-13.userapi.com/impg/zazfhO4MpMEVOc0-T9pvBYNs6TqzygeSo3GoZQ/C_CN8Llie78.jpg?size=338x954&quality=96&sign=b394587d79021f33e8a6f29cf09cc62a&type=album",
                    "https://sun9-34.userapi.com/impg/5VMlwbah9Px-agXS35-oibcPorh3jYLStjXbFg/tu-DqnKmIH4.jpg?size=570x817&quality=96&sign=ba440128af98a2224ca1bcc80e3d8eb9&type=album",
                    "https://sun9-10.userapi.com/impg/cJ-5x_neHPXpl46mK6zKlQJBsbflaCsxoCCT_A/JarHGTW-E_Q.jpg?size=327x594&quality=96&sign=6fe32fa61b02ed5388d0f759ab612ab6&type=album",
                    "https://sun9-34.userapi.com/impg/e1bS9_8_MbTruG0XTF4DZlexsfav5qmjA_nrZg/lTyfwJiGq3c.jpg?size=600x490&quality=96&sign=4e762192231086035f29fe4d8ea17bb2&type=album",
                    "https://sun9-52.userapi.com/impg/UDuet6bPjxO_klmy1e-oEBU5dEDqo7KC_9aWwg/4LVzI2Jjrxs.jpg?size=478x604&quality=96&sign=2cf4ef00cc172f76c0d7d5a9594f5258&type=album",
                    "https://sun9-14.userapi.com/impg/V-osRTVhOjVBtoJrqVc1pavEfzIMC3rL9SaTIQ/2PJRPg7cxY4.jpg?size=1024x472&quality=96&sign=788747ffe26b6ee7536a22b8045b6910&type=album"
                ],
                false,
                10,
                1/16,
                `
                <div class="crt-text" style="font-size: 5.5em; color: rgb(255 255 255); opacity: 0.8; font-family: congress">Pathetic, Get Some Math Brains Instead.</div>
                <div class="crt-text" style="font-size: 1.6em; color: rgb(255 255 255); opacity: 0.6; font-family: congress">math is one of the biggest logical abstractions human made, they also includes wishes, hopes, good/evil.</div>
                <div class="crt-text" style="font-size: 1.2em; color: rgb(255 255 255); opacity: 0.5; font-family: congress">btw understanding of math indicates the ability to think complex, even if you dont know how to calculate integrals.</div>
                `,
                function (){
                    document.body.innerHTML += `
                    <canvas id="overlay_canvas" style="position: absolute; width: 100%; height: 100%;"></canvas>
                    `
                    canvas = document.getElementById("overlay_canvas")
                    window.addEventListener('resize', resize_canvas, false);

                    canvas.addEventListener("mousedown", (e)=>{handle_touch_start(e, 0)}, false);
                    canvas.addEventListener("mouseup", (e)=>{handle_touch_end(e, 0)}, false);
                    canvas.addEventListener("mousemove", (e)=>{handle_touch_move(e, 0)}, false);
                    canvas.addEventListener("touchstart", on_canvas_touch_start, false);
                    canvas.addEventListener("touchend", on_canvas_touch_end, false);
                    canvas.addEventListener("touchcancel", on_canvas_touch_end, false);
                    canvas.addEventListener("touchmove", on_canvas_touch_move, false);

                    resize_canvas()
                    ctx = canvas.getContext("2d")

                    init()
                },
                function (time){
                    update(time)
                }
            )
        }
    }
}

function options_from_string(string){
    var dict = {}
    string
    .replaceAll(" ", "")
    .split(";")
    .filter(x=>x!="")
    .map(x=>{
        let index = x.indexOf(":")
        return [x.substring(0, index), x.substring(index+1)]
    })
    .forEach(x=>dict[x[0]]=x[1])

    return dict
}

function Destroy_With_Music_Player(audio_url, artist, title, special_options){
    var bg_tags = special_options["bg_tags"].split(",") || ["abstract"]
    var pages_count = parseInt(special_options["pages_count"]) || 1
    var video_change_factor = eval(special_options["video_change_factor"]) || (1/30)

    Destroy_Page_With_VideoBG(
        audio_url,
        bg_tags,
        true,
        pages_count,
        video_change_factor,
        `
        <div class="crt-text" id="track_title" style="filter: blur(128px); height: 1.3em; font-size: 8.5em; color: rgb(255 255 255); font-family: congress;">${title}</div>
        <div class="crt-text" id="track_artist" style="filter: blur(128px); font-size: 2.5em; color: rgb(255 255 255); font-family: congress">by ${artist}</div>
        `,
        function (){
            
        },
        function (time){
            document.getElementById("track_title").style.filter  = `blur(${(10/(time/20))**2}px)`
            document.getElementById("track_artist").style.filter = `blur(${(10/(time/10))**2}px)`

            document.getElementById("track_title").style.opacity  = `${(Math.cos(time/3+0.2)/8)+0.5}`
            document.getElementById("track_artist").style.opacity  = `${(Math.sin(time/1.5)/8)+0.3}`
        }
    )
}

function Destroy_Page_by_Scene(scene_name, special_options){
    var success = false
    try{
        if(!document.hidden){
            if(scene_name!="special"){
                scenes[scene_name].destroy_page()
                success = true
            }else{
                if(special_options["action"] == "music"){
                    if(special_options["audio_url"] != ""){
                        var audio_url = special_options["track_url"]
                        var artist = special_options["artist"]
                        var title = special_options["title"]

                        Destroy_With_Music_Player(audio_url, artist, title, special_options)

                        success = true
                    }
                }
            }
        }
    }catch(e){
        console.error(e)
    }
    if(!success){
        document.body.innerHTML = ""
    }
}

function start_checking(){
    var check_interval = null
    // var noise_audio = new Audio("https://dl.dropboxusercontent.com/s/87tn8z5nu4a3aw3/noise_1.wav")
    // noise_audio.loop = true
    check_interval = setInterval(function(){
        get_close_config(function(data){
            var close_time = data["close_time"]
            var date = new Date()
            var current_time = date.getHours()*60*60 + date.getMinutes()*60 + date.getSeconds()
            console.log(close_time)
            if(current_time >= close_time && current_time < close_time + 60*2){
                clearInterval(check_interval)
                Destroy_Page_by_Scene(data["scene_name"], options_from_string(data["special_options"]))
                //FuckYourself_DestroyPage(noise_audio)
            }
        })
    }, 5000)
}


// End.
