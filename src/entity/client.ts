import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./ticket";
import { Purchase } from "./purchase";

@Entity("clients")
export class Client {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: "name"})
  name!: string;

  @Column({name: "email"})
  email!:string;

  @Column({name: "tel"})
  phone!: string;

  @OneToMany(()=>Ticket, (ticket)=>ticket.client)
  tickets!: Ticket[];

  @OneToMany(() => Purchase, (purchase) => purchase.client)
  purchases!: Purchase[];
}

