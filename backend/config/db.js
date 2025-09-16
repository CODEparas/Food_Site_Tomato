import mongoose from "mongoose";
import {DB_URI} from "./env.js";

 const connectDB = async () => {
    try {
        mongoose.connect(DB_URI);
        console.log("MongoDB Connected Successfully !!!!");


    } catch (error) {
        console.error("MONGODB connection error", error);
        process.exit(1);
    }
}

export default connectDB;

