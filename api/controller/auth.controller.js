import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signup =async (req,res,next)=>{

    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser= new User({username,email,password:hashedPassword})
    
    try {
        await newUser.save()
        res.status(200).json(new ApiResponse(

            200,
            newUser,
            "user created successfully"
        )
        )
    } catch (error) {
        next( new ApiError(500,"error from a function"));
    }
}