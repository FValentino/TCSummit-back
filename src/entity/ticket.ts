import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { Client } from "./client";
import { Purchase } from "./purchase";
import { TicketType } from "./ticketType";
import { TicketUse } from "./ticektUse";

@Entity("tickets")
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({name: "qr_id", type: "uuid", unique: true, nullable: true})
  qrId!: string;

  @Column({ name: "qr_image", nullable: false })
  qrImage!: string;

  @CreateDateColumn({ name: "created_at", type:"timestamp" })
  createdAt!: Date;

  @Column({name: "state", type:"enum", enum: ["invalida","valida","usada"],  default:"invalida"})
  state!: "invalida" | "valida" | "usada";

  @Column({ name: "used_at", type: "date", nullable: true })
  usedAt?: Date;

  @ManyToOne(() => TicketType, (type: TicketType) => type.tickets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "type_id" }) 
  type!: TicketType;

  @OneToMany(() => TicketUse, (use) => use.ticket)
  uses!: TicketUse[];

  @ManyToOne(() => Client, (client: Client) => client.tickets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "client_id" })
  client!: Client;

  @ManyToOne(() => Purchase, (purchase) => purchase.tickets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "purchase_id" })
  purchase!: Purchase;
}
