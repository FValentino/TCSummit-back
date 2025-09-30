import { AppDataSource } from "../config/dataSource";
import { Client, Purchase, Ticket, TicketType } from "../entity";
import { ClientRepository, PurchaseRepository, TicketRepository, TicketTypeRepository } from "../repository";
import { TicketInput } from "../types/ticket";


export class PaymentService{

  async paymentSuccesfull(ticketData: TicketInput, clientData: Omit<Client, "id">, paymentId: string): Promise<{
    client: Client, 
    tickets: Ticket[], 
    purchase: Purchase
  }>{
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if(!ticketData || !clientData || !paymentId) {
      throw new Error("Fala algun dato")
    }

    console.log("PARAMETERS PAYMENT SERVICES: ");
    console.log("TICKETDATA: ", ticketData);
    console.log("CLIENTDATA: ",clientData);
    console.log("PAYMENTID: ",paymentId);

    try{
      const clientRepo = new ClientRepository(queryRunner.manager);
      const ticketRepo = new TicketRepository(queryRunner.manager);
      const ticketTypeRepo = new TicketTypeRepository(queryRunner.manager);
      const purchaseRepo = new PurchaseRepository(queryRunner.manager);

      const tickets: Ticket[] = [];
      
      let client = await clientRepo.findByEmail(clientData.email)

      if(!client){
        client = await clientRepo.createClient(clientData)
      }

      const type: TicketType | null = await ticketTypeRepo.findById(ticketData.idType);

      if (!type){
        await queryRunner.rollbackTransaction();
        throw new Error("Tipo de entrada invalido");
      }

      for (let i=0; i<ticketData.quantity; i++){
        let ticket = await ticketRepo.createTicket({
          client,
          type
        })
        
        tickets.push(ticket)
      }

      const purchase = await purchaseRepo.createPurchase({
        paymentId,
        client,
        tickets
      })
      
      const newQuantity = type.quantity - ticketData.quantity;
      await ticketTypeRepo.updateTicketType(ticketData.idType, {quantity: ticketData.quantity})

      await queryRunner.commitTransaction();

      return {client, tickets, purchase}
      
    } catch(error){
      await queryRunner.rollbackTransaction();
      console.error("Error al crear el cliente o el ticket")
      throw error;
      
    } finally{
      await queryRunner.release()
    }
  }
}