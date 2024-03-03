
const mongoose = require("mongoose");

require('dotenv').config();

//const DB = process.env.MONGODB_URL


mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("Database connected")).catch((errr)=>{
    console.log(errr);
})