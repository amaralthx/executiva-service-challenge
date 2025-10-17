import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// Rotas
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Rota de health check
app.get("/", (req, res) => {
  res.json({
    message: "API Executiva Service Challenge",
    status: "Online",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Conectar ao MongoDB e iniciar servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Falha ao conectar com MongoDB:", error);
    process.exit(1);
  });
