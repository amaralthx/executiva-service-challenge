# Executiva Service Challenge

Sistema completo de gerenciamento de tarefas com autenticação de usuários.

## Tecnologias Utilizadas

### Backend
- Node.js + Express + TypeScript
- MongoDB com Mongoose
- JWT para autenticação
- bcrypt para hash de senhas
- CORS para integração com frontend

### Frontend
- React + TypeScript
- TailwindCSS para estilização
- Axios para requisições HTTP
- React Router para navegação

## Como Executar o Projeto

### Pré-requisitos
- Node.js 16+
- MongoDB (local ou Atlas)

### Backend
```markdown
cd backend
npm install
cp .env.example .env
npm run dev
Backend rodando em: http://localhost:5000
```

### Frontend
```markdown
cd frontend
npm install
npm run dev
Frontend rodando em: http://localhost:3000
```

Funcionalidades Implementadas
Backend
CRUD completo de tarefas

Autenticação JWT (signup/signin)

Middleware de autenticação

Campos: id, titulo, descricao, status, data_criacao

MongoDB com Mongoose

Validações e tratamento de erros

Frontend
Telas de login e cadastro

Dashboard de tarefas após login

CRUD completo de tarefas

Alteração de status (pendente, em andamento, concluída)

Design responsivo com TailwindCSS

Armazenamento de token JWT no localStorage

Estrutura da API
Autenticação
POST /auth/signup - Cadastro de usuário

POST /auth/signin - Login de usuário

Tarefas (Requer Autenticação)
GET /tasks - Listar todas as tarefas do usuário

POST /tasks - Criar nova tarefa

PUT /tasks/:id - Atualizar tarefa

DELETE /tasks/:id - Excluir tarefa

Teste Rápido
Execute backend e frontend

Acesse http://localhost:5173

Cadastre um usuário ou faça login

Comece a gerenciar suas tarefas
