import { Request, Response } from "express";
import Task from "../models/task.models";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { titulo, descricao, status, data_conclusao } = req.body;
    const userId = (req as any).user.id;
    
    // Validação básica
    if (!titulo) {
      return res.status(400).json({ message: "Título é obrigatório" });
    }

    const newTask = await Task.create({ 
      titulo, 
      descricao, 
      status, 
      data_conclusao, 
      userId 
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar tarefa", error: err });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    // Verificar se a tarefa pertence ao usuário
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar tarefa", error: err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    // Verificar se a tarefa pertence ao usuário
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: "Tarefa removida com sucesso" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao excluir tarefa", error: err });
  }
};