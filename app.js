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

// talks
var talks = Object.create(null);
//server is gonna just send JSON data and the client will handle it

router.add('GET', /^\/talks\/([^\/]+)$/,function (request, response, title) {
	if (title in talks) {
		respondJSON(response, 200, talks[title]);
	} else {
		respond(response, 404, 'Talk not '+ title + ' found');
	}
});