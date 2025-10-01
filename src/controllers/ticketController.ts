import { Request, Response } from "express";
import { TicketService } from "../services";
import { TicketInput } from "../types/ticket";
import { validate } from "uuid";

export class TicketController{

  private ticketService: TicketService;

  constructor(ticketService: TicketService){
    this.ticketService = ticketService;
  }

  validateTicket = async(req: Request, res: Response)=>{
    
    const { token } = req.body;
    if (!token){
      res.status(400).json({validate: false, message: "No hay token para analizar"});
      return;
    }

    try{
      const ticket = await this.ticketService.validateTicket(token);

      if (!ticket.validate){
        res.status(400).json({validate: false, message: ticket.message});
        return;
      }


      res.status(200).json({validate: true, message: ticket.message, ticket: ticket.ticket});
    } catch(error){
      res.status(500).json({message:"server error"});
    }
  }

}