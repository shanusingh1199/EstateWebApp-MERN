import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDb');
}).catch((error)=>{
    console.log(error);
})

app.listen(3000,()=>{
    console.log("server is runnig on port 3000");
})

app.use("/api/user",userRouter)
