import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from "typeorm";
import { Ticket } from "./ticket";

@Entity("ticket_uses")
export class TicketUse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", name: "used_at" })
  usedAt!: string; 

  @ManyToOne(() => Ticket, (ticket) => ticket.uses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "ticket_id" })
  ticket!: Ticket;
}