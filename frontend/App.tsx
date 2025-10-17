import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Executiva Service
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#!" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a>
              <a href="#!" className="text-gray-600 hover:text-blue-600 transition-colors">Serviços</a>
              <a href="#!" className="text-gray-600 hover:text-blue-600 transition-colors">Clientes</a>
              <a href="#!" className="text-gray-600 hover:text-blue-600 transition-colors">Configurações</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bem-vindo ao Executiva Service
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sistema de gerenciamento de serviços executivos. 
              Comece explorando as funcionalidades disponíveis.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total de Serviços</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
            <p className="text-sm text-gray-500 mt-2">+5% em relação ao mês anterior</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clientes Ativos</h3>
            <p className="text-3xl font-bold text-green-600">18</p>
            <p className="text-sm text-gray-500 mt-2">+2 novos este mês</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Faturamento</h3>
            <p className="text-3xl font-bold text-purple-600">R$ 12.540</p>
            <p className="text-sm text-gray-500 mt-2">Meta: R$ 15.000</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Novo Serviço
            </button>
            <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Adicionar Cliente
            </button>
            <button className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Relatórios
            </button>
            <button className="bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium">
              Configurações
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Executiva Service. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#!" className="text-gray-400 hover:text-gray-600 transition-colors">
                Termos
              </a>
              <a href="#!" className="text-gray-400 hover:text-gray-600 transition-colors">
                Privacidade
              </a>
              <a href="#!" className="text-gray-400 hover:text-gray-600 transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;