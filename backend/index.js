import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {PORT, NODE_ENV} from "./config/env.js"
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import foodRouter from "./routes/food.routes.js";



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/foods", foodRouter);





app.get('/', (req, res) => {
  res.send('Hello, World!');
});



// Start server
app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});


