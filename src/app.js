const express = require("express");
const path = require("path");
const hbs = require("hbs");
const signup = require("./models/registers");
const async = require("hbs/lib/async");
const { sign } = require("crypto");
require("../src/db/conn");


const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname,"../templates/views");
const publicpath = path.join(__dirname,"../public");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(express.static(publicpath));
app.set("view engine", "hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

//craete post method
app.post("/signup", async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password=== cpassword){
            const registeruser = new signup({
                name:req.body.name,
                email:req.body.email,
                phone_no:req.body.phone,
                gender:req.body.gender,
                age:req.body.age,
                address:req.body.address,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })
            const result = await registeruser.save();
            res.status(201).render("index")
        }
        else{
            res.send("Password are not matching")
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
})

//login part
app.post("/login",async (req, res)=>{
    try{
        const email= req.body.email;
        const pass = req.body.password;

        const emailresult = await signup.findOne({email:email});
        if(emailresult.password === pass){
           res.status(201).render("index");
        }else{
            res.send("Email or password is not matching");
        }

    }catch(err){
        res.status.send(err);
    }
})

app.listen(port,()=>{
    console.log(`Server is up and running at localhost:${port}`);
})