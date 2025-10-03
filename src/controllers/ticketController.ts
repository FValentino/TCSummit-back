import { Request, Response } from "express";
import { TicketService } from "../services";

export class TicketController{

  private ticketService: TicketService;

  constructor(ticketService: TicketService){
    this.ticketService = ticketService;
  }

  getTicketByUuid = async (req: Request, res:Response) => {
    const  uuid  = req.params.uuid;
    
    if (!uuid){
      res.status(400).json({validate: false, message: "No hay entrada"});
      return;
    }

    try{
      const ticket = await this.ticketService.getTyicketByUuid(uuid);

      if (!ticket){
        res.status(400).json({success: false, message: "Entrada no encontrada"});
        return;
      }

      res.status(200).json(ticket);
    } catch(error){
      res.status(500).json({message:"server error"});
    }
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
