import { ClientRepository, TicketRepository } from "../repository";
import { ClientService, PaymentService, TicketService } from "../services";

export class Container{

  private ticketService: TicketService;
  private clientService: ClientService;
  private paymentService: PaymentService;

  constructor(){
    this.ticketService = new TicketService(new TicketRepository())
    this.clientService = new ClientService(new ClientRepository())
    this.paymentService = new PaymentService();
  }

  getTicketService(){
    return this.ticketService;
  }

  getClientService(){
    return this.clientService;
  }

  getPaymentService(){
    return this.paymentService;
  }
}

export const container = new Container();