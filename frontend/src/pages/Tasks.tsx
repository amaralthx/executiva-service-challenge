import { useState, useEffect } from "react";
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
      alert("Erro ao carregar tarefas. Verifique o console.");
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Título é obrigatório!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/tasks", {
        title: title.trim(),
        description: description.trim()
      });
      setTitle("");
      setDescription("");
      setShowForm(false);
      await loadTasks(); // Recarrega a lista
      alert("Tarefa criada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      alert(error.response?.data?.message || "Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      await loadTasks();
      alert("Tarefa excluída com sucesso!");
    } catch (error: any) {
      console.error("Erro ao excluir tarefa:", error);
      alert(error.response?.data?.message || "Erro ao excluir tarefa");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Task['status']) => {
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      await loadTasks();
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      alert(error.response?.data?.message || "Erro ao atualizar tarefa");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'em andamento': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'concluída': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Minhas Tarefas</h1>
              <p className="text-gray-600 mt-1">Olá, {user?.name || 'Usuário'}!</p>
            </div>
            <button
              onClick={() => {
                logout();
                window.location.href = '/signin';
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Sair
            </button>
          </div>
        </div>

        {/* New Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${showForm
                ? 'bg-gray-500 hover:bg-gray-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
          >
            {showForm ? 'Cancelar' : '+ Nova Tarefa'}
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Nova Tarefa</h2>
            <form onSubmit={handleCreateTask}>
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Título *
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título da tarefa"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição da tarefa (opcional)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    disabled={loading}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {loading ? 'Criando...' : 'Criar Tarefa'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada.</p>
              <p className="text-gray-400 mt-2">Crie sua primeira tarefa clicando em "Nova Tarefa"</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-600 mb-3">{task.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        Criada em: {new Date(task.data_criacao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateStatus(task._id, e.target.value as Task['status'])}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="em andamento">Em Andamento</option>
                      <option value="concluída">Concluída</option>
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}