import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import { Ticket } from "../entity";
import { TicketRepository, TicketUseRepository } from "../repository";

dotenv.config();

interface TicketPayload{
  uuid: string;
}

interface TicketValidateSuccess {
  validate: true;
  message: string;
  ticket: Ticket;
}

interface TicketValidateFail {
  validate: false;
  message: string;
}

export class TicketService{

  private ticketRepository: TicketRepository;
  private ticketUseRepository: TicketUseRepository;

  constructor(ticketRepository: TicketRepository, ticketUseRepository: TicketUseRepository){
    this.ticketRepository = ticketRepository;
    this.ticketUseRepository = ticketUseRepository;
  }

  async getAllTickets(): Promise<Ticket[]>{

    try{
      const tickets = await this.ticketRepository.findAllTickets()
      return tickets;
    } catch(error){
      console.error("Error al obtener los tickets: ", error)
      throw error
    }
  }

  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket>{
    try{
      const result = await this.ticketRepository.createTicket(ticketData)
      return result;
    }
    catch(error){
      console.error("Error al crear el ticket: ", error)
      throw error
    }
  }

  async validateTicket(token: string): Promise<TicketValidateSuccess | TicketValidateFail>{

    const hoy = new Date().toISOString().split("T")[0];

    try {
      const decodeToken = jwt.verify(token, process.env.QR_SECRET!) as TicketPayload;
      const ticket = await this.ticketRepository.findByUuid(decodeToken.uuid);
      if (!ticket) return { validate: false, message: "Entrada no encontrada" };

    
      const now = new Date();
      const today: string = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 10);

      const alreadyUsed = await this.ticketUseRepository.findByTicketAndDate(ticket.id, today);
      if (alreadyUsed) {
        return { validate: false, message: "Esta entrada ya fue usada hoy" };
      }

      await this.ticketUseRepository.registerUse(ticket.id, today);

      return { validate: true, message: "Entrada válida", ticket };
    } catch (error) {
      console.error("Error al validar la entrada:", error);
      throw error;
    }
  }
}