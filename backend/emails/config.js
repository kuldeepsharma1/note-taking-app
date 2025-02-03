import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a Nodemailer transporter
export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log("Error configuring mail transporter:", error);
  } else {
    console.log("Mail transporter is ready.");
  }
});