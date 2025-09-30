import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn} from "typeorm"
import { Client } from "./client";
import { Ticket } from "./ticket";

@Entity("purchase")
export class Purchase {

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: "purchase_date", type:"timestamp" })
  purchaseDate!: Date;

  @Column({name:"payment_id"})
  paymentId!: string;

  @ManyToOne(()=>Client, (client)=>client.purchases, {onDelete:"SET NULL", nullable: true})
  @JoinColumn({name: "client_id"})
  client!: Client;

  @OneToMany(()=>Ticket, (ticket)=>ticket.purchase)
  tickets!: Ticket[]
}