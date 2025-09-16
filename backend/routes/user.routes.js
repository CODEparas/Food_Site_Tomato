import { Router } from "express";

const userRouter = Router();

// Define user-related routes here
userRouter.get('/', (req, res) => {
  res.send('User route');
});

userRouter.post('/register', (req, res) => {
  // Registration logic here
  res.send('User registration');
});

userRouter.post('/login', (req, res) => {
  // Login logic here
  res.send('User login');
}); 


export default userRouter;

// You can add more routes like POST, PUT, DELETE for user operations