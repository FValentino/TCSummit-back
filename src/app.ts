import express,  {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes";
import { AppDataSource } from "./config/dataSource";
import paymentRoutes from "./routes/paymentRoutes";
import ticketRouter from "./routes/ticketsRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
  "https://tcsummit.com.ar",
  "https://www.tcsummit.com.ar"
],  
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(json());

const initApp = async () => {
  try {

    // Conexion a base de datos
    await AppDataSource.initialize();
    console.log("Conexion establecida")

    // Rutas
    app.get('/', (req, res) => res.send('Servidor funcionando'));
    
    app.use('/api/payment', paymentRoutes);
    app.use('/api/tickets', ticketRouter);
    app.use("/api/email", emailRoutes);


    // Iniciar servidor
    app.listen(process.env.PORT || 8080, () => {
      console.log('API funcionando en el puerto ' + process.env.PORT);
    });
  } catch (error) {
    console.error("❌ Error initializing app:", error);
    process.exit(1);
  }
};

initApp();