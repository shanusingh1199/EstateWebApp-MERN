import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import { signup } from './controller/auth.controller.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDb');
}).catch((error)=>{
    console.log(error);
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

app.use(express.json())

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
