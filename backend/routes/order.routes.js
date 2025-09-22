import { Router } from "express";   
import { getAllorder, UserOrder,createOrder, updateOrderStatusById } from "../controllers/order.controller";  
import { get } from "mongoose";
import authorize from "../middlewares/auth.middlewares";



const orderRouter = Router();

// Define order-related routes here
orderRouter.get('/list',authorize, getAllorder);

orderRouter.post('/create',authorize, createOrder);

orderRouter.get('/:userId',authorize, UserOrder);

orderRouter.put('/:orderId',authorize, updateOrderStatusById);

export default orderRouter;