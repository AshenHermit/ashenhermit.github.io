(this.webpackJsonpmy_diary_v2=this.webpackJsonpmy_diary_v2||[]).push([[0],{14:function(t,e,i){},15:function(t,e,i){},18:function(t,e,i){"use strict";i.r(e);var n=i(1),s=i.n(n),c=i(9),a=i.n(c),o=(i(14),i(2)),r=i(3),h=i(5),d=i(4),l=(i.p,i(15),["January","February","March","April","May","June","July","August","September","October","November","December"]),u=function(){function t(){Object(o.a)(this,t),this.title="track title",this.artist="artist",this.embedding_code=""}return Object(r.a)(t,[{key:"to_raw_data",value:function(){var t=JSON.parse(JSON.stringify(this));return t.embedding_code=btoa(t.embedding_code),t}}],[{key:"from_raw_data",value:function(e){e=Object.assign({},e);var i=new t;return Object.assign(i,e),i.embedding_code=atob(i.embedding_code),i}}]),t}(),m=function(){function t(){Object(o.a)(this,t),this.title="Title",this.description="Description",this.tracks=[],this.size=1,this.position=0}return Object(r.a)(t,[{key:"to_raw_data",value:function(t){return(t=JSON.parse(JSON.stringify(this))).tracks=this.tracks.map((function(t){return t.to_raw_data()})),t}}],[{key:"from_raw_data",value:function(e){e=Object.assign({},e);var i=new t;return Object.assign(i,e),i.tracks=i.tracks.map((function(t){return u.from_raw_data(t)})),i}},{key:"build_placeholder",value:function(){return new t}}]),t}(),p=function(){function t(){Object(o.a)(this,t),this.posts=[],this.DEBUG=!1,console.log("production")}return Object(r.a)(t,[{key:"loadPosts",value:function(t){var e=this;this.DEBUG?(this.posts=JSON.parse('[{"position":-0.5333333333333333,"title":"\u041e\u0436\u0438\u0434\u0430\u044f","description":"\u041d\u0430\u0447\u0430\u043b \u043f\u0438\u0441\u0430\u0442\u044c \u0434\u0432\u0438\u0436\u043e\u043a \u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 soulless moon (\u0441++).\\n\u041d\u0430\u043f\u0438\u0441\u0430\u043b \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u0438 \\n\u0438\u043d\u0442\u0435\u0440\u043f\u0440\u0435\u0442\u0430\u0442\u043e\u0440 branfuck\'\u0430 \u043d\u0430 \u0430\u0440\u0434\u0443\u0438\u043d\u043e (\u0441++).\\n\u041d\u0430\u0447\u0430\u043b \u043f\u0438\u0441\u0430\u0442\u044c \u0438\u0433\u0440\u043e\u0432\u043e\u0439 2d \u0434\u0432\u0438\u0436\u043e\u043a (\u0441++) \u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u0441\\n\u043a\u043e\u0441\u0442\u044f\u043c\u0438 \u0443 \u043c\u0435\u0448-\u0441\u043f\u0440\u0430\u0439\u0442\u043e\u0432.\\n\u041f\u0438\u0441\u0430\u043b 3\u0434 \u0438\u0433\u0440\u043e\u0432\u043e\u0439 \u0434\u0432\u0438\u0436\u043e\u043a \u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u0441 \\n\\"\u0442\u0430\u0439\u043b\u043e\u0432\u043e\u0439\\" \u0441\u0438\u0441\u0442\u0435\u043c\u043e\u0439 \u043a\u0430\u0440\u0442, \u043a\u0430\u043a \u0432 delver.\\n\u041f\u044b\u0442\u0430\u043b\u0441\u044f \u043f\u0438\u0441\u0430\u0442\u044c \u0431\u043b\u044d\u043a \u043c\u0435\u0442\u0430\u043b \u0432\u0434\u043e\u0445\u043d\u043e\u0432\u043b\u044f\u044f\u0441\u044c\\nsombres forets, \u043d\u0435 \u0432\u044b\u0448\u043b\u043e.","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09MTQ0MTc3NDQxNC9zaXplPWxhcmdlL2JnY29sPTMzMzMzMy9saW5rY29sPWUzMmMxNC90cmFja2xpc3Q9ZmFsc2UvYXJ0d29yaz1zbWFsbC90cmFjaz0yODEyNjM1NDczL3RyYW5zcGFyZW50PXRydWUvIiBzZWFtbGVzcz48YSBocmVmPSJodHRwOi8vc2VsZm11dGlsYXRpb25zZXJ2aWNlcy5jb20vYWxidW0vZmFpbGluZy10by1jb25mcm9udC1zdWljaWRhbC10aG91Z2h0cyI"}]},{"position":7.566666666666672,"title":"\u041a\u043e\u0434\u0430","description":"\u041f\u0440\u043e\u0449\u0430\u044e\u0441\u044c \u0441 \u0434\u0435\u0440\u0435\u0432\u043d\u0435\u0439\\n\\n+ \u041f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 Days \u0434\u043b\u044f \u043a\u0440\u0430\u0442\u043a\u043e\u0433\u043e \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044f \u0434\u043d\u0435\u0439\\n+ \u042d\u0442\u043e\u0442 \u0441\u0430\u0439\u0442","tracks":[{"embedding_code":"PGlmcmFtZSB3aWR0aD0iNTYwIiBoZWlnaHQ9IjMxNSIgc3JjPSJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9ST19EdU92V0FIYyIgZnJhbWVib3JkZXI9IjAiIGFsbG93PSJhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZSIgYWxsb3dmdWxsc2NyZWVuPSIiPjwvaWZyYW1lPg=="}]},{"position":7.16666666666667,"title":"\u041f\u0438\u043a\u0441\u0435\u043b\u044c\u043d\u044b\u0439 \u041f\u0441\u0438\u0445\u043e\u0434\u0435\u043b","description":"\u041f\u0438\u0448\u0443 \u043e\u0441\u043c\u044b\u0441\u043b\u0435\u043d\u043d\u044b\u0439 \u0441\u044e\u0436\u0435\u0442 \u043a\u043e\u043c\u0438\u043a\u0441\u0430 \u0438 \u0440\u0438\u0441\u0443\u044e \u043f\u0435\u0440\u0432\u044b\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b.\\n\u041c\u0435\u043d\u044f\u044e \u0440\u0438\u0441\u043e\u0432\u043a\u0443 \u043d\u0430 \u0431\u043e\u043b\u0435\u0435 \u043c\u044f\u0433\u043a\u0443\u044e, \u043c\u0438\u043d\u0438\u043c\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u0443\u044e, \\n\u043d\u043e \u043e\u0447\u0435\u043d\u044c \u043d\u0435\u043f\u0440\u0435\u0434\u0441\u043a\u0430\u0437\u0443\u0435\u043c\u0443\u044e.\\n","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09MTEwNTMwMjQwL3NpemU9bGFyZ2UvYmdjb2w9MzMzMzMzL2xpbmtjb2w9ZmZmZmZmL3RyYWNrbGlzdD1mYWxzZS9hcnR3b3JrPXNtYWxsL3RyYWNrPTEwMTAyNjA5NzUvdHJhbnNwYXJlbnQ9dHJ1ZS8iIHNlYW1sZXNzPjxhIGhyZWY9Imh0dHA6Ly9kb3duZmFsbG9mZ2FpYS5iYW5kY2FtcC5jb20vYWxidW0vYWVvbi11bnZlaWxzLXRoZS10aHJvbmVzLW9mLWRlY2F5LTIiPkFlb24gVW52ZWlscyB0aGUgVGhyb25lcyBvZiBEZWNheSBieSBEb3duZmFsbCBvZiBHYWlhPC9hPjwvaWZyYW1lPg=="}]},{"position":6.866666666666666,"title":"\u041f\u043b\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0414\u0440\u0435\u0432\u0435\u0441\u0438\u043d\u044b","description":"\u0412\u044b\u0436\u0438\u0433\u0430\u044e \u043a\u0430\u0439\u0444\u043e\u0432\u044b\u0435 \u0434\u044b\u043c\u044f\u0449\u0438\u0435\u0441\u044f \u0440\u0438\u0441\u0443\u043d\u043a\u0438 \u043d\u0430 \u0434\u0435\u0440\u0435\u0432\u0435.\\n\\n\u041f\u0438\u0448\u0443 \u043d\u0435\u0431\u043e\u043b\u044c\u0448\u043e\u0439 \u043f\u0438\u043a\u0441\u0435\u043b\u044c\u043d\u044b\u0439 top down \u0448\u0443\u0442\u0435\u0440 \u043f\u0440\u043e \u043f\u043e\u0435\u0437\u0434\u0430 \u043d\u0430 c++,\\n\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f \u043a\u043e\u0434 \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432 \u0438 \u0418\u0418 \u0438\u0437 NoumenalAnxiety.\\n\u0412 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440\u0430 \u043a\u0430\u0440\u0442 \u044f \u0441\u043d\u043e\u0432\u0430 \u0432\u044b\u0431\u0440\u0430\u043b \u0431\u043b\u0435\u043d\u0434\u0435\u0440.","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09MjgxNzU1NTYwMC9zaXplPWxhcmdlL2JnY29sPTMzMzMzMy9saW5rY29sPWZlN2VhZi90cmFja2xpc3Q9ZmFsc2UvYXJ0d29yaz1zbWFsbC90cmFjaz0zNDM4OTAzMTE3L3RyYW5zcGFyZW50PXRydWUvIiBzZWFtbGVzcz48YSBocmVmPSJodHRwczovL2VsaHVlcnZvLmJhbmRjYW1wLmNvbS9hbGJ1bS93b3JsZHMtZW5kIj5Xb3JsZCYjMzk7cyBFbmQgYnkgRWwgSHVlcnZvPC9hPjwvaWZyYW1lPg=="}]},{"position":6.533333333333335,"title":"\u041e\u0441\u043e\u0437\u043d\u0430\u043d\u043d\u044b\u0435 \u0441\u043d\u044b","size":0.5,"description":"","tracks":[{"embedding_code":"PGlmcmFtZSB3aWR0aD0iNTYwIiBoZWlnaHQ9IjMxNSIgc3JjPSJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9kcjhXSkZ3LWVjbyIgZnJhbWVib3JkZXI9IjAiIGFsbG93PSJhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZSIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPg=="}]},{"position":6.299999999999994,"title":"\u0412\u0438\u0431\u0440\u0430\u0446\u0438\u0438","description":"\u041f\u0438\u0441\u0430\u043b \u043c\u0435\u043b\u043e\u0434\u0438\u0447\u043d\u0443\u044e \u043c\u0443\u0437\u044b\u043a\u0443 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f \u0437\u0432\u0443\u043a\u0438 \u0437\u0430\u043f\u0438\u0441\u0430\u043d\u043d\u044b\u0435 \u043d\u0430 \u0440\u0435\u043a\u043e\u0440\u0434\u0435\u0440.\\n\u041f\u0438\u0441\u0430\u043b \u043c\u0435\u0442\u0430\u043b.\\n\u041d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0442\u0440\u0435\u043a\u043e\u0432 \u043e\u0431\u044a\u0435\u0434\u0438\u043d\u0438\u043b \u0432 \u0430\u043b\u044c\u0431\u043e\u043c (\\"June 2020\\" \u0443 \u043c\u0435\u043d\u044f \u0432 \u0430\u0443\u0434\u0438\u043e).\\n","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09Mjg3MzM1Mjc5L3NpemU9bGFyZ2UvYmdjb2w9MzMzMzMzL2xpbmtjb2w9ZmZmZmZmL3RyYWNrbGlzdD1mYWxzZS9hcnR3b3JrPXNtYWxsL3RyYWNrPTg4OTEzNjUzMC90cmFuc3BhcmVudD10cnVlLyIgc2VhbWxlc3M+PGEgaHJlZj0iaHR0cDovL2R2YTIuYmFuZGNhbXAuY29tL2FsYnVtL2JvdGFuaWN1bGEiPkJPVEFOSUNVTEEgYnkgRHZhPC9hPjwvaWZyYW1lPg=="}]},{"position":5.96666666666667,"title":"\u0413\u0430\u0440\u0440\u0438\u0441","description":"\u041f\u0438\u0441\u0430\u043b \u0430\u0434\u0434\u043e\u043d\u044b \u0434\u043b\u044f \u0433\u0430\u0440\u0440\u0438\u0441\u0430 \u0438 \u043b\u0435\u043f\u0438\u043b \u043a\u0430\u0440\u0442\u044b.\\n\\n+ \u0410\u0434\u0434\u043e\u043d \u043d\u0430 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442 \u043a\u043e\u0440\u043e\u0431\u043a\u0438 \u0444\u0438\u043a\u0441\u0438\u0440\u0443\u044e\u0449\u0435\u0439 \u0432\u0441\u0435 \u043e\u0431\u044a\u0435\u043a\u0442\u044b \u0432 \u0435\u0435 \u043f\u043e\u043b\u0435.\\n+ \u0410\u0434\u0434\u043e\u043d \u043d\u0430 \u0448\u0430\u0448\u043b\u044b\u043a\u0438 (\u043c\u0430\u043d\u0433\u0430\u043b, \u0448\u0430\u043c\u043f\u0443\u0440\u044b, \u0443\u0433\u043b\u0438, \u043c\u044f\u0441\u043e, \u043a\u0432\u0430\u0441, \u0440\u0430\u0437\u0434\u0435\u043b\u043e\u0447\u043d\u0430\u044f \u0434\u043e\u0441\u043a\u0430).\\n+ \u0410\u0434\u0434\u043e\u043d \u043d\u0430 \u0432\u043e\u0434\u0443 \u0438 \u0447\u0430\u0439\u043d\u0438\u043a \u0441 \u0434\u043e\u0448\u0438\u043a\u043e\u043c \u0438 \u043f\u0430\u043a\u0435\u0442\u0438\u043a\u043e\u043c \u0441\u043f\u0435\u0446\u0438\u0439.\\n+ \u0410\u0434\u0434\u043e\u043d \u043d\u0430 \u0440\u0435\u0433\u0434\u043e\u043b\u043b \u0412\u0430\u043d\u0438.\\n+ \u0410\u0434\u0434\u043e\u043d \u043d\u0430 \u0440\u0435\u0433\u0434\u043e\u043b\u043b \u041c\u0438\u0448\u0438.\\n+ \u041a\u0430\u0440\u0442\u0430 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u044b \u041c\u0438\u0448\u0438.\\n+ \u0410\u0434\u0434\u043e\u043d \u043d\u0430 \u043a\u0440\u0443\u0442\u0438\u043b\u043a\u0443.\\n\\n[\u0432\u0441\u0435 \u043c\u043e\u0438 \u0430\u0434\u0434\u043e\u043d\u044b](https://drive.google.com/drive/folders/1n-WwZ_4WKzufe5iVBaUlMbHcIL1kL9Ev)","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09MTMxNzQ2NzI4Ni9zaXplPWxhcmdlL2JnY29sPTMzMzMzMy9saW5rY29sPTRlYzVlYy90cmFja2xpc3Q9ZmFsc2UvYXJ0d29yaz1zbWFsbC90cmFjaz0xNzA0NTk4MzI5L3RyYW5zcGFyZW50PXRydWUvIiBzZWFtbGVzcz0iIj48YSBocmVmPSJodHRwOi8vbGViYW5vbmhhbm92ZXIuYmFuZGNhbXAuY29tL2FsYnVtL3RoZS13b3JsZC1pcy1nZXR0aW5nLWNvbGRlciI+VGhlIFdvcmxkIElzIEdldHRpbmcgQ29sZGVyIGJ5IExlYmFub24gSGFub3ZlcjwvYT48L2lmcmFtZT4="}]},{"position":5.5333333333333385,"title":"NoumenalAnxiety #2","description":"\u0412\u0435\u0441\u044c \u043c\u0435\u0441\u044f\u0446 \u0440\u0430\u0431\u043e\u0442\u0430\u043b \u043d\u0430\u0434 \u0438\u0433\u0440\u043e\u0439.\\n\\n+ \u0421\u044e\u0436\u0435\u0442.\\n+ \u0410\u0434\u0434\u043e\u043d \u0434\u043b\u044f \u0431\u043b\u0435\u043d\u0434\u0435\u0440\u0430 - \u044d\u043a\u0441\u043f\u043e\u0440\u0442 \u0441\u0446\u0435\u043d\u044b \u0432 \u043c\u043e\u0439 \u0444\u043e\u0440\u043c\u0430\u0442 \u043a\u0430\u0440\u0442.\\n+ \u0413\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044f \u043a\u0430\u0440\u0442.\\n+ \u0418\u0418 \u0438 \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f \u043f\u043e \u043a\u0430\u0440\u0442\u0435.\\n+ \u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0444\u043e\u0440\u043c\u0430\u0442\u0430 \u043e\u0431 \u043e\u0440\u0443\u0436\u0438\u0438, \u0432\u0440\u0430\u0433\u0430\u0445.\\n+ \u041f\u0435\u0440\u0432\u0430\u044f \u043d\u0435\u0442\u0435\u0441\u0442\u043e\u0432\u0430\u044f \u043a\u043e\u043c\u043d\u0430\u0442\u0430.","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09Nzk1NzgxMDY5L3NpemU9bGFyZ2UvYmdjb2w9MzMzMzMzL2xpbmtjb2w9ZmZmZmZmL3RyYWNrbGlzdD1mYWxzZS9hcnR3b3JrPXNtYWxsL3RyYWNrPTE0NjEwMTM3MDAvdHJhbnNwYXJlbnQ9dHJ1ZS8iIHNlYW1sZXNzPjxhIGhyZWY9Imh0dHA6Ly9pbm5lcnN1ZmZlcmluZy5iYW5kY2FtcC5jb20vYWxidW0vdW5pbnNwaXJlZC1lcCI+dW5pbnNwaXJlZCBFUCBieSBJbm5lciBTdWZmZXJpbmc8L2E+PC9pZnJhbWU+"}]},{"position":4.73333333333334,"title":"NoumenalAnxiety","description":"\u041d\u0430\u0447\u0438\u043d\u0430\u044e \u0434\u0443\u043c\u0430\u0442\u044c \u043e \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0438 \u0438\u0433\u0440\u044b \u0438 \u043f\u0438\u0448\u0443 \u043e\u0441\u043d\u043e\u0432\u0443 \u0434\u0432\u0438\u0436\u043a\u0430.\\n\\n+ \u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432.\\n+ \u0420\u0435\u043d\u0434\u0435\u0440\u0438\u043d\u0433 \u0442\u0435\u043a\u0441\u0442\u0443\u0440 \u0438 \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u0439.\\n+ \u0420\u0435\u043d\u0434\u0435\u0440\u0438\u043d\u0433 \u043a\u0430\u0440\u0442\u044b.\\n+ \u0424\u0438\u0437\u0438\u043a\u0430.\\n\\n\u0412 \u043a\u043e\u043d\u0446\u0435 \u043c\u0430\u044f \u0443\u0435\u0445\u0430\u043b \u0432 \u0434\u0435\u0440\u0435\u0432\u043d\u044e.","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09NDE2NDM2OTY0Mi9zaXplPWxhcmdlL2JnY29sPTMzMzMzMy9saW5rY29sPWZmZmZmZi90cmFja2xpc3Q9ZmFsc2UvYXJ0d29yaz1zbWFsbC90cmFjaz0zNzU5Njg1NDg3L3RyYW5zcGFyZW50PXRydWUvIiBzZWFtbGVzcz48YSBocmVmPSJodHRwOi8vYW5hdXR1bW5mb3JjcmlwcGxlZGNoaWxkcmVuLmJhbmRjYW1wLmNvbS9hbGJ1bS9hbGwtZmVsbC1zaWxlbnQtZXZlcnl0aGluZy13ZW50LXF1aWV0LTIiPkFsbCBmZWxsIHNpbGVudCwgZXZlcnl0aGluZyB3ZW50IHF1aWV0IGJ5IEFuIEF1dHVtbiBGb3IgQ3JpcHBsZWQgQ2hpbGRyZW48L2E+PC9pZnJhbWU+"}]},{"position":4.066666666666666,"title":"Stories","description":"\u041d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0435 \u043f\u0438\u0441\u0430\u0442\u044c \u0440\u0430\u0441\u0441\u043a\u0430\u0437\u044b.\\n\u041d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043b \u0432 \u0432\u043a.","tracks":[{"embedding_code":"PGlmcmFtZSBzdHlsZT0iYm9yZGVyOiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsiIHNyYz0iaHR0cHM6Ly9iYW5kY2FtcC5jb20vRW1iZWRkZWRQbGF5ZXIvYWxidW09MTMwMjk0OTE5Mi9zaXplPWxhcmdlL2JnY29sPTMzMzMzMy9saW5rY29sPWZmZmZmZi90cmFja2xpc3Q9ZmFsc2UvYXJ0d29yaz1zbWFsbC90cmFjaz0xODg5OTcwMTQwL3RyYW5zcGFyZW50PXRydWUvIiBzZWFtbGVzcz48YSBocmVmPSJodHRwOi8vYW5hdXR1bW5mb3JjcmlwcGxlZGNoaWxkcmVuLmJhbmRjYW1wLmNvbS9hbGJ1bS93aXRoZXJlZC1kcmVhbXMtc2luZ2xlcy0yMDEzLTIwMTciPldpdGhlcmVkIERyZWFtcyAoc2luZ2xlcyAyMDEzLTIwMTcpIGJ5IEFuIEF1dHVtbiBGb3IgQ3JpcHBsZWQgQ2hpbGRyZW48L2E+PC9pZnJhbWU+"}]}]'),this.posts=this.posts.map((function(t){return m.from_raw_data(t)})),t(this.posts)):fetch("https://dl.dropbox.com/s/so8ud7sp9lae0vj/memories.json").then((function(t){return t.json()})).then((function(i){e.posts=i.map((function(t){return m.from_raw_data(t)})),t(e.posts)}))}}]),t}(),b={clamp:function(t,e,i){return Math.max(e,Math.min(t,i))},mod:function(t,e){return t-e*Math.floor(t/e)},replaceRegexp:function(t,e,i){for(var n=t.match(e);n;)t=t.replace(n[0],i(n.slice(1))),n=t.match(e);return t},renderMarkup:function(t){return t=(t=this.replaceRegexp(t,/\[(.*)\]\((.*)\)/m,(function(t){return'<a target="_blank" href="'.concat(t[1],'">').concat(t[0],"</a>")}))).replace(new RegExp("\n","g"),"<br/>")},getPostNearestToPosition:function(t,e){for(var i=t[0],n=Math.abs(i.position-e),s=1;s<t.length;s++){var c=t[s],a=Math.abs(c.position-e);a<n&&(i=c,n=a)}return i},getLastPost:function(t){return Array.from(t).sort((function(t,e){return t.position>e.position?-1:t.position<e.position?1:0}))[0]}},v=b,_=i(6),y=i(0),j=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){var n;return Object(o.a)(this,i),(n=e.call(this,t)).state={month:0,year:2021},n.posts=[P],n.canvas_container_ref=s.a.createRef(),n.canvas_ref=s.a.createRef(),n.canvas=null,n.ctx=null,n.active_post=P,n.view_position=0,n.view_position_target=0,n.resizeCanvas=n.resizeCanvas.bind(Object(_.a)(n)),n.draw=n.draw.bind(Object(_.a)(n)),n.mousedown=n.mousedown.bind(Object(_.a)(n)),n.mousemove=n.mousemove.bind(Object(_.a)(n)),n.mouseup=n.mouseup.bind(Object(_.a)(n)),n.is_dragging=!1,n.drag_start_mouse_pos=0,n.drag_start_view_pos=0,n.last_month=0,N.year_circle_component=Object(_.a)(n),n}return Object(r.a)(i,[{key:"setPosts",value:function(t){this.posts=t}},{key:"updateViewDate",value:function(){var t=v.mod(Math.floor(this.view_position),12),e=2021+Math.floor(this.view_position/12);this.setState({month:t,year:e})}},{key:"checkNearestPost",value:function(){var t=v.getPostNearestToPosition(this.posts,this.view_position_target);t!=this.active_post&&this.setActivePost(t)}},{key:"setActivePost",value:function(t){this.view_position_target=t.position,this.active_post=t,this.is_dragging=!1,N.setActivePost(this.active_post)}},{key:"componentDidMount",value:function(){N.year_circle_component=this,this.setupCanvas(),this.draw()}},{key:"mousedown",value:function(t){this.is_dragging=!0,this.drag_start_mouse_pos=t.pageX,this.drag_start_view_pos=this.view_position_target}},{key:"mousemove",value:function(t){this.is_dragging&&(this.view_position_target=this.drag_start_view_pos+(t.pageX-this.drag_start_mouse_pos)/100,this.checkNearestPost())}},{key:"mouseup",value:function(t){this.is_dragging=!1}},{key:"setupCanvasEventListeners",value:function(){var t=this;this.canvas.addEventListener("mousedown",this.mousedown),window.addEventListener("mousemove",this.mousemove),window.addEventListener("mouseup",this.mouseup),this.canvas.addEventListener("touchstart",(function(e){return t.mousedown(e.changedTouches[0])})),window.addEventListener("touchmove",(function(e){return t.mousemove(e.changedTouches[0])})),window.addEventListener("touchend",(function(e){return t.mouseup(e.changedTouches[0])})),window.addEventListener("touchcancel",(function(e){return t.mouseup(e.changedTouches[0])}))}},{key:"setupCanvas",value:function(){this.canvas=this.canvas_ref.current,this.ctx=this.canvas.getContext("2d"),new ResizeObserver(this.resizeCanvas).observe(this.canvas_container_ref.current),this.resizeCanvas(),this.setupCanvasEventListeners()}},{key:"resizeCanvas",value:function(){var t=this.canvas_container_ref.current.getClientRects()[0];this.canvas_container_ref.current.style.height=t.width+"px",t.height=t.width,this.canvas.width=t.width,this.canvas.height=t.height}},{key:"drawCircle",value:function(t){this.ctx.lineWidth=8;for(var e=0;e<12;e++){var i=2*Math.PI/12,n=2*Math.PI/12/2;this.ctx.strokeStyle="#353535",this.ctx.beginPath(),this.ctx.arc(this.canvas.width/2,this.canvas.height/2,t,n+e*i,n+e*i+.95*i),this.ctx.stroke()}}},{key:"drawViewPosition",value:function(t){var e=i.postPositionToAngle(this.view_position),n=Math.cos(e),s=Math.sin(e);this.ctx.lineWidth=5,this.ctx.strokeStyle="#fff",this.ctx.globalAlpha=.1,this.ctx.beginPath(),this.ctx.moveTo(this.canvas.width/2+n*(.5*t),this.canvas.height/2+s*(.5*t)),this.ctx.lineTo(this.canvas.width/2+n*(.8*t),this.canvas.height/2+s*(.8*t)),this.ctx.stroke(),this.ctx.globalAlpha=1}},{key:"drawPost",value:function(t,e){var n=i.postPositionToAngle(t.position),s=Math.cos(n)*e,c=Math.sin(n)*e;if(this.ctx.globalAlpha=.5*v.clamp(1-Math.abs(this.view_position-t.position)/3,0,1),this.ctx.globalAlpha>0){this.ctx.lineWidth=5,this.ctx.strokeStyle=t==this.active_post?"#ffc677":"#353535",this.ctx.fillStyle="#fff",t==this.active_post&&(this.ctx.fillStyle="#ffc677",this.ctx.globalAlpha=1),this.ctx.save();var a=Math.floor(e/15);this.ctx.font=a+"px monospace",this.ctx.translate(this.canvas.width/2,this.canvas.height/2),s>0?(this.ctx.rotate(n),this.ctx.translate(1.12*e,4),this.ctx.textAlign="left"):(this.ctx.rotate(n+Math.PI),this.ctx.translate(1.12*-e,4),this.ctx.textAlign="right"),this.ctx.fillText(t.title,0,0),this.ctx.restore(),this.ctx.beginPath(),this.ctx.arc(this.canvas.width/2+s,this.canvas.height/2+c,t.size*e/10,0,2*Math.PI),this.ctx.fill()}this.ctx.globalAlpha=1}},{key:"draw",value:function(){requestAnimationFrame(this.draw),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.view_position+=(this.view_position_target-this.view_position)/3;var t=.3*this.canvas.width;this.drawViewPosition(t),this.drawCircle(t);for(var e=0;e<this.posts.length;e++){var i=this.posts[e];i!=this.active_post&&this.drawPost(i,t)}this.drawPost(this.active_post,t),Math.floor(this.view_position)!=this.last_month&&this.updateViewDate(),this.last_month=Math.floor(this.view_position)}},{key:"render",value:function(){return Object(y.jsxs)("div",{ref:this.canvas_container_ref,className:"year-circle",children:[Object(y.jsxs)("div",{className:"year-circle-view-date",children:[Object(y.jsx)("div",{className:"year-circle-view-date-year",children:this.state.year}),Object(y.jsx)("div",{className:"year-circle-view-date-month",children:l[this.state.month]})]}),Object(y.jsx)("canvas",{ref:this.canvas_ref,className:"year-circle-canvas"})]})}}],[{key:"postPositionToAngle",value:function(t){var e=2*Math.PI/12*2.5,i=t/12*2*Math.PI;return i+=e}}]),i}(s.a.Component),f=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){var n;return Object(o.a)(this,i),(n=e.call(this,t)).onChange=n.onChange.bind(Object(_.a)(n)),n.input_ref=s.a.createRef(),n}return Object(r.a)(i,[{key:"onChange",value:function(t){console.log(t.target),this.props.edit_mode_fields[this.props.field_key]=this.input_ref.current.value}},{key:"componentDidMount",value:function(){this.input_ref.current.innerHTML=this.props.defaultValue}},{key:"componentDidUpdate",value:function(){this.input_ref.current.innerHTML=this.props.defaultValue}},{key:"render",value:function(){return Object(y.jsx)("div",{ref:this.input_ref,className:"input "+this.props.className,onInput:this.onChange,contentEditable:"true"})}}]),i}(s.a.Component),W=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"edit_render",value:function(){}},{key:"default_render",value:function(){}},{key:"render",value:function(){return this.props.is_in_edit_mode?this.edit_render():this.default_render()}}]),i}(s.a.Component),Z=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"edit_render",value:function(){return Object(y.jsx)(f,{field_key:"post_title",edit_mode_fields:this.props.edit_mode_fields,className:"title",defaultValue:this.props.text})}},{key:"default_render",value:function(){return Object(y.jsx)("div",{className:"title",children:this.props.text})}}]),i}(W),g=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"edit_render",value:function(){return Object(y.jsx)(f,{field_key:"post_title",edit_mode_fields:this.props.edit_mode_fields,className:"description",defaultValue:this.props.text.replaceAll("\n","<br/>")})}},{key:"default_render",value:function(){return Object(y.jsx)("div",{className:"description",dangerouslySetInnerHTML:{__html:v.renderMarkup(this.props.text)}})}}]),i}(W),w=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){var n;return Object(o.a)(this,i),(n=e.call(this,t)).state={active_post:P},n}return Object(r.a)(i,[{key:"componentDidMount",value:function(){N.main_content_component=this}},{key:"setActivePost",value:function(t){this.setState({active_post:t})}},{key:"render",value:function(){return Object(y.jsxs)("div",{className:"main-content",children:[Object(y.jsx)(j,{}),Object(y.jsxs)("div",{className:"post-info",children:[Object(y.jsx)(Z,{text:this.state.active_post.title,is_in_edit_mode:N.is_in_edit_mode,edit_mode_fields:N.edit_mode_fields}),Object(y.jsx)(g,{text:this.state.active_post.description,is_in_edit_mode:N.is_in_edit_mode,edit_mode_fields:N.edit_mode_fields})]})]})}}]),i}(s.a.Component),x=i(8),M=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"render",value:function(){return Object(y.jsx)("div",{className:"track",children:Object(y.jsx)("div",{className:"track-embedding",dangerouslySetInnerHTML:{__html:this.props.track.embedding_code}})})}}]),i}(s.a.Component),O=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){var n;return Object(o.a)(this,i),(n=e.call(this,t)).state={active_post:P},N.music_menu_component=Object(_.a)(n),n.frame=s.a.createRef(),n.is_shown=!0,n}return Object(r.a)(i,[{key:"setActivePost",value:function(t){this.setState({active_post:t})}},{key:"show",value:function(){this.frame.current.style.top="0px",this.is_shown=!0}},{key:"hide",value:function(){this.frame.current.style.top="-100vh",this.is_shown=!1}},{key:"render",value:function(){return Object(y.jsx)("div",{className:"music-menu",ref:this.frame,children:Object(y.jsx)("div",{className:"tracks-list",children:this.state.active_post.tracks.map((function(t,e){return Object(y.jsx)(M,{track:t},"track_"+e)}))})})}}]),i}(s.a.Component),k=function t(){Object(o.a)(this,t)},Y=function(){function t(e){Object(o.a)(this,t),this.api=e,this.music_menu_component=null,this.main_content_component=null,this.year_circle_component=null,this.active_post={},this.posts=[],this.is_in_edit_mode=!1,this.edit_mode_fields=new k}return Object(r.a)(t,[{key:"addPlaceholderPost",value:function(){var t=m.build_placeholder();t.position=0,t.title="memories are loading...",t.description="please wait",t.size=1,this.posts.push(t)}},{key:"initialize",value:function(){var t=this;this.addPlaceholderPost(),this.year_circle_component.setPosts(this.posts),this.year_circle_component.setActivePost(this.posts[0]),x.isMobile&&this.hideMusicMenu(),this.api.loadPosts((function(e){t.posts=e,t.year_circle_component.setPosts(t.posts),t.year_circle_component.setActivePost(v.getLastPost(t.posts))}))}},{key:"setActivePost",value:function(t){this.active_post=t,this.main_content_component.setActivePost(this.active_post),this.music_menu_component.setActivePost(this.active_post)}},{key:"showMusicMenu",value:function(){this.music_menu_component.show()}},{key:"hideMusicMenu",value:function(){this.music_menu_component.hide()}},{key:"toggleMusicMenu",value:function(){this.music_menu_component.is_shown?this.hideMusicMenu():this.showMusicMenu()}},{key:"enterEditMode",value:function(){this.is_in_edit_mode=!0,this.music_menu_component.forceUpdate(),this.main_content_component.forceUpdate()}},{key:"exitEditMode",value:function(){this.is_in_edit_mode=!1,this.music_menu_component.forceUpdate(),this.main_content_component.forceUpdate()}},{key:"toggleEditMode",value:function(){this.is_in_edit_mode=!this.is_in_edit_mode,this.music_menu_component.forceUpdate(),this.main_content_component.forceUpdate()}}]),t}(),z=new p,N=new Y(z),P=m.build_placeholder();window.api=z,window.client=N,window.utils=v;var G=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"render",value:function(){return Object(y.jsx)("button",{className:"icon-button",onClick:this.props.onClick,children:Object(y.jsx)("img",{src:this.props.icon_src})})}}]),i}(s.a.Component),R=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"render",value:function(){return Object(y.jsxs)("div",{className:"top-bar",children:[Object(y.jsx)(G,{icon_src:"res/pencil_and_paper.png",onClick:function(){N.toggleEditMode()}}),Object(y.jsx)(G,{icon_src:"res/notes.png",onClick:function(){N.toggleMusicMenu()}})]})}}]),i}(s.a.Component),F=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"render",value:function(){return Object(y.jsx)("div",{className:"footer"})}}]),i}(s.a.Component),I=function(t){Object(h.a)(i,t);var e=Object(d.a)(i);function i(t){return Object(o.a)(this,i),e.call(this,t)}return Object(r.a)(i,[{key:"componentDidMount",value:function(){N.initialize()}},{key:"render",value:function(){return Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)(O,{}),Object(y.jsx)(R,{}),Object(y.jsx)(w,{}),Object(y.jsx)(F,{})]})}}]),i}(s.a.Component);a.a.render(Object(y.jsx)(s.a.StrictMode,{children:Object(y.jsx)(I,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.7b64a83b.chunk.js.map