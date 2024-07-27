import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGN,
    credentials: true, //i have to study more about it
  })
); //CORS_ORIGN: this is veriable that defined that which url get data from frontend and we aslo make for all like gitapi by init *

app.use(express.json({ limit: "16kb" }));
//here we define memoery of json aceepted less than 16kb

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
//here we fine if browser add some extra charracer it shuld convert it.
app.use(express.static("public"));
//i storedfile data like img
app.use(cookieParser());
//to save or put cookie in user browser
//------------x--------------x------------x-----------x--------
//router import
import userRouter from "./routes/user.routes.js";   

//router declararion
app.use("/api/v1/users", userRouter);

//http://localhost:8000/api/v1/users/register

export default app;
