const path = require('path');
var http = require('http');
const process = require('process');
var express = require('express'),
    app = module.exports.app = express();

var server = http.createServer(app);
server.listen(3000,process.argv[2]);  //listen on port 3000
console.log("created server: "+process.argv[2]+":3000");

app.use(express.static(path.join(__dirname, '/')));

app.get('/*', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'for u.html'));
});