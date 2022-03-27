const express = require("express");
const mongoose = require("mongoose");
const db = "mongodb+srv://soni:soni@cluster0.trxai.mongodb.net/registraion_app?retryWrites=true&w=majority";
//mongodb+srv://saurabh_soni:sonI#12@cluster0.g5utw.mongodb.net/registraion-app?retryWrites=true&w=majority
const localdb = "mongodb://localhost:27017/registraion_data";
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

