import { Router } from "express";   
import { addFood, foodItem, getAllfood } from "../controllers/food.controllers.js";
import authorize from "../middlewares/auth.middlewares.js";

const foodRouter = Router();

// Define order-related routes here
foodRouter.get('/',authorize, getAllfood);

foodRouter.post('/create',authorize, addFood);

foodRouter.get('/:foodId',authorize, foodItem);

export default foodRouter;