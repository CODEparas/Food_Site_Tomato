import mongoose from "mongoose";
import User from "./users.model";

const orderSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
     date: {
        type: Date,
        default: Date.now
    },
     address: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    status : {
        type: String,
        enum : ["BOOKED", "DELIVERED", "CANCELLED", "IN-CART"],
        default : "IN-CART"
    }, items: [{
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    address: {
        firstName: { 
            type: String,
             required: true
             },
        lastName: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true },
        street: { 
            type: String, 
            required: true 
        },
        city: {
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true },
        zipcode: {
             type: String, 
             required: true },
        country: { 
            type: String, 
            required: true },
        phone: { 
            type: String, 
            required: true }
    },
    quantity : {
        type : true,
        required : true,
        default : 1
    },


}, {timestamps : true})