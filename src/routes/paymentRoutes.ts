import express from "express";
import { container } from "../container/container";
import { PaymentController } from "../controllers";

const paymentController = new PaymentController(container.getPaymentService());

const paymentRoutes = express.Router();

paymentRoutes.post("/", paymentController.paymentSuccesfull);

export default paymentRoutes;