import { Router } from "express";   
import {getCart, addItemToCart, removeItemFromCart} from "../controllers/cart.controllers.js";
import authorize from "../middlewares/auth.middlewares.js";

const orderRouter = Router();



orderRouter.post('/addtoCart', authorize, addItemToCart);

orderRouter.get('/getCart', authorize, getCart);

orderRouter.post("/remove", authorize, removeItemFromCart);

export default orderRouter;