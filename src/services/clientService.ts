import { Client } from "../entity";
import { ClientRepository } from "../repository";

export class ClientService{

  private repository: ClientRepository

  constructor(repository: ClientRepository){
    this.repository = repository;
  }

  async getAllClients(): Promise<Client[]>{

    try{
      const clients = await this.repository.findAllClients()
      return clients;
    } catch(error){
      console.error("Error al obtener los Clients: ", error)
      throw error
    }
  }

  async createClient(ClientData: Partial<Client>): Promise<Client>{
    try{
      const result = await this.createClient(ClientData)
      return result;
    }
    catch(error){
      console.error("Error al crear el Client: ", error)
      throw error
    }
  }
}