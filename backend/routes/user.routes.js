import { Router } from "express";
import { signupUser, getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router();

// Define user-related routes here
userRouter.get('/',getAllUsers);

userRouter.post('/register', signupUser);

userRouter.post('/login', (req, res) => {
  // Login logic here
  res.send('User login');
}); 


export default userRouter;

userRouter.get('/:userId', (req, res) => {
  // Get user details logic here
  res.send(`Get user with ID: ${req.params.userId}`);
});