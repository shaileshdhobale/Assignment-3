//Create your first Node.js powered HTTP server that let’s users to download image files.

var http = require('http');
var fs = require('fs');
/*It will create server at http://127.0.0.1:8080
PARAMS : request,response
*/
var http = http.createServer(function(request, response){
	// It  will read the file name from url 
	fs.readFile("./"+request.url, function(error, data){
		if(error) { 
			// If file name is not present then will error message 
			response.writeHead(404, {"Content-type" : "text/plain"});
			response.end("Sorry This image is not present..");
		} else {
			// if present then it will display on the browser and download the image into images folder of the server.
			console.log('Server created http://127.0.0.1:8080');
			// find the file extension
			var ext = request.url.substr(request.url.lastIndexOf('.')+1);
			if(ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "bmp" || ext == "gif"){
				response.writeHead(200, {"Content-type" : "image/"+ext});
				response.end(data);
				// Download the file into images folder
				fs.writeFileSync('./images'+request.url, data);
				console.log(request.url+ ' is downloaded to the images folder..');
			} else {
				response.writeHead(404, {"Content-type" : "text/plain"});
				response.end("The file is not image file");
			}
		}
	});
}).listen(8080); // listening port
