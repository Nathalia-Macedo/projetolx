import React, { useState } from 'react';
import AdvancedDataTable from './AdvancedDataTable';
import TableCreator from './TableCreator';

const generateRandomEmployees = (count) => {
  const names = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Mariana', 'José', 'Fernanda', 'Antônio', 'Luísa', 'Francisco', 'Beatriz', 'Paulo', 'Camila', 'Lucas', 'Juliana', 'Rafael', 'Isabela', 'Marcos', 'Larissa'];
  const surnames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'];
  const positions = ['Desenvolvedor', 'Designer', 'Gerente', 'Analista', 'Coordenador', 'Assistente', 'Diretor', 'Técnico', 'Consultor', 'Estagiário'];
  const departments = ['TI', 'Marketing', 'Vendas', 'Financeiro', 'RH', 'Operações', 'Jurídico', 'Produto', 'Suporte', 'Administrativo'];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    nome: `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`,
    cargo: positions[Math.floor(Math.random() * positions.length)],
    departamento: departments[Math.floor(Math.random() * departments.length)],
    salario: Math.floor(Math.random() * (15000 - 2000 + 1) + 2000)
  }));
};

const generateRandomProducts = (count) => {
  const productNames = ['Laptop', 'Smartphone', 'Monitor', 'Teclado', 'Mouse', 'Headset', 'Webcam', 'Impressora', 'Roteador', 'Tablet', 'Smart TV', 'Câmera Digital', 'Caixa de Som', 'Pen Drive', 'HD Externo', 'Carregador Portátil', 'Smartwatch', 'Projetor', 'Microfone', 'Estabilizador'];
  const categories = ['Eletrônicos', 'Informática', 'Acessórios', 'Áudio e Vídeo', 'Fotografia', 'Rede e Internet', 'Armazenamento', 'Energia', 'Wearables', 'Escritório'];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    nome: productNames[Math.floor(Math.random() * productNames.length)],
    categoria: categories[Math.floor(Math.random() * categories.length)],
    preco: Math.floor(Math.random() * (5000 - 50 + 1) + 50),
    estoque: Math.floor(Math.random() * (500 - 10 + 1) + 10)
  }));
};

const TableManager = () => {
  const [tables, setTables] = useState([
    {
      id: 'employees',
      title: 'Funcionários',
      data: generateRandomEmployees(50),
      columns: [
        { key: 'nome', label: 'Nome' },
        { key: 'cargo', label: 'Cargo' },
        { key: 'departamento', label: 'Departamento' },
        { key: 'salario', label: 'Salário' },
      ]
    },
    {
      id: 'products',
      title: 'Produtos',
      data: generateRandomProducts(50),
      columns: [
        { key: 'nome', label: 'Nome' },
        { key: 'categoria', label: 'Categoria' },
        { key: 'preco', label: 'Preço' },
        { key: 'estoque', label: 'Estoque' },
      ]
    }
  ]);
  const [currentTableId, setCurrentTableId] = useState('employees');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateTable = (title, headers, data) => {
    const newTableId = `table-${Date.now()}`;
    const newTable = {
      id: newTableId,
      title: title,
      data: data,
      columns: headers.map(header => ({ key: header, label: header }))
    };
    setTables(prevTables => [...prevTables, newTable]);
    setCurrentTableId(newTableId);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Gerenciador de Tabelas
          </h1>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            + Nova Tabela
          </button>
        </div>

        <AdvancedDataTable
          tables={tables}
          currentTableId={currentTableId}
          onTableSelect={setCurrentTableId}
        />

        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <TableCreator onCreateTable={handleCreateTable} onClose={() => setIsDialogOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableManager;

