// labraries umport
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// fils inmport
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import {userR}
import {errorHandler ,notFound} from "./middlewares/errorMiddleware.js"

// midlewares
const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 5000;






// routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// app.use("/",(req,res)=>{
//     res.send("connected")
// })

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);


// db connecton 
connectDB()

// Server start
app.listen(port, () => {
     console.log(`Server running on port ${port}`);
 });

