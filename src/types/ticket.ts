import { Ticket } from "../entity";

export interface TicketInput{
  idType: number;
  quantity: number;
}

export interface TicketValidateSuccess {
  validate: true;
  message: string;
  ticket: Ticket;
}

export interface TicketValidateFail {
  validate: false;
  message: string;
}