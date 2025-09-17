import { Router } from "express";   
import { addFood, getAllfood } from "../controllers/food.controllers.js";

const foodRouter = Router();

// Define order-related routes here
foodRouter.get('/', getAllfood);

foodRouter.post('/create', addFood);

foodRouter.get('/:orderId', (req, res) => {
  // Get order details logic here
  res.send(`Get order with ID: ${req.params.orderId}`);
});

export default foodRouter;