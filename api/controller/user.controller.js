import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcryptjs from 'bcryptjs';
import {ApiResponse}  from '../utils/ApiResponse.js'
import Listing from "../models/listing.model.js"
export const test = (req, res) => {
  res.json({
    message: "hello world",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new ApiError(401, "you can update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req,res,next)=>{
  if(req.user.id !== req.params.id) return   next(new ApiError(401,"you can opnly delete your own account"))
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token')
      res.status(200).json(new ApiResponse("User has Been deleted"))
    } catch (error) {
      next(error)
    }
}

export const getUserListing=async(req,res,next)=>{
  if(req.user.id===req.params.id){
    try {
      const listing=await Listing.find({userRef: req.params.id})
      res.status(200).json(listing)
    } catch (error) {
      next(error)
    }
  }
  else{
    return next(new ApiError(401,"you can view your own Listing"))
  }
}