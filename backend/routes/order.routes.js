import { Router } from "express";   
import { getAllorder, UserOrder,createOrder, updateOrderStatusById } from "../controllers/order.controller";  
import { get } from "mongoose";



const orderRouter = Router();

// Define order-related routes here
orderRouter.get('/list', getAllorder);

orderRouter.post('/create', createOrder);

orderRouter.get('/:userId', UserOrder);

orderRouter.put('/:orderId', updateOrderStatusById);

export default orderRouter;