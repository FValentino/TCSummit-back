import express from "express";
import { container } from "../container/container";
import { TicketController } from "../controllers";

const TicketsController = new TicketController(container.getTicketService());

const ticketRouter = express.Router();

ticketRouter.post("/validate", TicketsController.validateTicket);

export default ticketRouter;