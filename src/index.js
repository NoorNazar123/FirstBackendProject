// require('dotenv').config({path: './env'})
import app from "./app.js"; 
import connectDB from "./db/index.js"; 
//optional but best practice that when mongo db connected so .env file at once reach to all place where it used. and we have cinfigure in script file to if we use import sentax for .env
import dotenv from "dotenv"
dotenv.config({
    path:'./.env', 
}) 
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000), ()=>{
        console.log(`Server is runing at: ${process.env.PORT}`);
    };
    app.on("error", (err)=> {
        console.log("Express Error !!", err); 
    })
}) 
.catch((error)=>{
    console.log("Mongo db Errror:", error);
});

 



// ===========first way=====================

// import mongoose from "mongoose"; 
// import { DB_NAME } from "./constants.js"; 
// import  express  from "express";
 
// const app = express();  

// ;(async ()=>{ 
//    try {
//       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//       console.log(`MongoDB connected ${connectionInstance.connection.host}`);
//       app.on("error", (error)=>{
//          console.log("Express Fail:", error);
//          throw error
//       })
//       app.listen(process.env.PORT,()=>{
//          console.log(`Server runing on port: ${process.env.PORT}`);
//       })
//    } catch (error) {
//      console.error("Mongo db Fail:", error);
      
//    }
// })()





