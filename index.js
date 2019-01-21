const http = require('http');
const url = require('url');
const StringDecoder =  require('string_decoder').StringDecoder;

//create a server to listen to requests
let server = http.createServer(function(req, res) {
  //get the url and parse it
let parsedUrl = url.parse(req.url, true);

//get the path that the user is routing to and trimm it
let path = parsedUrl.pathname;
let trimmedPath = path.replace(/^\/+|\/+$/g, "");

//get the payload from the request
let decoder =  new StringDecoder('utf-8');
let buffer = "";

//append the data to buffer
req.on("data", function(data){
  buffer += decoder.write(data);
});

req.on("end", function(){
  if(trimmedPath == 'hello'){
    buffer+= decoder.end();
    res.writeHead(200);
    res.end(JSON.stringify({'message':'Hey! You are welcome', 'data': buffer}));
  }
});
});

server.listen(3000, function() {
  console.log("the server is listening on PORT: 3000")
})