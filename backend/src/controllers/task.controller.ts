import { Request, Response } from "express";
import Task from "../models/task.models";

interface AuthRequest extends Request {
  userId?: string;
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    console.log("Dados recebidos:", req.body);
    console.log("UserID:", req.userId);

    const { title, description } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Título é obrigatório" });
    }

    // Verificar se o userId existe
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const task = new Task({
      title: title.trim(),
      description: description?.trim() || "",
      user: req.userId
    });

    const savedTask = await task.save();
    console.log("Tarefa salva:", savedTask);
    
    res.status(201).json(savedTask);
  } catch (error: any) {
    console.error("Erro detalhado ao criar tarefa:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Dados inválidos", 
        errors: error.errors 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Tarefa duplicada" 
      });
    }
    
    res.status(500).json({ 
      message: "Erro interno do servidor",
      error: error.message 
    });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).json({ message: "Erro ao buscar tarefas" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.json(task);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ message: "Erro ao atualizar tarefa" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ 
      _id: id, 
      user: req.userId 
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ message: "Erro ao excluir tarefa" });
  }
};
