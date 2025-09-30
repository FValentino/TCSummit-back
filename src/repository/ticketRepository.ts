import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { Ticket } from "../entity";

export class TicketRepository{

  private repository: Repository<Ticket>;

  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(Ticket) : AppDataSource.getRepository(Ticket);
  }


  findAllTickets(){
    return this.repository.find();
  }

  createTicket(ticketData: Partial<Ticket>){
    const ticket = this.repository.create(ticketData)
    return this.repository.save(ticket);
  }

  updateTicket(id:number, ticketData: Partial<Ticket>){
    return this.repository.update(id, ticketData);
  }
}