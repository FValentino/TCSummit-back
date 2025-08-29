import { sendEmail } from "../services/email/sendEmailLanding.js";

export async function sendContactEmail(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  const textMessage = `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`;

  try {
    await sendEmail(textMessage);
    res.status(200).json({ success: true, message: "Email enviado correctamente!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al enviar el email" });
  }
}
