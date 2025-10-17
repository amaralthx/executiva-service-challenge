import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import api from "../api/axios";
import { saveAuth } from "../utils/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/signin", { email, password });
      const { token, user } = res.data;
      saveAuth(token, user);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg">
      <Container fluid>
        <Row className="justify-content-center align-items-center min-vh-100 p-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <div className="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
            </div>

            <Card className="auth-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h1 className="h2 mb-3 fw-bold text-gradient">Bem-vindo</h1>
                  <p className="text-muted">Entre com suas credenciais</p>
                </div>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError("")} className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      className="btn-gradient-primary"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </div>
                </Form>

                <hr className="divider-gradient" />

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Não tem uma conta?{' '}
                    <Link to="/signup" className="text-gradient fw-bold text-decoration-none">
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-3">
              <small className="text-white">Sistema de Gerenciamento de Tarefas</small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
