//1 import mongoose moddule
const mongoose=require('mongoose');

//2 create a database connection
// const connect=mongoose.connect("mongodb://localhost:27017/login-tut");
const connect=mongoose.connect("mongodb+srv://mrymrghb82:todoList@todo-v1.rlooada.mongodb.net/?retryWrites=true&w=majority");

//check database connected or not
connect.then(() =>{
    console.log("Database connected ");
})
.catch(() =>{
    console.log("Database cannot connected");
});

//create schema
const loginSchema = new mongoose.Schema[{
    name: {type: String,required:true},
    password: {type:String,required:true}
}];


//create a model
const collection = new mongoose.model("users",loginSchema);
//export model
module.exports=collection;