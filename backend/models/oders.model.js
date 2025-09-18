import mongoose from "mongoose";
import User from "./users.model";

const orderSchema = new mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    status : {
        type: String,
        enum : ["BOOKED", "DELIVERED", "CANCELLED", "PROCESSING"],
        default : "PROCESSING"
    }, items: [{
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        quantity: { type: Number, required: true, min : 1 }
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


}, {timestamps : true})

const Order = mongoose.model("Order", orderSchema);

export default Order;