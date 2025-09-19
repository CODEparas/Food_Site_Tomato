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



export const addItemToCart = async (req, res, next) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid request. Please provide a valid productId and a quantity greater than 0." 
        });
    }

    try {
        let cart = await Cart.findOne({ userId: userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            
            const updatedCart = await cart.save();
            return res.status(200).json({ success: true, message: "Cart updated.", data: updatedCart });

        } else {
            const newCart = await Cart.create({
                userId,
                items: [{ productId, quantity }]
            });
            return res.status(201).json({ success: true, message: "Cart created and item added.", data: newCart });
        }
    } catch (error) {
        next(error);
    }
};

export const removeItemFromCart = async (req, res, next) => {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid request. Please provide a valid productId." 
        });
    }

    try {
        let cart = await Cart.findOne({ userId: userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items.splice(itemIndex, 1);
                const updatedCart = await cart.save();
                return res.status(200).json({ success: true, message: "Item removed from cart.", data: updatedCart });
            } else {
                return res.status(404).json({ success: false, message: "Item not found in cart." });
            }
        } else {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }
    } catch (error) {
        next(error);
    }
};