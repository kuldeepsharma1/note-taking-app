import {transporter} from './config.js'
import { verificationTokenEmailTemplate,WELCOME_EMAIL_TEMPLATE } from './email-Templates.js'

//  verification email
export const sendVerificationEmail = async (email, verificationToken) =>{
  
    try {
        await transporter.sendMail({
            from:process.env.MAIL_FROM_ADDRESS,
            to:email,
            subject:"Verify email",
            html:verificationTokenEmailTemplate.replace("{verificationToken}",verificationToken),
        })
        console.log('verification email sent successfully');
        
        
    } catch (error) {
        console.error("Error sending mail verificaton",error)
        throw new Error("Error sending verification mail")
    }
}
// welcome email 
export const sendWelcomeEmail = async (email, username) =>{
  
    try {
        await transporter.sendMail({
            from:process.env.MAIL_FROM_ADDRESS,
            to:email,
            subject:"Welcome email",
            html:WELCOME_EMAIL_TEMPLATE.replace("{username}",username),
        })
        console.log('welcome email sent successfully');
        
        
    } catch (error) {
        console.error("Error sending mail verificaton",error)
        throw new Error("Error sending verification mail")
    }
}

// reset password
export const sendResetPassword = async (email, resetEmailUrl)=>{
    try {
        await transporter.sendMail({
            from:process.env.MAIL_FROM_ADDRESS,
            to:email,
            subject:"reset password email",
            html:`click <a href="${resetEmailUrl}" >here</a> to reset your password`,
        })
        
    } catch (error) {
        console.error("Reset password email not send")
        
    }
}
// success reset password
export const sendResetSuccess = async (email)=>{
    try {
        await transporter.sendMail({
            from:process.env.MAIL_FROM_ADDRESS,
            to:email,
            subject:"reset password email",
            html:`Your password changed successfully`,
        })
        
    } catch (error) {
        console.error("Reset success password email not send")
        
    }
}