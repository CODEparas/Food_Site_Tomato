import { Router } from "express";
import { signupUser, getAllUsers, loginUser } from "../controllers/user.controller.js";

const userRouter = Router();

// Define user-related routes here
userRouter.get('/',getAllUsers);

userRouter.post('/register', signupUser);

userRouter.post('/login', loginUser);

userRouter.get('/:userId', (req, res) => {
  res.send(`Get user with ID: ${req.params.userId}`);
});



export default userRouter;

