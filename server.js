const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");


const app=express();
app.use(cors());
app.use(express.json())
const db=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"123456",
    database:"myjsmaster_app"
}).promise();


//signup , registers the user info to the database
app.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body;
   
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





app.listen(8081,()=>{
    console.log("Server running on port 8081");
})