// import the expresss
require("dotenv").config();
const express = require("express");   
const app  = express();  //created app 
require("./db/connection")
const port = 8009 || process.env.PORT; // and then we  run the app in port 8009
const cors = require("cors");
const router = require("./routes/router")
const cookiParser = require("cookie-parser")


//app.get("/",(req,res)=>{
   // res.status(201).json("server created")
//});

app.use(express.json());
app.use(cookiParser());
app.use(cors());
//app.use(router);
app.use("/api/", require("./routes/router"));

const path = require("path");
//serving all the statick files like main.js,main.css-:
app.use(express.static(path.resolve(__dirname, "client", "build")));

//express will serve up the index.html file if routes doesnot match-:
app.get("*", (req, res) => {
  // console.log("Inside me");
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
});

