import { Router } from "express";   
import { addFood, foodItem, getAllfood } from "../controllers/food.controllers.js";

const foodRouter = Router();

// Define order-related routes here
foodRouter.get('/', getAllfood);

foodRouter.post('/create', addFood);

foodRouter.get('/:foodId', foodItem);

export default foodRouter;