import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { TicketType } from "../entity";

export class TicketTypeRepository{

  private repository: Repository<TicketType>;

  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(TicketType) : AppDataSource.getRepository(TicketType);
  }

  findAllTicketTypes(){
    return this.repository.find();
  }
  
  findById(id: number){
    return this.repository.findOneBy({id: id})
  }

  updateTicketType(id:number, ticketTypeData: Partial<TicketType>){
    return this.repository.update(id, ticketTypeData);
  }
}