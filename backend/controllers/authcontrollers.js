import {User} from '../models/User.js'
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateJWTToken } from "../utils/generatejwtToken.js";
import { sendResetPassword, sendResetSuccess, sendVerificationEmail, sendWelcomeEmail } from "../emails/email.js";
import crypto from 'crypto';
import ratelimit from 'express-rate-limit';

const loginLimiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 6,
    message: {
        success: false,
        message: "Too many login attemps please try again later",
    }
})
const checkUserExistance = async (email, username) => {
    const [userByEmail, userByUsername] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ username })
    ])
    return { userByEmail, userByUsername }
}
export const signup = async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false })
    }
    try {
        const { userByEmail, userByUsername } = await checkUserExistance(email, username)
        if (userByUsername) {
            return res.status(400).json({ message: "User name Already taken", success: false })
        }
        if (userByEmail) {
            return res.status(400).json({ message: "User email Already exist", success: false })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const verificationToken = generateVerificationToken();
        const user = new User(
            {
                username,
                email,
                password: hashPassword,
                verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,// this is eqauls to 24 h
            }
        )
        await user.save();
        generateJWTToken(res, user._id);
        await sendVerificationEmail(user.email, user.verificationToken);

        res.status(201).json({ message: "User Created Successfully", success: true, user: { ...user._doc, password: undefined } })


    } catch (error) {
        console.error("Error During Signup", error)
        res.status(500).json({ message: "Server Error", success: false })

    }

}

export const VerifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({ verificationToken: code, verificationTokenExpiresAt: { $gt: Date.now() } })
        if (!user) {
            return res.status(400).json({ message: "Invalid or Expired OTP", success: false })

        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.username);
        res.status(201).json({ message: "User email verfied Successfully", success: true })

    } catch (error) {
        console.error("Unable to verfiy email", error)
        res.status(500).json({ message: "Server Error", success: false })

    }
}
export const login = [loginLimiter, async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false })
    }

    try {
        const user = await User.findOne({ email })
        
        if (!user) {
            return res.status(400).json({ message: "user not found", success: false });
        }
        const isPasswordValid= await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "invalid password", success: false });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: "Email not verified", success: false })
        }
        generateJWTToken(res, user._id);
        res.status(200).json({ message: "Login Successfully", success: true, user })
    } catch (error) {
        console.error("Server error", error)
        res.status(500).json({ message: "Server Error", success: false })
    }
}]

export const checkAuth = async (req, res) => {

    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized user request", success: false })
        }
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not Found", success: false })
        }

        res.status(201).json({ message: "User authorized success", success: true, user })

    } catch (error) {
        console.error("Server error", error)
        res.status(500).json({ message: "Server Error", success: false })
    }
}
export const logout = async (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return res.status(200).json({ message: 'Logout Success', success: true })
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required ", success: false })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email is not exist ", success: false })
        }
        const resetPasswordToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000
        await user.save()
        await sendResetPassword(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);
        res.status(200).json({ message: "Reset password send successfull", success: true })

    } catch (error) {
        console.error("Error in forgot Password:", error)
        res.status(500).json({ message: "Server Error", success: false })
    }
}
export const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: "Password is required ", success: false })
    }
    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } })
        if (!user) {
            return res.status(400).json({ message: "Invalid or Expired reset url", success: false })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();
        await sendResetSuccess(user.email)
        return res.status(200).json({ message: "Password email send successfull", success: true })

    } catch (error) {
        console.error("Server error", error)
        res.status(500).json({ message: "Server Error", success: false })
    }

}
