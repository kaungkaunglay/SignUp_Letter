//Require Links 
const express = require("express");
const bodyParser = require('body-parser');
const request= require("request"); 
const https = require("https"); 
app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/", function(req, res){
  const first_name =  req.body.first_name;
  const last_name  =  req.body.last_name;
  const email = req.body.email;
  const data = {
    members: [
        { 
           email_address: email,
           status: "subscribed",
           merge_fields: {
            FNAME: first_name,
            LNAME: last_name
           }
        }
    ]
  }
   var jsonData = JSON.stringify(data); 
    const url = "https://us14.api.mailchimp.com/3.0/lists/89639af737";
    const api_key = "Your api key";
    const options = {
        method: "POST",
        auth: "kaungkaung:"+api_key
    }
    const request = https.request(url, options, function(response){
        if(express.response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
             console.log(JSON.parse(data)); 
        })
    }); 
    
    request.write(jsonData); 
    request.end(); 
}); 
app.post("/failure", function(req, res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port: 3000") ; 
}); 
// API KEY 
// 61fc8445869e3acbc912948d769c639e-us14
// Audience ID
// 89639af737
