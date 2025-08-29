import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/email/emailRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Rutas
app.use("/api", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
