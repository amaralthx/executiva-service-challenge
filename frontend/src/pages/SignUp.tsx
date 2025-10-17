import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/signin");
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro no cadastro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Senha"
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
