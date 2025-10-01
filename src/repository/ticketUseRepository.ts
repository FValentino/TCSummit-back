import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { TicketUse } from "../entity";

export class TicketUseRepository{

 private repository: Repository<TicketUse>;
 
   constructor(manager?: EntityManager) {
     this.repository = manager ? manager.getRepository(TicketUse) : AppDataSource.getRepository(TicketUse);
   }

  findByTicketAndDate(ticketId: number, date: string) {
    return this.repository.findOne({
      where: {
        ticket: { id: ticketId },
        usedAt: date,
      },
    });
  }

  registerUse(ticketId: number, date: string) {
    const use = this.repository.create({
      ticket: { id: ticketId },
      usedAt: date,
    });
    return this.repository.save(use);
  }
};