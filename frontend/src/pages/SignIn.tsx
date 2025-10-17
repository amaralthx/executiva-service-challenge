import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { saveAuth } from "../utils/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signin", { email, password });
      const { token, user } = res.data;
      saveAuth(token, user);
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Entrar</button>
    </form>
  );
}
