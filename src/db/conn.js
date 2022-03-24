const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/registraion_data",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

