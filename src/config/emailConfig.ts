import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "admin@tcsummit.com.ar",
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
  },
});

export default transporter;