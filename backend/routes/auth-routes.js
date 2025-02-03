import express from 'express';
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, VerifyEmail } from "../controllers/authcontrollers.js";
import {verifyToken} from '../middleware/verifyToken.js'


const router = express.Router();
router.post('/signup', signup);
router.post('/signin', login);
router.post('/verfiyemail', VerifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/check-auth', VerifyEmail, checkAuth);
router.post('/logout', logout);


export default router;