import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/users.model.js";    


const authorize = (err, res, req, next) =>{
    try {

        let token = undefined ;
        const authHeader = req.headers.authroziation;
        if(authHeader || authHeader.startsWith('Bearer')){
            token = authHeader.split(" ")[1];
        }

        if(!token){
            const error = new Error("No token found ");
            error.statusCode = 403;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded){
            const error = new Error("Bad token, unrelated");
            error.statusCode = 403;
            throw error;
        }
        const user = User.findById(decoded.userId);
        if(!user){
            const error = new Error("Invalid token, no user assosiated with it");
            error.statusCode = 403;
            throw error;
        }
        req.user = user;

        next();
        
    } catch (error) {
        next(error);
    }
}

export default authorize;