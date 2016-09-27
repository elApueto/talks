// to handle requests to particular url (routing)
var http = require('http');
var URL = require('url');

var Router = module.exports = function () {
	this.routes = [];
} // we will use this constructor in server

Router.prototype.add = function (method, url, handler) {
	this.routes.push({
		method: method,
		url: url,
		handler: handler
	});
}

Router.prototype.resolve = function (request, response) {

	var path = URL.resolve(request.url).pathname; //requested path
	
	return this.routes.some(function (route) {
	
		var match = route.url.exec(path);

		if (!match || route.method !== request.method) {
			return false;
		}

		var urlParts = match.slice(1).map(decodeURIComponent);
		route.handler.apply(null, [request, response].concat(urlParts));
		return true;

	})

}
