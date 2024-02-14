//import modules we need
const express=require('express');
const pasth=require("path");
const bcrypt=require("bcrypt");
//import modle from config,js
const collection=require("./config")

//create express app
const app=express();

//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extends:false}));


//set ejs as the view engine
app.set('view engine','ejs');

//for use css

app.use(express.static("public"));

app.get("/",(res,req) =>{
    res.render("login");
});

app.get("/signup",(res,req) =>{
    res.render("signup");
});

//signup page=>register user
app.post("/signup",async (req,res) =>{
    const data= {
        name: req.body.username,
        password: req.body.password
    }

    //check if user already exists in db
    const existsUser= await collection.findOne({name: data.name});
    
    //if user exist then try another name
    if(existsUser){
        res.send("user alresdy exists.Please enter a diffrent username.");
    }
    else{
        //hash the pass with bcrypt
        const Rounds=10; //number of round for bcrypt
        const hashPassword = await bcrypt.hash(data.password,Rounds);

        //replace hashpass with orjinalpass
        data.password=hashPassword;



        //send data in database
        const userdata=await collection.insertMany(data);
        console.log(userdata);
    }
});

//login user
app.post("/login", async (req,res) =>{
try{
   const check=await collection.findOne({name: req.body.username});//check user if user not register in db then:
   if(!check){
    res.send("username cannot find");
   }

   //compare the hash pass from db
   const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
   if(isPasswordMatch){
    res.render("home");
   }else {
    req.send("the password is not correct");
   }
}catch{
     res.send("wrong details");
 }
});


//create and use server
const port=5000;
app.listen(port,() =>{
    console.log(`server running on port : ${port}`);
})