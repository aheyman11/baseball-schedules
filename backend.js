// Backend server that makes calls to SeatGeek API and sends results back to frontend.

var http = require("http");
var https = require("https");

http.createServer(function (request, response) {
	// Send the HTTP header 
	// HTTP Status: 200 : OK
	// Content Type: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
	var team = request.url.substring(1); // remove leading '/' from request url
	makeAPICall(team, response);
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

// Makes call to SeatGeek API and sends response back to frontend
var makeAPICall = function(team, response) {
	var db_response = []; // Buffer to store response from database (SeatGeek) server

	var options = {
		host: 'api.seatgeek.com',
		path: '/2/events?performers.slug=' + team + '&format=json',
		method: 'GET'
	}
	https.request(options, function(res) {
		console.log("API call made\n");
		// Read response from Seatgeek server chunk by chunk and append to db_response
		res.on('data', function(chunk) {
			db_response.push(chunk);
		});
		// When all data has been received, send to frontend
		res.on('end', function() {
			response.end(Buffer.concat(db_response).toString());
		});
	}).end();
}