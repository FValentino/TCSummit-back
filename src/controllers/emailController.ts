import type { Request, Response } from "express";
import type { EmailService } from "../services/emailService";

export class EmailController{

  private emailService: EmailService;
  
  constructor(emailService: EmailService){
    this.emailService = emailService;
  }

  sendContactEmail = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    const textMessage = `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`;

    try {
      await this.emailService.sendEmail(textMessage);
      res.status(200).json({ success: true, message: "Email enviado correctamente!" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error al enviar el email" });
    }
  }
}
