import mongoose from "mongoose";

import Subscription from "../models/subscription.models.js";





const isSubscriber = async (req, res, next) => {


try {

    const orderId = req.params.orderId; 
    const userId = req.user._id.toString();


    const subscription = await Subscription.findById(orderId);

if(!subscription)

    return res.status(404).json({success: false, message : "Wrong sub ID entered"});



if(subscription.user._id != userId){
    return res.status(403).json({success : false, message : "You're not a subscriber"});
    }



req.subscription = subscription;

   


next();

} catch (error) {



    next(error);



}




    }



    export default isSubscriber;