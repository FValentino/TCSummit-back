import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import dns from "dns";
import { Client, Purchase, Ticket, TicketType, TicketUse } from "../entity";

dns.setDefaultResultOrder("ipv4first");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: isProduction
  ? { rejectUnauthorized: false }
  : false,
  synchronize: !isProduction, 
  logging: true,
  entities: [Ticket, TicketType, TicketUse, Client, Purchase],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});