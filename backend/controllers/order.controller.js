import Order from "../models/oders.model.js";
import mongoose from "mongoose";
import User from "../models/users.model.js";
export const getAllorder = async (req , res , next) =>{
    try {
        
    } catch (error) {
        
    }
}

export const createOrder = async (req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {items, address} = req.body;
        const userID = req.user._id;

        if(!items){
            const error = new Error("No items in cart to order");
            error.statusCode = 403;
            throw error;
        }
        if(!address){
            const error = new Error("Please add address");
            error.statusCode = 403;
            throw error;
        }
        const user = req.user;
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const order = await Order.create([{
            userID,
            items,
            address
        }], {session});

        await User.findByIdAndUpdate(userID, {$push : {orders : order[0]._id}}, {new : true, session}); 
        await User.findByIdAndUpdate(userID, {cart : []}, {new : true, session});

        await session.commitTransaction();
        
        res.status(201).json({
            success : true,
            message : "Order placed successfully",
            data : {
                user,
                order
            }
        })

        
    } catch (error) {
        await session.abortTransaction();

        next(error);
    }
    finally{
        session.endSession();

    }
}

export const UserOrder = async(req,res,next) =>{
    try {
        
    } catch (error) {
        
    }
}

export const updateOrderStatus = async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}

