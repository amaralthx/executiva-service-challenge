import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await authService.signup(nome, email, senha);
    res.status(201).json({ message: "Usuário criado com sucesso!", user: novoUsuario });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const { token, usuario } = await authService.signin(email, senha);
    res.status(200).json({ message: "Login realizado com sucesso!", token, usuario });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};