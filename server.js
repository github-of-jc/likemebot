var http = require("http");

var server = http.createServer(function(request, response){
	if (request.url === '/'){
		// for html
		response.setHeader('Content-Type', 'text/html');
		//render the html response
		response.end('<strong> bear!</strong>')
	}
});

server.listen(8080, function(){
	console.log('Im listening on 8080'); 
});