import mongoose from "mongoose";
import User from "./users.model";

const CartItem = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Food",        
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true,
    },

    items : [CartItem]
}, {timestamps:true})


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;