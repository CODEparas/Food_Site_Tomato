import mongoose from "mongoose";
import bcrypt from "bcrypt";


const CartItem = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",        
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
}, { _id: false });

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type: String,
        required : true,
        lowercase : true,
        trim : true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    },
    password : {
        type : String,
        trim : true,
        minlength : 6,
        maxlength : 20,


    },
    cartData : [CartItem]
}, {timestamps: true});


userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }

    const salt =await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
    next();

})

const User = mongoose.model('User', userSchema);
export default User;