// Toy application to display the next 10 Nationals games.

const MAX_RESULTS = 10;
var responseJSON;

// Creates new XMLHttpRequest object to handle requests to backend server.
var xhttp;
if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
}
else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xhttp.open("GET", "http://127.0.0.1:8081/");
xhttp.send();

// Wait until response has been received, then handle text.
xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
    	handleResponseText(xhttp.responseText);
  	}
};

// Helper function to parse and display results.
var handleResponseText = function(text) {
	//console.log(text);
	var text_JSON = JSON.parse(text);
	for (var i = 0; i < MAX_RESULTS; i++) {
		var datetime = new Date(text_JSON.events[i].datetime_utc);
		var nextEntry = "<tr> <td>" + text_JSON.events[i].title + "</td> <td>" + datetime.toDateString() + "</td> <td>" + datetime.toTimeString() + "</td> <td> $" + text_JSON.events[i].stats.average_price + "</td> </tr>";
		$('#sched').append(nextEntry);
	}
}