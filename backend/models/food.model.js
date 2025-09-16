import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type: Number,
        required : true,

    },
    category : {
        type: String,
        
        enum : ["INDIAN", "CHINESE", "MEXICAN","JAPANESE" ],
        default : "INDIAN"
    },
    image : {
        type : String,
        
    }
    }
,{timestamps: true})