import Cart from "../models/cart.model.js";
import Order from "../models/oders.model.js";

const getCart = async (req , res, next)=>{
    try {
        const userID = req.user._id;
        if(!userID){
            const error = new Error("Please login my friend");
            error.statusCode = 403;
            throw error;
            
        }

        const cart = await Cart.findOne({userID : userID});
        if(!cart){
            const error = new Error("Nothing in the cart");
            error.statusCode = 401;
            throw error;
            
        }

        res.status(200).json({
            success : true,
            message : "Cart fetched successfully",
            data : {
                cart
            }

        })

    } catch (error) {
        next(error);
    }
}


