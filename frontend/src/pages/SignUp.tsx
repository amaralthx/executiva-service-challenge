import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import api from "../api/axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/signup", { name, email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg-alt">
      <Container fluid>
        <Row className="justify-content-center align-items-center min-vh-100 p-3">
          <Col xs={12} sm={10} md={8} lg={7} xl={6}>

            <Card className="auth-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h1 className="h2 mb-3 fw-bold" style={{
                    background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Criar Conta</h1>
                  <p className="text-muted">Preencha os dados abaixo</p>
                </div>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError("")} className="mb-4">
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="mb-4">
                    Conta criada! Redirecionando...
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nome completo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="João Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>

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

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          size="lg"
                          minLength={6}
                        />
                        <Form.Text className="text-muted">Mínimo 6 caracteres</Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="formConfirmPassword">
                        <Form.Label>Confirmar senha</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      className="btn-gradient-success"
                      size="lg"
                      disabled={loading || success}
                    >
                      {loading ? 'Cadastrando...' : success ? 'Sucesso!' : 'Cadastrar'}
                    </Button>
                  </div>
                </Form>

                <hr className="divider-gradient" />

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Já tem uma conta?{' '}
                    <Link to="/signin" className="fw-bold text-decoration-none" style={{
                      background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Fazer login
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
