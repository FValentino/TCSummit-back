import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/email/emailRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://www.tcsummit.com.ar",  
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// despertar servidor
app.get('/', (req, res) => {
  res.send('despertar servidor');
});

// Rutas
app.use("/api", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
