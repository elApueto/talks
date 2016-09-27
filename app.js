var http = require('http');
var Router = require('./router')
var Mime = require('mime');
var Url = require('url');
var Ecstatic = require('ecstatic');

var fileServer = ecstatic({root: './public'});
var router = new Router();

http.creatServer (function (request, response) {
	if (!router.resolve(request, response)) {
		fileServer(request, response);
	}
}).listen(8000);

function respond(response, status, data, type) {
	response.writeHead(status, {
		'Content-Type': type || 'text/plain'
	});
	response.end(data);
} 

function respondJSON(response, status, data) { // stringified JSON
	respond(response, status, JSON.stringify(data), 'application/json');
}

