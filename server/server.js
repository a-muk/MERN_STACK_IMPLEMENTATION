const express=require("express");
const app=express(); // const express=require("express"); //the builtin require function is the easiest way to include modules that exist in separate files.
// // The basic functionality of require is that it reads a JavaScript file, executes the file, and then proceeds to return the exports object.
const cors=require("cors");//
require("dotenv").config({path:"./config.env"}); //.config loads the .env file into the procceses.env file. What happens by this?
//https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7


const port=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record.js"));


const dbo=require("./db/conn"); //getting the driver connection 

app.listen(port, ()=>{
    dbo.connectToServer(function(err){
        if(err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});