import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Todas as rotas de tasks precisam de autenticação
router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
