import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Allow all localhost ports during development
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            process.env.ADMIN_URL,
            'http://localhost:5173',
            'http://localhost:5174', 
            'http://localhost:5175'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
//for handling url
app.use(express.urlencoded({ extended: true }));
//for handling staic files or pds from public folder
app.use(express.static('public'));
//for handling cookies
app.use(cookieParser());

//router for user
app.use("/api/user",userRoutes)

//router for service booked by user
app.use("/api/customer",contactRoutes)

//router for adding products (middleware applied at route level, not here)
app.use("/api/product",productRoutes)

//router for user cart
app.use("/api/cart",cartRoutes)

//router for order
app.use("/api/order",orderRoutes)

//router for adminPage
app.use("/api/admin",adminRoutes)

export {app}