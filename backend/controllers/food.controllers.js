import Food from "../models/food.model.js";
import mongoose from "mongoose";


export const addFood = async (req ,res , next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {name,description,price} = req.body;
    if(!name || !description || !price){
        const error = new Error("Enter all descriptions");
        error.statusCode = 400;
        throw error;
    }

    const fooditem = await Food.create([{
        name,
        description,
        price

    }], {session});

     const food = fooditem[0];


    await session.commitTransaction();

    res.status(201).json({
        success: true,
        message : "Food item added",
        data : {
            food,
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

export const getAllfood = async (req,res,next) =>{
    try {
        
        const foodItems = await Food.find();
        if(!foodItems){
            const error = new Error("No food item added");
            error.statusCode = 400;
            throw error;{
            return;
        }
    }
        res.status(200).json({
            success : true,
            message : " All food items fetched",
            data : {
                foodItems
            }
        });

    


    } catch (error) {
        next(error);
    }
}

export const foodItem = async (req,res,next) =>{
    try {
        const foodId = req.params.foodId;

        const food = await Food.findById(foodId);
        if(!food){
            const error = new Error("No item found with this id");
            error.statusCode = 403;
            throw error;
            return;
        }

        res.status(200).json({
            success : true,
            message: "Food item fetched",
            data : {
                food
            }
        })

        
    } catch {
        next(error);
        
    }

}