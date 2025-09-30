import { Ticket } from "../entity";
import { TicketRepository } from "../repository";

export class TicketService{

  private repository: TicketRepository

  constructor(repository: TicketRepository){
    this.repository = repository;
  }

  async getAllTickets(): Promise<Ticket[]>{

    try{
      const tickets = await this.repository.findAllTickets()
      return tickets;
    } catch(error){
      console.error("Error al obtener los tickets: ", error)
      throw error
    }
  }

  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket>{
    try{
      const result = await this.createTicket(ticketData)
      return result;
    }
    catch(error){
      console.error("Error al crear el ticket: ", error)
      throw error
    }
  }
}