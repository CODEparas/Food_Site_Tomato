import { Router } from "express";
import { signupUser, getAllUsers, loginUser, getUserById } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middlewares.js";

const userRouter = Router();

// Define user-related routes here
userRouter.get('/', authorize ,getAllUsers);

userRouter.post('/register', signupUser);

userRouter.post('/login', loginUser);

userRouter.get('/:userId', authorize, getUserById);



export default userRouter;

