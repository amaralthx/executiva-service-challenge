import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB conectado!"))
  .catch((err) => console.log("❌ Erro ao conectar no MongoDB:", err));

app.get("/", (req, res) => {
  res.json({ 
    message: "API Executiva Service Challenge", 
    status: "Online",
    timestamp: new Date().toISOString()
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

export default app;