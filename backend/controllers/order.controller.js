import Order from "../models/oders.model.js";
import mongoose from "mongoose";
import User from "../models/users.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

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


export const getOrderById = async (req,res,next) =>{
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if(!order){
            const error = new Error("Order not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Fetched order details",
            data : {
                order
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
        const userId = req.user._id;
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({ success: false, message: "Address is required." });
        }

        const cart = await Cart.findOne({ userId: userId }).session(session);

        if (!cart || cart.items.length === 0) {
            await session.abortTransaction();
            return res.status(400).json({ success: false, message: "Cannot create order from an empty cart." });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const cartItem of cart.items) {
            const product = await Product.findById(cartItem.productId).session(session);
            if (!product) {
                throw new Error(`Product with ID ${cartItem.productId} not found.`);
            }

            orderItems.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: cartItem.quantity,
            });

            totalAmount += product.price * cartItem.quantity;
        }

        const newOrder = await Order.create([{
            userId,
            items: orderItems,
            address: address,
            totalAmount: totalAmount,
        }], { session });

        cart.items = [];
        await cart.save({ session });
        

        await session.commitTransaction();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            data: newOrder[0]
        });

        
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


export const updateOrderStatusById = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        if (!["BOOKED", "DELIVERED", "CANCELLED", "PROCESSING"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully.",
            data: order
        });

    } catch (error) {
        next(error);
    }
}
