const express=require("express");
const app=express();
const https=require("https");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended: true}))


/*Hier wird der Html file gelesen*/
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
   /* 
    */
    
})
/* es wird die data and der appi gesendet */
app.post("/",function(req,res){
    const city = req.body.cityName;
    const apikey="353695c45eac57b7362f129c86f212fc";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + apikey
    https.get(url,function(response){
       
       // console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            //console.log(weatherdata);
            const temp =weatherdata.main.temp;
            const icon=weatherdata.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            const weatherDescription=weatherdata.weather[0].description;
           res.write("<p>The weather is currently "+weatherDescription+ "<p>");
           res.write("<h1>the temperature in "+city +" is "+temp+"kelvin </h1>");
           res.write("<img src="+ imageURL+">")
           res.send();
        })
    })
})

/*es wird hier ein port für der app gewählt*/
app.listen(2004,function(){
    console.log("app listen on port 2004");
})
