import Order from "../models/oders.model.js";
import mongoose from "mongoose";
import User from "../models/users.model.js";


export const getAllorder = async (req , res , next) =>{
    try {

        const Allorder = await Order.find();
        res.status(200).json({
            success: true,
            message : "fetched all orders",
            data : {
                Allorder
            }
        })
        
    } catch (error) {
        next(error);
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
        await session.endSession();

    }
}

export const UserOrder = async(req,res,next) =>{
    try {
        const userID = req.user._id;
        const orders = await Order.findById(userID);
        if(!userID){
            const error = new Error("Please log in to see ur orders");
            error.statusCode = 401;
            throw error;
        }
        if(!orders){
            const error = new Error("No orders yet");
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json({
            success: true,
            message:"Fetched order details",
            data : {

                orders
            }
        })
        
    } catch (error) {
        next(error);
    }
}

export const updateOrderStatus = async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}

