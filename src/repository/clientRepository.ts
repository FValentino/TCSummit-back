import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { Client } from "../entity";

export class ClientRepository{

  private repository: Repository<Client>;
  
  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(Client) : AppDataSource.getRepository(Client);
  }

  findAllClients(){
    return this.repository.find();
  }

  findByEmail(email: string){
    return this.repository.findOneBy({email: email});
  }

  createClient(clientData: Partial<Client>){
    const Client = this.repository.create(clientData)
    return this.repository.save(Client);
  }

  updateClient(id:number, clientData: Partial<Client>){
    return this.repository.update(id, clientData);
  }
}