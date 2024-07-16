import Listing from "../models/listing.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"


export const createListing=async(req,res,next)=>{
    try {
        const listing = await Listing.create(req.body)
        return res.status(200).json(new ApiResponse(200,listing,'list created successfully'))
    } catch (error) {
        next(error)
    }
}