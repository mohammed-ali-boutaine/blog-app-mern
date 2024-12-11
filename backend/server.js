// labraries umport
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// fils inmport
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import {errorHandler ,notFound} from "./middlewares/errorMiddleware.js"

// midlewares
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors());


const port = process.env.PORT || 5000;
dotenv.config();

// db connecton 
connectDB()




// routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);



// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);


// Server start
app.listen(port, () => {
     console.log(`Server running on port ${port}`);
 });

