import nodemailer from "nodemailer";
import dotenv from "dotenv";
import transporter from "../../config/emailConfig.js"

dotenv.config();

export async function sendEmail(text) {
  try {
    const info = await transporter.sendMail({
      from: `TSCUMMIT <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: "Comunicacion a traves de la pagina",
      text: text
    });

    console.log("✅ Email enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    throw error;
  }
}
