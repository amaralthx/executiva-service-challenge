import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Badge, Alert } from "react-bootstrap";
import api from "../api/axios";
import { getAuth, logout } from "../utils/auth";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pendente' | 'em andamento' | 'concluída';
  data_criacao: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const user = getAuth().user;

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      setErrorMessage("Erro ao carregar tarefas. Tente novamente.");
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage("Título é obrigatório!");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post("/tasks", {
        title: title.trim(),
        description: description.trim()
      });
      setTitle("");
      setDescription("");
      setShowForm(false);
      await loadTasks();
      setSuccessMessage("Tarefa criada com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      setErrorMessage(error.response?.data?.message || "Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      await loadTasks();
      setSuccessMessage("Tarefa excluída com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Erro ao excluir tarefa:", error);
      setErrorMessage(error.response?.data?.message || "Erro ao excluir tarefa");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Task['status']) => {
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      await loadTasks();
      setSuccessMessage("Status atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      setErrorMessage(error.response?.data?.message || "Erro ao atualizar tarefa");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge bg="warning" className="px-3 py-2" style={{fontSize: '0.9rem'}}>⏳ Pendente</Badge>;
      case 'em andamento':
        return <Badge bg="info" className="px-3 py-2" style={{fontSize: '0.9rem'}}>⚡ Em Andamento</Badge>;
      case 'concluída':
        return <Badge bg="success" className="px-3 py-2" style={{fontSize: '0.9rem'}}>✅ Concluída</Badge>;
      default:
        return <Badge bg="secondary" className="px-3 py-2" style={{fontSize: '0.9rem'}}>{status}</Badge>;
    }
  };

  return (
    <div className="gradient-bg" style={{
      background: 'linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)',
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9}>
            <Card className="auth-card mb-4">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                  <div>
                    <h1 className="h2 mb-2 fw-bold text-gradient">Minhas Tarefas</h1>
                    <p className="text-muted mb-0">Olá, <strong>{user?.name || 'Usuário'}</strong>!</p>
                  </div>
                  <Button
                    onClick={() => {
                      logout();
                      window.location.href = '/signin';
                    }}
                    className="btn-gradient-warning"
                    size="lg"
                  >
                    Sair
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {successMessage && (
              <Alert variant="success" dismissible onClose={() => setSuccessMessage("")} className="mb-4">
                {successMessage}
              </Alert>
            )}

            {errorMessage && (
              <Alert variant="danger" dismissible onClose={() => setErrorMessage("")} className="mb-4">
                {errorMessage}
              </Alert>
            )}

            <div className="mb-4">
              <Button
                onClick={() => setShowForm(!showForm)}
                className={showForm ? "btn-gradient-warning" : "btn-gradient-success"}
                size="lg"
              >
                {showForm ? 'Cancelar' : '+ Nova Tarefa'}
              </Button>
            </div>

            {showForm && (
              <Card className="auth-card mb-4">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="h4 mb-4 fw-bold text-gradient">Nova Tarefa</h2>

                  <Form onSubmit={handleCreateTask}>
                    <Form.Group className="mb-3" controlId="taskTitle">
                      <Form.Label>Título *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Título da tarefa"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        size="lg"
                        disabled={loading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="taskDescription">
                      <Form.Label>Descrição</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Descrição da tarefa (opcional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        size="lg"
                        disabled={loading}
                      />
                    </Form.Group>

                    <div className="d-flex gap-2 justify-content-end">
                      <Button
                        type="submit"
                        className="btn-gradient-primary"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? 'Criando...' : 'Criar'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}

            <div>
              {tasks.length === 0 ? (
                <Card className="auth-card">
                  <Card.Body className="p-5 text-center">
                    <div className="icon-box mx-auto" style={{background: 'transparent', boxShadow: 'none'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#6366f1" viewBox="0 0 16 16">
                        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                      </svg>
                    </div>
                    <h3 className="h4 mb-2 fw-bold text-muted">Nenhuma tarefa</h3>
                    <p className="text-muted mb-0">Crie sua primeira tarefa</p>
                  </Card.Body>
                </Card>
              ) : (
                <Row className="g-4">
                  {tasks.map(task => (
                    <Col xs={12} key={task._id}>
                      <Card className="auth-card" style={{borderLeft: '4px solid #6366f1'}}>
                        <Card.Body className="p-4">
                          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
                            <div className="flex-grow-1">
                              <h3 className="h5 fw-bold mb-2">{task.title}</h3>
                              {task.description && (
                                <p className="text-muted mb-3">{task.description}</p>
                              )}
                              <div className="d-flex flex-wrap gap-2 align-items-center">
                                {getStatusBadge(task.status)}
                                <small className="text-muted">
                                  {new Date(task.data_criacao).toLocaleDateString('pt-BR')}
                                </small>
                              </div>
                            </div>

                            <div className="d-flex flex-column gap-2" style={{minWidth: '200px'}}>
                              <Form.Select
                                value={task.status}
                                onChange={(e) => handleUpdateStatus(task._id, e.target.value as Task['status'])}
                                size="lg"
                              >
                                <option value="pendente">⏳ Pendente</option>
                                <option value="em andamento">⚡ Em Andamento</option>
                                <option value="concluída">✅ Concluída</option>
                              </Form.Select>
                              <Button
                                onClick={() => handleDeleteTask(task._id)}
                                className="btn-gradient-warning"
                              >
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}