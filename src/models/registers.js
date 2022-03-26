const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
// const res = require("express/lib/response");


const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_no:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmpassword:{
        type:String,
        required:true,
        unique:true
    },
    tokens:[{
        token:{
            type:String,
            required:true,
            unique:true
        }
    }]

})

//jwt authentication
userschema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        // res.send(err);
        console.log(err);
    }

}

//password hashing
userschema.pre("save",async function(next){
    if(this.isModified("password")){
    // const passhash = await bcrypt.hash(password,10);
        this.password = await bcrypt.hash(this.password,10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,10);
        // this.confirmpassword = undefined;
    }
    next();
})
///craete a collection

const signup = new mongoose.model("register",userschema );

module.exports = signup;