import mongoose from "mongoose";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import {JWT_EXPIRE, JWT_SECRET} from "../config/env.js";

export const signupUser = async (req , res, next) =>{
    const session = await mongoose.startSession();
     session.startTransaction();
    try {

        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error("User exists with this email id");
            error.statusCode = 401;
            throw error;
            return;
        }

        const user = await User.create([{name,email,password}], {session});
        const token = jwt.sign({userId: user[0]._id}, JWT_SECRET, {expiresIn : JWT_EXPIRE});


        await session.commitTransaction();
        user.password = undefined;
        

        res.status(201).json({
            success : true,
            message : "User created successfully",
            data : {
                user,
                token
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

export const getAllUsers = async (req , res,next) =>{
    try {

        const user = await User.find();
        if(!user){
            const error = new Error("Some error with mongodb coz empty object");
            error.statusCode= 402;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "all users fetched",
            data : {
                user
            }
        });
        
    } catch (error) {
        next(error);
    }
}

