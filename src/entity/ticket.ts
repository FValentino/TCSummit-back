import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Client } from "./client";
import { Purchase } from "./purchase";
import { TicketType } from "./ticketType";

@Entity("tickets")
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: "created_at", type:"timestamp" })
  createdAt!: Date;

  @ManyToOne(() => TicketType, (type: TicketType) => type.tickets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "type_id" }) 
  type!: TicketType;

  @ManyToOne(() => Client, (client: Client) => client.tickets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "client_id" })
  client!: Client;

  @ManyToOne(() => Purchase, (purchase) => purchase.tickets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "purchase_id" })
  purchase!: Purchase;
}
