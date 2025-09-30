import dotenv from "dotenv";
import transporter from "../config/emailConfig"

dotenv.config();

export class EmailService{
  
  sendEmail = async (text: string)=>{
    try {
      const info = await transporter.sendMail({
        from: `TSCUMMIT <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: "Comunicacion a traves de la pagina",
        text: text
      });
      
      return info;
    } catch (error) {
      console.error("❌ Error al enviar email:", error);
      throw error;
    }
  }
}
