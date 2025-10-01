import { Request, Response } from "express";
import { PaymentService } from "../services";
import { Client } from "../entity";
import { TicketInput } from "../types/ticket";

export class PaymentController{

  private paymentService: PaymentService;

  constructor(paymentService: PaymentService){
    this.paymentService = paymentService;
  }

  paymentSuccesfull = async (req: Request, res:Response)=>{
   
    const { ticketData, client }: Partial<{ticketData:TicketInput, client: Client}> = req.body

    if (!ticketData || !client ) {
      res.status(400).json({success: false, message:"data incomplete"});
      return ;
    }

    try{
      const result = await this.paymentService.paymentSuccesfull(ticketData, client, "paymentId")

      if (!result) {
        res.status(400).json({success: false, message:"payment error"});
        return ;
      }
      
      res.status(200).json({succesfull: true, result})
      
    } catch(error){
      console.error("Error al procesar el pago: ", error);
      throw error;
    }

  }

}