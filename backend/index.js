import express from 'express';
import {connect} from './database/connect.js'
import authRoutes from './routes/auth-routes.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();


const app = express();
const port = 8000;
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());
connect();

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });