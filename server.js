const express=require("express");
const dotenv=require("dotenv")
const mysql=require("mysql2");
const cors=require("cors");

dotenv.config()
const app=express();
app.use(cors());
app.use(express.json())
const db=mysql.createPool({
    host:"eu-cdbr-west-03.cleardb.net",
    user:"b61ec8e5b928a0",
    password:"0e55564a",
    database:"heroku_88fea0cc921717e"
}).promise();

app.get("/signup",(req,res)=>{
    res.send("Welcome to my app")
})
//signup , registers the user info to the database
app.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body;
    console.log(req.body)
   
    const result=await db.query(`
  INSERT
  INTO signup (name,email,password)
  VALUES (?,?,?)`,[name,email,password]);
   res.status(201).send({message:"Register successful"})
    
});
//login route
app.post("/login",async (req,res)=>{
   
    const result=await db.query("SELECT*FROM signup WHERE email=? AND password=?",
    [req.body.email,req.body.password]);
    console.log(result[0].length)
    if(result[0].length===0){
        res.status(401).send({message:"Invalid credentials"});
    }else{
        res.status(200).send({message:"Login successful"});
    }
  
    
});



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("Server running on port 8081");
})