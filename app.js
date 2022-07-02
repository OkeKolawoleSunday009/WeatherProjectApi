const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));

// app.get("/", function(req, res){

   
//     // res.send("Server is up and running"); 
//     //we can have two res.send
// });
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")

})
app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "df488484619324f82090f1041f282b5c"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="  + apiKey + ""

    https.get(url, function(response){
         console.log(response.statusCode);

          response.on("data", function(data){
           const weatherData = JSON.parse(data)
           const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
           const icon = weatherData.weather[0].icon
           const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather of " + query + " is currently " + weatherDesc + "</p>");
        
             res.write("<h1>The temperature " + query + " is " + temp + "degree Celsius. </h1>");
            res.write("<img src= " + imageURL +  ">")
             res.send()
         }) 
       
    });
    // res.sendFile(__dirname + "/index.html")

})
app.listen(3000, function(){
    console.log("server is running on port 3000");
})
