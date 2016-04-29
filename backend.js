// Backend server that makes calls to SeatGeek API and sends results back to frontend.

var http = require("http");
var https = require("https");

http.createServer(function (request, response) {
	// Send the HTTP header 
	// HTTP Status: 200 : OK
	// Content Type: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
	makeAPICall(response);
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

var makeAPICall = function(response) {
	var db_response = "";
	var options = {
		host: 'api.seatgeek.com',
		path: '/2/events?performers.slug=washington-nationals&format=json',
		method: 'GET'
	}
	https.request(options, function(res) {
		console.log("API call made\n");
		// Read response from Seatgeek server chunk by chunk and append to db_response
		res.on('data', function(chunk) {
			db_response += chunk;
		});
		// When all data has been received, send to frontend
		res.on('end', function() {
			response.end(db_response);
		});
	}).end();
}