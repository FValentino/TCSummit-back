import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./ticket";

@Entity("tickets_types")
export class TicketType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "tipo", type: "varchar", length: 100 })
  tipo!: string; 

  @Column({ name: "price", type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ name: "quantity", type: "integer" })
  quantity!: number;

  @Column({ name: "lot", type: "integer" })
  lot!: number;

  @OneToMany(() => Ticket, (ticket) => ticket.type)
  tickets!: Ticket[];
}
