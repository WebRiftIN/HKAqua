import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

const app = express();

app.use(cors({
    origon: process.env.CORS_ORIGIN,
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

export {app}