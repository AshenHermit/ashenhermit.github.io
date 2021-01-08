var GrayscalePipeline = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function GrayscalePipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader:`
                precision mediump float;
                uniform sampler2D uMainSampler;
                uniform float strength;
                uniform vec2 resolution;
                varying vec2 outTexCoord;

                #define CRT_CASE_BORD 0.0125
                
                void main(void){
                    vec2 uv = outTexCoord / resolution;
                    vec2 tc = outTexCoord;

                    float dx = abs(0.5-tc.x);
                    float dy = abs(0.5-tc.y);

                    dx *= dx;
                    dy *= dy;

                    tc.x -= 0.5;
                    tc.x *= 1. + (smoothstep(0., 1., dy) * 0.8);
                    tc.x += 0.5;

                    tc.y -= 0.5;
                    tc.y *= 1. + (smoothstep(0., 1., dx) * 0.8);
                    tc.y += 0.5;

                    // vec2 coord = tc;

                	vec4 rg = texture2D(uMainSampler, tc);
                    vec4 b = texture2D(uMainSampler, tc+vec2(2.*strength*uv.x,-2.*strength*uv.y));
                    vec4 front = vec4(b.r, rg.g, rg.b, rg.a);

                    // if (sin(tc.y*600.)>0.) {
                    //     front.rgb-=0.06;
                    //     front.a+=0.05;
                    // }
                    
                    
                    // vec3 h_color_top = vec3(0.,0.21,0.25);
                    // vec3 h_color_top = vec3(0.27,0.08,0.2);
                    // vec3 h_color_bottom = vec3(1.,0.95,0.55);
                    // float h_brt = 0.3 * front.r + 0.59 * front.g + 0.11 * front.b;
                    // h_brt*=1.1;
                    // h_brt+=0.05;
                    // vec4 h_grad_clr = vec4(h_color_bottom * (h_brt*2.), 1) + vec4(h_color_top * (1.19 - (h_brt)), 1);
                    // front.b=mod(clamp(front.b+0.,0.,0.6)+0.05,1.);
        
                    // gl_FragColor = mix(front*h_grad_clr+0.07,vec4(h_color_top,1.),0.4*front.a);
                    gl_FragColor = front;
                }
`
        });
    } 
});