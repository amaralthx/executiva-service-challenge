import { User } from "../models/user.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (nome: string, email: string, senha: string) => {
  const usuarioExistente = await User.findOne({ email });
  if (usuarioExistente) throw new Error("Email já cadastrado");

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const novoUsuario = await User.create({ nome, email, senha: senhaCriptografada });

  // Retornar usuário sem a senha - método seguro
  const usuarioSemSenha = {
    _id: novoUsuario._id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
    __v: novoUsuario.__v
  };

  return usuarioSemSenha;
};

export const signin = async (email: string, senha: string) => {
  const usuario = await User.findOne({ email });
  if (!usuario) throw new Error("Usuário não encontrado");

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d"
  });

  // Retornar usuário sem a senha - método seguro
  const usuarioSemSenha = {
    _id: usuario._id,
    nome: usuario.nome,
    email: usuario.email,
    __v: usuario.__v
  };

  return { token, usuario: usuarioSemSenha };
};
