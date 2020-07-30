//LOADING EXPRESS
var express = require("express");
//INITIALIZING EXPRESS
var app = express();
//LOADING REQUEST
var request = require("request");
//GRANTING EXPRESS ACCESS TO PUBLIC FOLDER WHEN NEEDED
app.use(express.static("public"));
//LET EXPRESS KNOW WE'RE USING EJS FILES AHEAD OF TIME, SO .EJS NOT REQ ON ROUTES
app.set("view engine","ejs");

//HOME PG ROUTE
app.get("/",function(req,res){
    res.render("search");
});

//RESULTS PG ROUTE
app.get("/results",function(req,res){
    var query = req.query.search;//search is the variable for the user's input in input field
    var api_url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";//attaching user's query to the api call
    request(api_url,function(error,response,body){//placing api call in request function
        if(!error && response.statusCode == 200){//if there's no error and we ge an OK status
            var data = JSON.parse(body);//movie info displayed on page
            res.render("results", {data:data});
        }
    });
});




//SERVER LISTENING FOR LOCAL, OR PORT FOR WHEN DEPLOYED...
app.listen(process.env.PORT || 3000,function(){
    console.log("Server listening on port 3000.")
});