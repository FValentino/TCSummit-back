import express from "express";
import { EmailController } from "../controllers/emailController";
import { EmailService } from "../services";

const router = express.Router();
const emailController = new EmailController(new EmailService)

router.post("/contact", emailController.sendContactEmail);

export default router;
