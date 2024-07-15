import { ApiError } from "./ApiError.js";
import jwt from "jsonwebtoken"
export const verifyToken=(req,res,next)=>{
    const token = req.cookies.access_token || req.headers['authorization'];

    if(!token) return next(new ApiError(401,"Unauthorized no token recived "))

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(new ApiError(403, 'Forbidden'));
        
            req.user = user;
            next();
          });

    }