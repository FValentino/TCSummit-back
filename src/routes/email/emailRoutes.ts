import express from "express";
import { EmailController } from "../../controllers/emailController.js";
import { EmailService } from "../../services/email/emailService.js";

const router = express.Router();
const emailController = new EmailController(new EmailService)

router.post("/contact", emailController.sendContactEmail);

export default router;
