import express from "express";
//Other way to import
//const express=require("express");
import cors from "cors"
import mongoose from "mongoose";

const app=express();
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

//for creating data and connect database

mongoose.connect("mongodb://127.0.0.1:27017/LoginRegisterDB"),{
    useNewurlParser:true,
    useUnifiedTopology:true,

},
//routes
app.post("/login",(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
          if(password===user.password){
            res.send({message:"Login sucessful",user:user});
          }
          else{
            res.send({
                message:"Passoword did't match"
            })
          }

        }
        else{
            res.send("User not registerd");
        }
    })
})
app.post("/register",(req,res)=>{
    //res.send("My Api register");
    //console.log(req.body);
    const {name,email,password}=req.body
    // for checking user already exist 
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User alredy register"});
        }
        else{
            const user=new User({
                name,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send({message:"Successfully Regsiterd"})
                }
            })
        }
    })
    
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
//After creating schema we have to create model
const User =new mongoose.model("User",userSchema)


app.listen(9002,()=>{
    console.log("Db started at 9002 port");
})