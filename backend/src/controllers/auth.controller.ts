import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Gerar token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Erro no signup:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verificar se usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    // Gerar token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Erro no signin:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};