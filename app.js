//Require Links 
express = require("express");
const bodyParser = require('body-parser');
request= require("request"); 

app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/", function(req, res){
  var first_name =  req.body.first_name;
  var last_name  =  req.body.last_name;
  var email = req.body.email;
  res.send(first_name);
}); 
app.listen(3000, function() {
    console.log("Listening on port: 3000") ; 
}) ; 

