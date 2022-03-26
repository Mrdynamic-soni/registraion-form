const express = require("express");
const mongoose = require("mongoose");
const db = "mongodb+srv://saurabh_soni:<9807#sonI>@cluster0.bwfc6.mongodb.net/registration-app?retryWrites=true&w=majority";
const localdb = "mongodb://localhost:27017/registraion_data";
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

