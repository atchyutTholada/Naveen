import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../Database/dbConnect.js";
import { register, login } from "./controllers/user.controllers.js";
import userRoute from "../Routes/user.route.js";
import cookieParser from "cookie-parser";





dotenv.config({});

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/register", register);
app.post("/api/login", login);

const PORT = process.env.PORT || 3000;

// default middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin:"http://localhost:8080",
     credentials:true
}))

//apis

app.use("/api/v1/user", userRoute);

app.get("/home",(_,res)=>{
  res.status(200).json({
    success:true,
    message:"Hello iam coming from backend"
  })
})

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});

